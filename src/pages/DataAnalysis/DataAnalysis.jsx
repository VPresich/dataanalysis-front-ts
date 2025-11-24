import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import DocumentTitle from "../../components/DocumentTitle";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import ShowGraphModal from "../../components/ShowGraphModal/ShowGraphModal";
import processData from "../../auxiliary/processData";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import {
  selectStartTime,
  selectEndTime,
} from "../../redux/datafilters/selectors";
import { getFilteredData } from "../../redux/data/operations";
import { getUserSources } from "../../redux/datasources/operations";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";
import css from "./DataAnalysis.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function DataAnalysis() {
  const dataLength = useSelector(selectDataForAnalysisLength);
  const error = useSelector(selectError);
  const dataForTrack = useSelector(selectFilteredData);
  const theme = useSelector(selectTheme);
  const startTime = useSelector(selectStartTime);
  const endTime = useSelector(selectEndTime);

  const dispatch = useDispatch();
  const { id: sourceNumber } = useParams();

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
      try {
        const data = await dispatch(
          getFilteredData({
            sourceNumber,
            startTime,
            endTime,
          })
        ).unwrap();
        if (!data || (Array.isArray(data) && data.length === 0)) {
          if (isDevMode) errNotify("No User data found");
          return;
        }
        if (isDevMode) successNotify("Success loading User data");
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));
        if (isDevMode)
          successNotify("Tracks successfully get trajectory of noname");
      } catch (error) {
        console.error(error);
        if (isDevMode) errNotify("Error loading User data");
      }
    };

    initApp();
  }, [dispatch, sourceNumber, startTime, endTime]);

  return (
    <>
      <DocumentTitle>Example Analysis</DocumentTitle>
      <div className={css.container}>
        <div className={css.auxLine}>
          <DataFilters />
          <ShowGraphModal dataForTrack={dataForTrack} />
        </div>

        <div className={css.tableContainer}>
          {error ? (
            <p className={clsx(css.text, css[theme])}>
              Failed to load data. Please try again.
            </p>
          ) : dataForTrack.length > 0 ? (
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
