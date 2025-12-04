import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import css from "./Separator.module.css";
import { selectTheme } from "../../../redux/auth/selectors";

const Separator: React.FC = () => {
  const theme = useSelector(selectTheme);

  return <div className={clsx(css.separator, css[theme])}></div>;
};

export default Separator;
