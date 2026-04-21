import { tooltipFields } from "./tooltipFields";
import { DataRecord } from "../redux/data/types";

type TooltipField = {
  key: keyof DataRecord;
  label: string;
  format: (value: any) => string | number;
};

export const buildTooltipLines = (row: DataRecord): string[] => {
  return (tooltipFields as TooltipField[])
    .filter(({ key }) => key in row)
    .map(({ key, label, format }) => {
      const val = row[key];
      return `${label}: ${format(val)}`;
    });
};
