import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  getAIUserEvaluate,
  getAINonameEvaluate,
} from "../../redux/ai/operations";
import { changeActiveTrack } from "../../redux/ai/slice";
import {
  selectAIEvaluations,
  selectAITrackNum,
  selectAIIdSource,
} from "../../redux/ai/selectors";

import { Line } from "react-chartjs-2";
import {
  Chart,
  registerables,
  ChartOptions,
  ChartData,
  TooltipItem,
  LegendItem,
  LegendElement,
} from "chart.js";
import { getPointColor } from "../../auxiliary/getPointColor";
import { buildTooltipLines } from "../..//auxiliary/buildTooltipLines";
import zoomPlugin from "chartjs-plugin-zoom";
import Button from "../UI/Button/Button";
import { ProcessedTracksData } from "../../redux/data/types";
import { successNotify, errNotify } from "../../auxiliary/notification";
import { getErrorMessage } from "../../auxiliary/getErrorMessage";
import css from "./LineGraph.module.css";

Chart.register(...registerables, zoomPlugin);

interface ZoomPluginOptions {
  plugins: {
    zoom: {
      pan: {
        enabled: boolean;
        mode: "x" | "y" | "xy";
      };
      zoom: {
        enabled: boolean;
        mode: "x" | "y" | "xy";
        wheel: { enabled: boolean };
        pinch: { enabled: boolean };
      };
    };
  };
}

const getCSSVariableValue = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName,
  );
};

const generateCustomLegendLabels = (
  chart: Chart,
  activeTrackNum: number | null,
): LegendItem[] => {
  const defaultGenerator =
    Chart.defaults.plugins?.legend?.labels?.generateLabels;
  if (!defaultGenerator) return [];

  const originalLabels = defaultGenerator(chart);
  return originalLabels.map((label) => {
    const index = label.datasetIndex;
    if (index === undefined) return label;
    const datasetLabel = chart.data.datasets[index]?.label;
    const currentTrackInt = Number(datasetLabel);
    const isThisTrackSelected = activeTrackNum === currentTrackInt;

    return {
      ...label,
      hidden: false,
      text:
        isThisTrackSelected && datasetLabel
          ? `▶ Track ${datasetLabel} (AI Report)`
          : datasetLabel
            ? `Track ${datasetLabel}`
            : label.text,
    };
  });
};

const handleLegendElementClick = (
  legendItem: LegendItem,
  legend: LegendElement<"line">,
  onSelect: (trackNum: number) => void,
): void => {
  const index = legendItem.datasetIndex;
  if (index === undefined) return;

  const trackLabel = legend.chart.data.datasets[index].label;
  if (!trackLabel) return;

  onSelect(Number(trackLabel));
};

type LineGraphProps = {
  groupedData: ProcessedTracksData;
};

const LineGraph = ({ groupedData }: LineGraphProps) => {
  const chartRef = useRef<Chart<"line">>(null);
  const activeAITrackNum = useAppSelector(selectAITrackNum);
  const id_source = useAppSelector(selectAIIdSource);
  const evaluationsCache = useAppSelector(selectAIEvaluations);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const handleTrackSelectionClick = async (clickedTrackNum: number) => {
    dispatch(changeActiveTrack(clickedTrackNum));

    if (evaluationsCache && evaluationsCache[clickedTrackNum]) {
      successNotify(`Using cached AI report for Track #${clickedTrackNum}`);
      return;
    }

    if (!id_source) {
      errNotify("Missing ID Source for AI analysis");
      return;
    }

    const payload = { id_source, TrackNum: clickedTrackNum };

    try {
      let data;
      if (isLoggedIn) {
        data = await dispatch(getAIUserEvaluate(payload)).unwrap();
      } else {
        data = await dispatch(getAINonameEvaluate(payload)).unwrap();
      }

      if (!data || !data.response) {
        errNotify(`AI returned empty report for Track #${clickedTrackNum}`);
        return;
      }

      successNotify(
        `AI Analytical Report for Track #${clickedTrackNum} loaded successfully`,
      );
    } catch (error: unknown) {
      errNotify(
        getErrorMessage(error) ||
          `Error loading AI report for Track #${clickedTrackNum}`,
      );
    }
  };

  if (!groupedData || Object.keys(groupedData).length === 0) {
    return <p>No data available to display.</p>;
  }
  const datasets = Object.keys(groupedData)
    .map((trackNum, index) => {
      const trackData = groupedData[trackNum];
      const lineColor = getCSSVariableValue(`--line${index + 1}`).trim();
      const isThisTrackSelected = activeAITrackNum === Number(trackNum);
      return {
        label: `${trackNum}`,
        data: trackData.map((row) => ({
          x: row.X,
          y: row.Y,
        })),
        fill: false,
        borderColor: lineColor || "rgba(75, 192, 192, 1)",
        pointBackgroundColor: trackData.map((row) => getPointColor(row)),
        pointRadius: trackData.map((row) => {
          const isAnomaly = row.IMMconsistent === "0";
          if (isThisTrackSelected) {
            return isAnomaly ? 6 : 5;
          }
          return isAnomaly ? 4 : 3;
        }),
        tension: 0.1,
      };
    })
    .filter((dataset) => dataset !== null);

  const chartData: ChartData<"line"> = {
    datasets,
  };

  const options: ChartOptions<"line"> & ZoomPluginOptions = {
    responsive: true,

    onClick: (event, elements, chart) => {
      if (elements && elements.length > 0) {
        const datasetIndex = elements[0].datasetIndex;
        const trackLabel = chart.data.datasets[datasetIndex]?.label;

        if (trackLabel) {
          handleTrackSelectionClick(Number(trackLabel));
        }
      }
    },

    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) =>
            generateCustomLegendLabels(chart, activeAITrackNum),
        },
        onClick: (_, item, legend) =>
          handleLegendElementClick(item, legend, handleTrackSelectionClick),
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<"line">[]) => {
            const item = tooltipItems[0];
            const trackNum = item.dataset.label;
            if (!trackNum || !groupedData[trackNum]) return "";

            const row = groupedData[trackNum][item.dataIndex];
            return `Track ${trackNum}, X: ${row.X}`;
          },
          label: (tooltipItem: TooltipItem<"line">) => {
            const trackNum = tooltipItem.dataset.label;
            if (!trackNum || !groupedData[trackNum]) return "";

            const row = groupedData[trackNum][tooltipItem.dataIndex];
            return buildTooltipLines(row);
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
          wheel: { enabled: true },
          pinch: { enabled: true },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "X, km",
        },
        beginAtZero: false,
        grid: {
          drawOnChartArea: true,
          color: ["rgba(0, 0, 0, 0.1)"],
          lineWidth: [1],
        },
      },
      y: {
        title: {
          display: true,
          text: "Y, km",
        },
        beginAtZero: false,
        grid: {
          drawOnChartArea: true,
          color: ["rgba(0, 0, 0, 0.1)"],
          lineWidth: [1],
        },
      },
    },
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className={css.container}>
      <Button onClick={resetZoom} btnAuxStyles={css.btnReset}>
        Reset zoom
      </Button>

      <Line
        className={css.graphContainer}
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineGraph;
