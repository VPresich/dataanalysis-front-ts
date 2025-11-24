import * as Yup from "yup";

import { ERR_PASSWORD, ERR_PASSWORD_REQUIRED } from "../constants";

export const feedbackSchema = Yup.object().shape({
  password: Yup.string().min(6, ERR_PASSWORD).required(ERR_PASSWORD_REQUIRED),

  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required(ERR_PASSWORD_REQUIRED),
});
