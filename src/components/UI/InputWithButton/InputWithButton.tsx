import React from "react";
import {
  useFormContext,
  Controller,
  FieldValues,
  FieldError,
} from "react-hook-form";
import iconsPath from "../../../assets/img/icons.svg";
import css from "./InputWithButton.module.css";
import { InputWithButtonProps } from "./InputWithButton.types";

const InputWithButton: React.FC<InputWithButtonProps> = ({
  name,
  placeholder,
  type = "text",
  onSubmit,
}) => {
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
