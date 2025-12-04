import { DataRecord } from "../redux/data/types";
/**
 * Returns a color based on consistency flags from a DataRecord.
 *
 * Rules:
 * - IMMconsistent === "0"
 *     - VelocityConsistent === "0" and TrackConsistent !== "0" → "orange"
 *     - TrackConsistent === "0" and VelocityConsistent !== "0" → "blue"
 *     - Otherwise → "red"
 *
 * - IMMconsistent === "None" → "yellow"
 * - All other cases → "green"
 *
 * @param row - DataRecord with consistency flags
 * @returns One of: "orange" | "blue" | "red" | "yellow" | "green"
 */
type PointColor = "orange" | "blue" | "red" | "yellow" | "green";

export const getPointColor = (row: DataRecord): PointColor => {
  const vImmConsistent = row.IMMconsistent;
  const vVelocityConsistent = row.VelocityConsistent;
  const vTrackConsistent = row.TrackConsistent;

  if (vImmConsistent === "0") {
    if (vVelocityConsistent === "0" && vTrackConsistent !== "0")
      return "orange";
    if (vTrackConsistent === "0" && vVelocityConsistent !== "0") return "blue";
    return "red";
  }

  if (vImmConsistent === "None") {
    return "yellow";
  }

  return "green";
};
