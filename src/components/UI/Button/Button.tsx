import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  btnAuxStyles?: string;
  variant?: "default" | "cancel";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button = ({
  children,
  onClick,
  btnAuxStyles,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) => {
  const theme = useSelector(selectTheme);

  return (
    <button
      type={type}
      className={clsx(css.btn, css[theme], btnAuxStyles, css[variant])}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
