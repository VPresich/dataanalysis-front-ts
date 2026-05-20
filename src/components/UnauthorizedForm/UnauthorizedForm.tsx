import { useForm, FormProvider } from "react-hook-form";
import Button from "../UI/Button/Button";
import css from "./UnauthorizedForm.module.css";

interface UnauthorizedFormProps {
  onSubmit: () => void;
}

const UnauthorizedForm = ({ onSubmit }: UnauthorizedFormProps) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Access Denied</h3>
            <p className={css.text}>
              This feature is only available for authorized users.
            </p>
          </div>
          <Button type="submit">Close</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UnauthorizedForm;
