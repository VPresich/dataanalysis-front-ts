import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./ReactIconButton.module.css";

export interface ReactIconButtonProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const ReactIconButton: React.FC<ReactIconButtonProps> = ({
  icon: Icon,
  onClick,
  children,
}: ReactIconButtonProps) => {
  const theme = useSelector(selectTheme);

  return (
    <button
      type="button"
      className={clsx(css.btn, css[theme])}
      onClick={onClick}
    >
      <span className={css.iconContainer}>
        {Icon && <Icon className={clsx(css.icon, css[theme])} />}
      </span>
      <span className={css.txt}>{children}</span>
    </button>
  );
};

export default ReactIconButton;
