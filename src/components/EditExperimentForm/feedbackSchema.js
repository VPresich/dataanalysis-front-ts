import * as Yup from "yup";

export const feedbackSchema = Yup.object().shape({
  source_name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .nullable()
    .optional(),
  file_name: Yup.string().max(255, "File name too long").nullable().optional(),
  comment: Yup.string().max(500, "Comment too long").nullable().optional(),
});
