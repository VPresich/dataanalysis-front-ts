import { useForm, FormProvider, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../UI/Input/Input";
import { getChangedFields } from "../../auxiliary/getChangedFields";
import { feedbackSchema } from "./feedbackSchema";
import TextArea from "../UI/TextArea/TextArea";
import { InferType } from "yup";
import Button from "../UI/Button/Button";
import {
  DataSourceResponse,
  DataSourceUpdate,
} from "../../redux/datasources/types";
import css from "./EditExperimentForm.module.css";

type EditExperimentFormData = InferType<typeof feedbackSchema>;

interface EditExperimentFormProps {
  experiment: DataSourceResponse;
  handleExperimentSave: (values: DataSourceUpdate) => void;
}

const EditExperimentForm = ({
  experiment,
  handleExperimentSave,
}: EditExperimentFormProps): JSX.Element => {
  const methods = useForm<EditExperimentFormData>({
    resolver: yupResolver(feedbackSchema) as Resolver<EditExperimentFormData>,
    defaultValues: {
      source_number: experiment.source_number || ("" as unknown as number),
      source_name: experiment.source_name || "",
      file_name: experiment.file_name || "",
      comment: experiment.comment || "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: EditExperimentFormData): void => {
    const changedFields = getChangedFields(
      values,
      methods.formState.defaultValues as Record<string, unknown>,
    );
    if (handleExperimentSave) {
      handleExperimentSave(changedFields as DataSourceUpdate);
    }
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
              render={({ field }) => (
                <Input {...field} type="number" readOnly />
              )}
            />

            <Controller
              name="source_name"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Source name"
                  type="text"
                />
              )}
            />

            <Controller
              name="file_name"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="File name"
                  type="text"
                />
              )}
            />

            <Controller
              name="comment"
              render={({ field }) => (
                <TextArea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Comment"
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
