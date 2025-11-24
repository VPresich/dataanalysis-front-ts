import { useForm, FormProvider, Controller } from "react-hook-form";
import { MdKeyboardReturn } from "react-icons/md";
import Button from "../../../UI/Button/Button";
import ReactIconButton from "../../../UI/ReactIconButton/ReactIconButton";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../UI/Input/Input";
import css from "./PasswordResetForm.module.css";

export default function PasswordResetForm({ onSubmit, onBack }) {
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const { handleSubmit } = methods;

  const handleChange = async (values) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleChange)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Change password</h3>
            <p className={css.text}>
              Please enter your new password to securely update your account and
              continue your data analysis journey.
            </p>
          </div>
          <div className={css.inputsWrapper}>
            <Controller
              name="password"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Password" type="password" />
              )}
            />

            <Controller
              name="confirm"
              control={methods.control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Confirm password"
                  type="password"
                />
              )}
            />
          </div>
          <div className={css.btnsContainer}>
            <Button type="submit">Change</Button>
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
