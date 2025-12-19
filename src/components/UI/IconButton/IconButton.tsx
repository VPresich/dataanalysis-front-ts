import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import iconsPath from "../../../assets/img/icons.svg";
import css from "./IconButton.module.css";
import { IconButtonProps } from "./IconButton.types";

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onClick,
  children,
}) => {
  const theme = useSelector(selectTheme);

  return (
    <button
      type="button"
      className={clsx(css.btn, css[theme])}
      onClick={onClick}
    >
      <span className={css.iconContainer}>
        <svg
          className={clsx(css.icon, css[theme])}
          width="20"
          height="20"
          aria-label={`${children} icon`}
        >
          <use href={`${iconsPath}#${iconName}`} />
        </svg>
      </span>
      <span className={css.txt}>{children}</span>
    </button>
  );
};

export default IconButton;
