import { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getPointColor } from "../../auxiliary/getPointColor";
import { buildTooltipLines } from "../../auxiliary/buildTooltipLines";
import zoomPlugin from "chartjs-plugin-zoom";
import Button from "../UI/Button/Button";
import css from "./LineGraph.module.css";
Chart.register(...registerables, zoomPlugin);

const getCSSVariableValue = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName,
  );
};

const LineGraph = ({ groupedData }) => {
  const chartRef = useRef(null);

  if (!groupedData || Object.keys(groupedData).length === 0) {
    return <p>No data available to display.</p>;
  }
  const datasets = Object.keys(groupedData)
    .map((trackNum, index) => {
      const trackData = groupedData[trackNum];
      const lineColor = getCSSVariableValue(`--line${index + 1}`).trim();

      return {
        label: `${trackNum}`,
        data: trackData.map((row) => ({
          x: parseFloat(row.X),
          y: parseFloat(row.Y),
        })),
        fill: false,
        borderColor: lineColor || "rgba(75, 192, 192, 1)",
        pointBackgroundColor: trackData.map((row) => getPointColor(row)),
        pointRadius: trackData.map((row) =>
          row.IMMconsistent === "0" ? 4 : 3,
        ),
        tension: 0.1,
      };
    })
    .filter((dataset) => dataset !== null);

  const chartData = {
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const item = tooltipItems[0];
            const trackNum = item.dataset.label;
            const row = groupedData[trackNum][item.dataIndex];
            return `Track ${trackNum}, X: ${row.X}`;
          },
          label: (tooltipItem) => {
            const trackNum = tooltipItem.dataset.label;
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
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
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
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
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
