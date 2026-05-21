import { useForm, FormProvider, Controller, Resolver } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import css from "./RegisterForm.module.css";

type RegisterFormData = InferType<typeof feedbackSchema>;

interface RegisterFormProps {
  handleRegistration: (values: RegisterFormData) => void;
}

export default function RegisterForm({
  handleRegistration,
}: RegisterFormProps): JSX.Element {
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(feedbackSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: RegisterFormData): void => {
    handleRegistration(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Registration</h3>
            <p className={css.text}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information
            </p>
          </div>
          <div className={css.inputsWrapper}>
            <Controller
              name="name"
              render={({ field }) => (
                <Input {...field} placeholder="Name" type="text" />
              )}
            />
            <Controller
              name="email"
              render={({ field }) => (
                <Input {...field} placeholder="Email" type="text" />
              )}
            />
            <Controller
              name="password"
              render={({ field }) => (
                <Input {...field} placeholder="Password" type="password" />
              )}
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </FormProvider>
  );
}
