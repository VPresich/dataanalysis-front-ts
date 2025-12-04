import React, { useState, ForwardedRef } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import css from "./Input.module.css";
import { InputProps } from "./InputProps.types";

const Input = (
  { name, onChange, value, placeholder, type = "text", ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors },
  } = useFormContext<{ [key: string]: any }>();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const error = errors[name] as FieldError | undefined;

  return (
    <div className={css.wrapper}>
      <input
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={css.input}
        type={inputType}
        {...props}
      />
      {type === "password" && (
        <span onClick={handleTogglePassword} className={css.eyeIcon}>
          {showPassword ? (
            <FaEye className={css.icon} />
          ) : (
            <FaEyeSlash className={css.icon} />
          )}
        </span>
      )}
      {error && <span className={css.error}>{error.message}</span>}
    </div>
  );
};

export default React.forwardRef(Input);
