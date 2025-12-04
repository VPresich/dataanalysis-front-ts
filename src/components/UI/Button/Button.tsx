import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./Button.module.css";
import { ButtonProps } from "./Button.types";
import clsx from "clsx";
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  btnAuxStyles,
  variant = "default",
  ...props
}) => {
  const theme = useSelector(selectTheme);

  return (
    <button
      type="button"
      className={clsx(
        css.btn,
        css[theme],
        btnAuxStyles && btnAuxStyles,
        css[variant]
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
