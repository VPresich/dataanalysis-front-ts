/**
 * Returns an object containing only fields that differ from the provided defaultValues.
 *
 * Rules:
 * - Fields with an empty string ("") are ignored.
 * - The "avatar" field is always included if it has a value (e.g., File object).
 * - Only fields whose values changed are returned.
 *
 * Type Details:
 * - T extends Record<string, any>: ensures the function works with any object shape.
 * - Returns Partial<T> because not all fields may be present in the result.
 *
 * @param values - current form values
 * @param defaultValues - initial form values to compare against
 * @returns Partial<T> - object containing only changed fields
 */
export const getChangedFields = <T extends Record<string, any>>(
  values: T,
  defaultValues: T
): Partial<T> => {
  return Object.entries(values).reduce<Partial<T>>((acc, [key, value]) => {
    const defaultValue = defaultValues[key as keyof T];

    if (
      (key === "avatar" && value) ||
      (key !== "avatar" && value !== defaultValue && value !== "")
    ) {
      acc[key as keyof T] = value;
    }

    return acc;
  }, {});
};
