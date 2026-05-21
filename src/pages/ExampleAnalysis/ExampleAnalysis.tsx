import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import clsx from "clsx";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import ShowGraphModal from "../../components/ShowGraphModal/ShowGraphModal";
import { getNonameDataBySource } from "../../redux/data/operations";
import { getNonameSources } from "../../redux/datasources/operations";
import { getErrorMessage } from "../../auxiliary/getErrorMessage";
import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import processData from "../../auxiliary/processData";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
import { errNotify, successNotify } from "../../auxiliary/notification";
import css from "./ExampleAnalysis.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function ExampleAnalysis() {
  const dataLength = useAppSelector(selectDataForAnalysisLength);
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);
  const dataForTrack = useAppSelector(selectFilteredData);
  const theme = useAppSelector(selectTheme);

  const { id: routeId } = useParams<{ id: string }>();

  useEffect(() => {
    const loadSources = async () => {
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

    loadSources();
  }, [dispatch]);

  useEffect(() => {
    if (!routeId) return;

    const loadData = async () => {
      try {
        const data = await dispatch(getNonameDataBySource(routeId)).unwrap();

        if (!data || (Array.isArray(data) && data.length === 0)) {
          if (isDevMode) errNotify("No Noname data found");
          return;
        }
        if (isDevMode) successNotify("Success loading Noname data");

        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));

        if (isDevMode)
          successNotify("Tracks successfully get trajectory of noname");
      } catch (error: unknown) {
        if (isDevMode)
          errNotify(getErrorMessage(error) || "Error loading Noname data");
      }
    };

    loadData();
  }, [dispatch, routeId]);

  return (
    <>
      <DocumentTitle>Example Analysis</DocumentTitle>
      <div className={css.container}>
        <div className={css.auxLine}>
          <DataFilters />
          <ShowGraphModal />
        </div>
        <div className={css.tableContainer}>
          {!error && dataForTrack.length > 0 ? (
            <DataTable data={dataForTrack} />
          ) : (
            <p className={clsx(css.text, css[theme])}>No data found.</p>
          )}
        </div>
        <span>
          Records: {dataForTrack.length} / {dataLength}
        </span>
      </div>
    </>
  );
}
