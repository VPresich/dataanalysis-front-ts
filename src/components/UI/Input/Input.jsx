import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import css from "./Input.module.css";

function Input({ name, onChange, value, placeholder, type, ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  const handleTooglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

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
        <span onClick={handleTooglePassword} className={css.eyeIcon}>
          {showPassword ? (
            <FaEye className={css.icon} />
          ) : (
            <FaEyeSlash className={css.icon} />
          )}
        </span>
      )}
      {errors[name] && (
        <span className={css.error}>{errors[name].message}</span>
      )}
    </div>
  );
}

export default React.forwardRef(Input);
