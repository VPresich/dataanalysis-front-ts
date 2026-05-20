import * as Yup from 'yup';

import {
  ERR_EMAIL,
  ERR_EMAIL_REQUIRED,
} from '../constants';

export const feedbackSchema = Yup.object().shape({
  email: Yup.string().email(ERR_EMAIL).required(ERR_EMAIL_REQUIRED),
});
