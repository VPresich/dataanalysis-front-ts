import {
  useFormContext,
  Controller,
  FieldValues,
  FieldError,
} from "react-hook-form";
import iconsPath from "../../../assets/img/icons.svg";
import css from "./InputWithButton.module.css";

export interface InputWithButtonProps {
  name: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onSubmit: () => void;
}

const InputWithButton = ({
  name,
  placeholder,
  type = "text",
  onSubmit,
}: InputWithButtonProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className={css.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={css.inputContainer}>
            <input
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              className={css.input}
              type={type}
            />
            <button
              type="button"
              onClick={onSubmit}
              className={css.searchButton}
            >
              <svg className={css.icon}>
                <use href={`${iconsPath}#icon-search`} />
              </svg>
            </button>
          </div>
        )}
      />
      {error && <span className={css.error}>{error.message}</span>}
    </div>
  );
};

export default InputWithButton;
