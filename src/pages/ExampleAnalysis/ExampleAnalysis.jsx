import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import clsx from "clsx";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import ShowGraphModal from "../../components/ShowGraphModal/ShowGraphModal";
import { getNonameDataBySource } from "../../redux/data/operations";
import { getNonameSources } from "../../redux/datasources/operations";
import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import processData from "../../auxiliary/processData";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";
import css from "./ExampleAnalysis.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function ExampleAnalysis() {
  const dataLength = useSelector(selectDataForAnalysisLength);
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const dataForTrack = useSelector(selectFilteredData);
  const theme = useSelector(selectTheme);

  const { id: sourceNumber } = useParams();

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

      try {
        const data = await dispatch(
          getNonameDataBySource(sourceNumber)
        ).unwrap();
        if (!data || (Array.isArray(data) && data.length === 0)) {
          if (isDevMode) errNotify("No Noname data found");
          return;
        }
        if (isDevMode) successNotify("Success loading Noname data");
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));
        if (isDevMode)
          successNotify("Tracks successfully get trajectory of noname");
      } catch (error) {
        console.error(error);
        if (isDevMode) errNotify("Error loading Noname data");
      }
    };

    initApp();
  }, [dispatch, sourceNumber]);

  return (
    <>
      <DocumentTitle>Example Analysis</DocumentTitle>
      <div className={css.container}>
        <div className={css.auxLine}>
          <DataFilters />
          <ShowGraphModal dataForTrack={dataForTrack} />
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
