import * as Yup from "yup";

export const createFeedbackSchema = (existingNumbers = []) =>
  Yup.object().shape({
    source_number: Yup.number()
      .typeError("Must be a number")
      .integer("Must be an integer")
      .required("Source number is required")
      .test(
        "unique-number",
        "This number already exists",
        (value) => value != null && !existingNumbers.includes(value)
      ),

    source_name: Yup.string()
      .min(3, "Too short")
      .max(50, "Too long")
      .nullable(),

    file_name: Yup.string().required("File is required"),

    datafile: Yup.mixed()
      .required("File is required")
      .test("file-type", "Only .txt or .csv files are allowed", (value) => {
        if (!value) return false;
        const allowedTypes = ["text/plain", "text/csv"];
        const allowedExtensions = [".txt", ".csv"];
        return (
          allowedTypes.includes(value.type) ||
          allowedExtensions.some((ext) => value.name.endsWith(ext))
        );
      })
      .test("file-size", "File size must be less than 1 MB", (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024; // 2 MB
      }),

    comment: Yup.string().max(500, "Comment too long").nullable(),
  });
