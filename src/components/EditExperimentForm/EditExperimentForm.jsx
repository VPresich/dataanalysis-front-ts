import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../UI/Input/Input";
import { getChangedFields } from "../../auxiliary/getChangedFields";
import { feedbackSchema } from "./feedbackSchema";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import css from "./EditExperimentForm.module.css";

const EditExperimentForm = ({ experiment, handleExperimentSave }) => {
  const methods = useForm({
    defaultValues: {
      resolver: yupResolver(feedbackSchema),
      source_number: experiment.source_number || "",
      source_name: experiment.source_name || "",
      file_name: experiment.file_name || "",
      comment: experiment.comment || "",
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (values) => {
    const changedFields = getChangedFields(
      values,
      methods.formState.defaultValues
    );
    handleExperimentSave && handleExperimentSave(changedFields);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Experiment Info</h3>
            <p className={css.text}>
              Here you can view and update the information related to this
              experiment.
            </p>
          </div>

          <div className={css.inputsWrapper}>
            <Controller
              name="source_number"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Source number"
                  type="number"
                  readOnly
                />
              )}
            />

            <Controller
              name="source_name"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Source name" type="text" />
              )}
            />

            <Controller
              name="file_name"
              control={control}
              render={({ field }) => (
                <Input {...field} label="File name" type="text" />
              )}
            />

            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label="Comment"
                  className={css.auxTextArea}
                />
              )}
            />
          </div>

          <Button type="submit">Save</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditExperimentForm;
