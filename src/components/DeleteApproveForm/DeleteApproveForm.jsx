import { useForm, FormProvider } from "react-hook-form";
import Button from "../UI/Button/Button";
import css from "./DeleteApproveForm.module.css";

const DeleteApproveForm = ({ onApprove, onCancel, title, text }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onApprove)}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.text}>{text}</p>
          </div>

          <div className={css.buttons}>
            <Button type="submit" btnAuxStyles={css.btnAuxStyles}>
              Approve
            </Button>

            <Button
              type="button"
              onClick={onCancel}
              variant="cancel"
              btnAuxStyles={css.btnAuxStyles}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default DeleteApproveForm;
