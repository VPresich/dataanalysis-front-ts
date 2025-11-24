// src/utils/filterTrackNumbers.js

/**
 * Groups data by TrackNum and returns only track numbers
 * that have at least `minCount` records.
 *
 * @param {Array} data - Array of data records.
 * @param {number} minCount - Minimum number of records per track.
 * @returns {string[]} Array of filtered track numbers.
 */
export const filterTrackNumbers = (data, minCount = 5) => {
  console.log(DataTransfer, data);
  const groupedData = data.reduce((acc, row) => {
    const trackNum = row.TrackNum;
    if (!acc[trackNum]) acc[trackNum] = [];
    acc[trackNum].push(row);
    return acc;
  }, {});

  return Object.keys(groupedData).filter(
    (trackNum) => groupedData[trackNum].length >= minCount
  );
};
