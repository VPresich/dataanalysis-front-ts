import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./Button.module.css";
import clsx from "clsx";

const Button = ({
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
