import { useForm, FormProvider, Controller, Resolver } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { MdKeyboardReturn } from "react-icons/md";
import ReactIconButton from "../../../UI/ReactIconButton/ReactIconButton";
import css from "./SendLinkForm.module.css";

type LoginFormData = InferType<typeof feedbackSchema>;

interface SendLinkFormProps {
  onSubmit: (values: LoginFormData) => void;
  onBack: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  text: string;
}

export default function SendLinkForm({
  onSubmit,
  onBack,
  title,
  text,
}: SendLinkFormProps): JSX.Element {
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(feedbackSchema) as Resolver<LoginFormData>,
    defaultValues: { email: "" },
  });

  const { handleSubmit } = methods;

  const handleSendLink = async (values: LoginFormData) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSendLink)} className={css.form}>
        <div className={css.content}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.text}>{text}</p>

          <Controller
            name="email"
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
