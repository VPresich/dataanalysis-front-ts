import { useForm, FormProvider } from "react-hook-form";
import Button from "../UI/Button/Button";
import css from "./UnauthorizedForm.module.css";

const UnauthorizedForm = ({ onSubmit }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={css.form}>
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
