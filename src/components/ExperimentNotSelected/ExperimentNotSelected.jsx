import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";
import css from "./ExperimentNotSelected.module.css";

export default function ExperimentNotSelected() {
  const theme = useSelector(selectTheme);

  return (
    <div className={clsx(css.container, css[theme])}>
      <div className={css.textContainer}>
        <p className={clsx(css.text, css[theme])}>
          Before starting the analysis, you need to upload the data to the
          database and select an experiment to work with.
        </p>
        <p className={clsx(css.text, css[theme])}>
          To select an experiment, click the{" "}
          <span className={clsx(css.accent, css[theme])}>Experiments</span>{" "}
          button in the AppBar. This ensures the system can prepare the
          necessary data and execute all analytical processes correctly.
        </p>
      </div>
    </div>
  );
}
