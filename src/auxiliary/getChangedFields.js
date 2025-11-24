/**
 * Returns only changed fields compared to defaultValues.
 * - Ignores empty strings
 * - Always includes avatar if present
 *
 * @param {Object} values - current form values
 * @param {Object} defaultValues - default form values
 * @returns {Object} - object containing only changed fields
 */
export const getChangedFields = (values, defaultValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const defaultValue = defaultValues[key];

    if (
      (key === "avatar" && value) ||
      (key !== "avatar" && value !== defaultValue && value !== "")
    ) {
      acc[key] = value;
    }

    return acc;
  }, {});
};
