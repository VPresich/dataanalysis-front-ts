import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import css from "./RegisterForm.module.css";

type RegisterFormData = InferType<typeof feedbackSchema>;

interface RegisterProps {
  handleRegistration: (values: RegisterFormData) => void;
}

export default function RegisterForm({ handleRegistration }: RegisterProps) {
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: RegisterFormData) => {
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
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Name" type="text" />
              )}
            />
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
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </FormProvider>
  );
}
