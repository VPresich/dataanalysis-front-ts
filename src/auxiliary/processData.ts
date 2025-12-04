/**
 * Processes an array of DataRecord objects and returns track numbers
 * that have at least `numPoints` records.
 *
 * Steps:
 * 1. Groups the data by `TrackNum`.
 * 2. Counts the number of records per track.
 * 3. Returns only the track numbers (as strings) that have >= `numPoints` records.
 *
 * Note:
 * - The returned track numbers are strings because object keys in JavaScript are always strings.
 *
 * @param data - Array of DataRecord objects to process
 * @param numPoints - Minimum number of records a track must have to be included
 * @returns Array of track numbers (as strings) that meet the minimum count
 */
import { DataRecord } from "../redux/data/types";

const processData = (data: DataRecord[], numPoints: number): string[] => {
  const groupedData = data.reduce<Record<number, DataRecord[]>>((acc, row) => {
    const trackNum = row.TrackNum;
    if (!acc[trackNum]) {
      acc[trackNum] = [];
    }
    acc[trackNum].push(row);
    return acc;
  }, {});

  return Object.keys(groupedData).filter(
    (trackNum) => groupedData[Number(trackNum)].length >= numPoints
  );
};

export default processData;
