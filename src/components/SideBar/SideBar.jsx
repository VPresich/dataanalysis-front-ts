import { useSelector } from "react-redux";
import ExperimentCardsList from "../ExperimentCardsList/ExperimentCardsList";
import { selectSidebarOpen } from "../../redux/sidebar/selectors";
import AddExperiment from "../AddExperiment/AddExperiment";
import Separator from "../UI/Separator/Separator";
import DeletAllExperiments from "../DeleteAllExperiments/DeleteAllExperiments";
import { selectTheme } from "../../redux/auth/selectors";
import { selectSources } from "../../redux/datasources/selectors";

import clsx from "clsx";
import { useRef } from "react";
import css from "./SideBar.module.css";

export default function SideBar() {
  const isOpen = useSelector(selectSidebarOpen);
  const sources = useSelector(selectSources);
  const theme = useSelector(selectTheme);
  const sidebarRef = useRef(null);

  return (
    <div
      className={clsx(css.sidebar, css[theme], isOpen && css.open)}
      ref={sidebarRef}
    >
      <div className={css.content}>
        <p className={clsx(css.title, css[theme])}>My experiments</p>
        <div className={css.buttons}>
          <Separator />
          <AddExperiment />
          <DeletAllExperiments />
          <Separator />
        </div>
        <ExperimentCardsList experiments={sources} />
      </div>
    </div>
  );
}
