type TooltipValue = string | number;

const formatNumber = (v: TooltipValue, digits: number) => {
  if (v === "None" || v === null || v === undefined) return v;
  return Number(v).toFixed(digits);
};

export const tooltipFields = [
  { key: "Y", label: "Y", format: (v: TooltipValue) => formatNumber(v, 2) },
  { key: "Z", label: "Z", format: (v: TooltipValue) => formatNumber(v, 2) },
  {
    key: "probability",
    label: "Probability",
    format: (v: TooltipValue) => formatNumber(v, 5),
  },
  {
    key: "speed",
    label: "Speed",
    format: (v: TooltipValue) => (v === "None" ? v : formatNumber(v, 2)),
  },

  {
    key: "Time",
    label: "Time",
    format: (v: TooltipValue) => formatNumber(v, 2),
  },

  {
    key: "IMMconsistentValue",
    label: "IMM Consistent Value",
    format: (v: TooltipValue) => (v === "None" ? v : formatNumber(v, 2)),
  },

  {
    key: "Kde",
    label: "Kde",
    format: (v: TooltipValue) => (v === "None" ? v : formatNumber(v, 2)),
  },

  {
    key: "KdeWeighted",
    label: "KdeWeighted",
    format: (v: TooltipValue) => (v === "None" ? v : formatNumber(v, 2)),
  },

  {
    key: "Gaussian",
    label: "Gaussian",
    format: (v: TooltipValue) => (v === "None" ? v : formatNumber(v, 2)),
  },

  {
    key: "GaussianWeighted",
    label: "GaussianWeighted",
    format: (v: TooltipValue) => (v === "None" ? v : formatNumber(v, 2)),
  },

  {
    key: "EvaluationNum",
    label: "EvaluationNum",
    format: (v: TooltipValue) => (v === "None" ? v : parseInt(String(v), 10)),
  },

  {
    key: "TrackConsistent",
    label: "TrackConsistent",
    format: (v: TooltipValue) => v,
  },

  {
    key: "VelocityConsistent",
    label: "VelocityConsistent",
    format: (v: TooltipValue) => v,
  },

  {
    key: "IMMconsistent",
    label: "IMM Consistent",
    format: (v: TooltipValue) => v,
  },
];
