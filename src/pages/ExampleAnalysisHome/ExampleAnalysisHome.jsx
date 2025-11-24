import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNonameSources } from "../../redux/datasources/operations";
import ExperimentNotSelected from "../../components/ExperimentNotSelected/ExperimentNotSelected";
import DocumentTitle from "../../components/DocumentTitle";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function ExampleAnalysisHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    const initApp = async () => {
      try {
        const sources = await dispatch(getNonameSources()).unwrap();
        if (!sources || (Array.isArray(sources) && sources.length === 0)) {
          if (isDevMode) errNotify("No Noname sources found");
          return;
        }

        if (isDevMode) successNotify("Success loading Noname sources");
      } catch {
        if (isDevMode) errNotify("Error loading Noname sources");
      }
    };

    initApp();
  }, [dispatch]);
  return (
    <React.Fragment>
      <DocumentTitle>Example Analysis Home</DocumentTitle>
      <ExperimentNotSelected />
    </React.Fragment>
  );
}
