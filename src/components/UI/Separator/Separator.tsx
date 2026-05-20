import { useSelector } from "react-redux";
import clsx from "clsx";
import css from "./Separator.module.css";
import { selectTheme } from "../../../redux/auth/selectors";

const Separator = () => {
  const theme = useSelector(selectTheme);

  return <div className={clsx(css.separator, css[theme])}></div>;
};

export default Separator;
