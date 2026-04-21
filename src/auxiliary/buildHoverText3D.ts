import { buildTooltipLines } from "./buildTooltipLines";
import { DataRecord } from "../redux/data/types";

export const buildHoverText3D = (row: DataRecord, trackNum: string): string => {
  const base = [`Track: ${trackNum}`, `X: ${Number(row.X).toFixed(2)}`];

  const extra = buildTooltipLines(row);

  return [...base, ...extra].join("<br>");
};
