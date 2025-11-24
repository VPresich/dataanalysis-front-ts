import { useSelector, useDispatch } from "react-redux";
import { selectIs3D } from "../../redux/datafilters/selectors";
import LineGraph from "../LineGraph/LineGraph";
import LineGraph3D from "../LineGraph3D/LineGraph3D";
import MultySelector from "../UI/MultySelector/MultySelector";
import clsx from "clsx";
import { selectTheme } from "../../redux/auth/selectors";
import {
  selectTrackNumbersForMultySelect,
  selectSelectedTrackNums,
} from "../../redux/datafilters/selectors";
import { saveSelectedTrackNums } from "../../redux/datafilters/slice";
import css from "./GraphComponent.module.css";

const GraphComponent = ({ dataForTrack }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const is3D = useSelector(selectIs3D);
  const selectedTrackNums = useSelector(selectSelectedTrackNums);
  const trackNumbersForMultySelect = useSelector(
    selectTrackNumbersForMultySelect
  );

  const handleSelectionChange = (options) => {
    dispatch(saveSelectedTrackNums(options));
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
        <LineGraph3D data={dataForTrack} />
      ) : (
        <LineGraph data={dataForTrack} />
      )}
    </div>
  );
};
export default GraphComponent;
