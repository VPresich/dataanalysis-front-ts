import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIs3D } from "../../redux/datafilters/selectors";
import LineGraph from "../LineGraph/LineGraph";
import LineGraph3D from "../LineGraph3D/LineGraph3D";
import MultySelector from "../UI/MultySelector/MultySelector";
import clsx from "clsx";
import { selectTheme } from "../../redux/auth/selectors";
import { selectProcessedTracks } from "../../redux/data/selectors";
import {
  selectTrackNumbersForMultySelect,
  selectSelectedTrackNums,
} from "../../redux/datafilters/selectors";
import { saveSelectedTrackNums } from "../../redux/datafilters/slice";
import AITrajectoryReport from "../AITrajectoryReport/AITrajectoryReport";
import { selectAITrackNum } from "../../redux/ai/selectors";
import { changeActiveTrack } from "../../redux/ai/slice";
import css from "./GraphComponent.module.css";

const GraphComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const is3D = useAppSelector(selectIs3D);
  const selectedTrackNums = useAppSelector(selectSelectedTrackNums);
  const processedTracks = useAppSelector(selectProcessedTracks);
  const trackNumbersForMultySelect = useAppSelector(
    selectTrackNumbersForMultySelect,
  );
  const activeAITrackNum = useAppSelector(selectAITrackNum);

  const handleSelectionChange = (options) => {
    dispatch(saveSelectedTrackNums(options));
    if (
      activeAITrackNum !== null &&
      !options.map(Number).includes(activeAITrackNum)
    ) {
      dispatch(changeActiveTrack(null));
    }
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <MultySelector
          btnLabel="Select  "
          options={trackNumbersForMultySelect}
          selectedOptions={selectedTrackNums}
          onChange={handleSelectionChange}
          dropdownCSSClass={css.dropdownMultyTrackNum}
          btnCSSClass={clsx(css.btnDropDown, css[theme])}
          iconCSSClass={css.icon}
        />
      </div>
      {is3D ? (
        <LineGraph3D groupedData={processedTracks} />
      ) : (
        <LineGraph groupedData={processedTracks} />
      )}
      <AITrajectoryReport />
    </div>
  );
};
export default GraphComponent;
