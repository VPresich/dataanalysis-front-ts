import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { getUserSources } from "../../redux/datasources/operations";
import { selectIsLoading } from "../../redux/datasources/selectors";
import ExperimentNotSelected from "../../components/ExperimentNotSelected/ExperimentNotSelected";
import DocumentTitle from "../../components/DocumentTitle";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function DataAnalysisHome() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    const initApp = async () => {
      try {
        const sources = await dispatch(getUserSources()).unwrap();
        if (isDevMode) successNotify("Success loading USER sources");
        if (!sources || (Array.isArray(sources) && sources.length === 0)) {
          if (isDevMode) errNotify("No USER sources found");
          return;
        }
      } catch {
        if (isDevMode) errNotify("Error loading USER sources");
      }
    };

    initApp();
  }, [dispatch]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <DocumentTitle>Data Analysis Home</DocumentTitle>
      <ExperimentNotSelected />
    </React.Fragment>
  );
}
