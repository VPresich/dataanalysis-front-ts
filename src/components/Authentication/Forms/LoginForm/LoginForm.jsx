import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import ReactIconButton from "../../../UI/ReactIconButton/ReactIconButton";
import { LuKeyRound } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginForm.module.css";
import Input from "../../../UI/Input/Input";

export default function LoginForm({
  onSubmit,
  onForgotPassword,
  onResendVerify,
}) {
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const handleLogin = async (values) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleLogin)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Log In</h3>
            <p className={css.text}>
              Welcome back! Please enter your credentials to access your account
              and continue data analysis.
            </p>
          </div>
          <div className={css.inputsWrapper}>
            <Controller
              name="email"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Email" type="text" />
              )}
            />
            <Controller
              name="password"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Password" type="password" />
              )}
            />
          </div>
          <div className={css.btnsContainer}>
            <Button type="submit">Log in</Button>
            <div className={css.buttons}>
              {/* Resend verify */}
              <div className={css.forgotWrapper}>
                <ReactIconButton icon={LuSend} onClick={onResendVerify}>
                  Resend verify email?
                </ReactIconButton>
              </div>
              {/* Forgot password */}
              <div className={css.forgotWrapper}>
                <ReactIconButton icon={LuKeyRound} onClick={onForgotPassword}>
                  Forgot password?
                </ReactIconButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
