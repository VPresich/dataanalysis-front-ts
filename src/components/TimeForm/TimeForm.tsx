import { useForm, FormProvider, Controller } from "react-hook-form";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { TimeDataPayload } from "../../redux/datafilters/types";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import css from "./TimeForm.module.css";

export type TimeFormData = InferType<typeof feedbackSchema>;

interface TimeFormProps {
  initialValues: TimeFormData;
  onChange: (values: TimeDataPayload) => void;
}

const TimeForm = ({ initialValues, onChange }: TimeFormProps) => {
  const methods = useForm<TimeFormData>({
    resolver: yupResolver(feedbackSchema),
    values: initialValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = methods;

  const onSubmit = (data: TimeFormData) => {
    if (onChange) {
      onChange(data as TimeDataPayload);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.inputs}>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Start time" type="text" />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="End time" type="text" />
            )}
          />
        </div>
        <Button
          type="submit"
          btnAuxStyles={css.btnAuxStyles}
          disabled={!isDirty}
        >
          Save time
        </Button>
      </form>
    </FormProvider>
  );
};

export default TimeForm;
