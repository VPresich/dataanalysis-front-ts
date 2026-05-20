import * as Yup from "yup";
import { TimeDataPayload } from "../../redux/datafilters/types";
const numberRegex = /^\d*\.?\d*$/;

export const feedbackSchema: Yup.ObjectSchema<TimeDataPayload> = Yup.object({
  startTime: Yup.string()
    .defined()
    .test(
      "is-number",
      "Must be a number",
      (value) => !value || numberRegex.test(value),
    )
    .test("min-value", "Must be >= 0", (value) => !value || Number(value) >= 0),

  endTime: Yup.string()
    .defined()
    .test(
      "is-number",
      "Must be a number",
      (value) => !value || numberRegex.test(value),
    )
    .test("min-value", "Must be >= 0", (value) => !value || Number(value) >= 0)
    .test(
      "end-time-greater-or-equal",
      "Must be >= start time",
      function (value) {
        const { startTime } = this.parent as TimeDataPayload;

        if (!value || !startTime) {
          return true;
        }

        return Number(value) >= Number(startTime);
      },
    ),
});
