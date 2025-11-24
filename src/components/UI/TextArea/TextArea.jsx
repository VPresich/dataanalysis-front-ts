import React from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import css from "./TextArea.module.css";

function TextArea(
  { name, onChange, value, placeholder, className, ...props },
  ref
) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={css.wrapper}>
      <textarea
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(css.input, className)}
        {...props}
      />
      {errors[name] && (
        <span className={css.error}>{errors[name].message}</span>
      )}
    </div>
  );
}

export default React.forwardRef(TextArea);
