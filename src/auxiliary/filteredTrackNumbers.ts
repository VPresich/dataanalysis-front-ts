import { DataRecord } from "../redux/data/types";

/**
 * Groups data by TrackNum and returns only track numbers
 * that have at least `minCount` records.
 *
 * @param data - Array of data records.
 * @param minCount - Minimum number of records per track.
 * @returns Array of filtered track numbers.
 */
export const filterTrackNumbers = (
  data: DataRecord[],
  minCount: number = 5
): string[] => {
  const groupedData = data.reduce<Record<string, DataRecord[]>>((acc, row) => {
    const trackNum = String(row.TrackNum);
    if (!acc[trackNum]) acc[trackNum] = [];
    acc[trackNum].push(row);
    return acc;
  }, {});

  return Object.keys(groupedData).filter(
    (trackNum) => groupedData[trackNum].length >= minCount
  );
};
