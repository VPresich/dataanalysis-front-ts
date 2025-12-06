import React, { ForwardedRef } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import clsx from "clsx";
import css from "./TextArea.module.css";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea = (
  { name, className, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const {
    formState: { errors },
  } = useFormContext<{ [key: string]: any }>();

  const fieldError = errors[name] as FieldError | undefined;

  return (
    <div className={css.wrapper}>
      <textarea
        ref={ref}
        name={name}
        className={clsx(css.input, className)}
        {...props}
      />
      {fieldError && <span className={css.error}>{fieldError.message}</span>}
    </div>
  );
};

export default React.forwardRef(TextArea);
