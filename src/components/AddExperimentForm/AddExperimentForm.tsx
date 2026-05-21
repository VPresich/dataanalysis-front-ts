import { useForm, FormProvider, Controller, Resolver } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import clsx from "clsx";
import { selectTheme } from "../../redux/auth/selectors";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import { selectSourceNumbers } from "../../redux/datasources/selectors";
import { createFeedbackSchema } from "./createFeedbackSchema";
import iconsPath from "../../assets/img/icons.svg";
import css from "./AddExperimentForm.module.css";

export type AddExperimentFormData = InferType<
  ReturnType<typeof createFeedbackSchema>
>;

interface AddExperimentFormProps {
  onSubmitForm: (values: AddExperimentFormData) => void;
}

const AddExperimentForm = ({
  onSubmitForm,
}: AddExperimentFormProps): JSX.Element => {
  const existingNumbers = useAppSelector(selectSourceNumbers);
  const feedbackSchema = createFeedbackSchema(existingNumbers);
  const methods = useForm<AddExperimentFormData>({
    resolver: yupResolver(feedbackSchema) as Resolver<AddExperimentFormData>,
    defaultValues: {
      source_number: undefined,
      source_name: "",
      file_name: "",
      datafile: undefined,
      comment: "",
    },
  });
  const theme = useAppSelector(selectTheme);
  const { setValue, handleSubmit, control } = methods;

  const handleFileSelected = (file: File) => {
    if (!file) return;
    setValue("datafile", file, { shouldValidate: true });
    setValue("file_name", file.name, { shouldValidate: true });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Upload experiment</h3>
            <p className={css.text}>
              Use this form to upload your source data file and provide relevant
              information about data.
            </p>
          </div>
          <div className={css.scrollableContent}>
            <div className={css.filedataInfo}>
              <p className={css.subTitle}>Choose data file</p>
              <Controller
                name="file_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="File name"
                    type="text"
                    readOnly
                  />
                )}
              />
              <Controller
                name="datafile"
                control={control}
                render={({ field, fieldState }) => (
                  <UploadFileButton
                    icon={
                      <svg
                        className={css.btnIconContainer}
                        aria-label="Upload icon"
                      >
                        <use
                          className={clsx(css.btnIcon, css[theme])}
                          href={`${iconsPath}#icon-upload`}
                        />
                      </svg>
                    }
                    className={clsx(css.uploadBtn, css[theme])}
                    accept=".csv,text/plain"
                    onFileSelect={(file) => {
                      field.onChange(file);
                      handleFileSelected(file);
                    }}
                    error={fieldState?.error?.message}
                  >
                    Upload file
                  </UploadFileButton>
                )}
              />
            </div>

            <div className={css.sourceDataInfo}>
              <p className={css.subTitle}>Source information</p>
              <div className={css.inputsWrapper}>
                <Controller
                  name="source_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ? String(field.value) : ""}
                      placeholder="Source number"
                      type="number"
                    />
                  )}
                />

                <Controller
                  name="source_name"
                  control={control}
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
                  name="comment"
                  control={control}
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
            </div>
          </div>
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddExperimentForm;
