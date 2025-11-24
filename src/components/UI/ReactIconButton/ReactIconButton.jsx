import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./ReactIconButton.module.css";

/**
 * Universal button component with react icon.
 */
export default function ReactIconButton({ icon: Icon, onClick, children }) {
  const theme = useSelector(selectTheme);

  return (
    <button
      type="button"
      className={clsx(css.btn, css[theme])}
      onClick={onClick}
    >
      <span className={css.iconContainer}>
        <span className={css.iconContainer}>
          {Icon && <Icon className={clsx(css.icon, css[theme])} />}
        </span>
      </span>
      <span className={css.txt}>{children}</span>
    </button>
  );
}
