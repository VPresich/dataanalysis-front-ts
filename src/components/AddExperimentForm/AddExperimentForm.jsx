import { useForm, FormProvider, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectTheme } from "../../redux/auth/selectors";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import { selectSourceNumbers } from "../../redux/datasources/selectors";
import { createFeedbackSchema } from "./createFeedbackSchema";
import iconsPath from "../../assets/img/icons.svg";
import css from "./AddExperimentForm.module.css";

const AddExperimentForm = ({ onSubmitForm }) => {
  const existingNumbers = useSelector(selectSourceNumbers);
  const feedbackSchema = createFeedbackSchema(existingNumbers);
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      source_number: "",
      source_name: "",
      file_name: "",
      datafile: null,
      comment: "",
    },
  });
  const theme = useSelector(selectTheme);
  const { setValue, handleSubmit, control } = methods;

  const handleFileSelected = (file) => {
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
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="File name"
                    type="text"
                    error={fieldState?.error?.message}
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
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder="Source number"
                      type="number"
                      error={fieldState?.error?.message}
                    />
                  )}
                />

                <Controller
                  name="source_name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder="Source name"
                      type="text"
                      error={fieldState?.error?.message}
                    />
                  )}
                />

                <Controller
                  name="comment"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextArea
                      {...field}
                      placeholder="Comment"
                      type="text"
                      className={css.auxTextArea}
                      error={fieldState?.error?.message}
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
