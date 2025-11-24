import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import { MdKeyboardReturn } from "react-icons/md";
import ReactIconButton from "../../../UI/ReactIconButton/ReactIconButton";
import css from "./SendLinkForm.module.css";

export default function SendLinkForm({ onSubmit, onBack, title, text }) {
  const methods = useForm({
    defaultValues: { email: "" },
  });

  const { handleSubmit } = methods;

  const handleSendLink = async (values) => {
    onSubmit && onSubmit(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSendLink)} className={css.form}>
        <div className={css.content}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.text}>{text}</p>

          <Controller
            name="email"
            control={methods.control}
            render={({ field }) => (
              <Input {...field} placeholder="Email" type="text" />
            )}
          />
          <div className={css.btnsContainer}>
            <Button type="submit">Send Link</Button>
            <div className={css.backWrapper}>
              <ReactIconButton icon={MdKeyboardReturn} onClick={onBack}>
                Back
              </ReactIconButton>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
