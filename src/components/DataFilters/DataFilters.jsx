import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TimeForm from "../TimeForm/TimeForm";
import DropDownSelector from "../UI/DropDownSelector/DropDownSelector";
import MultySelector from "../UI/MultySelector/MultySelector";
import SearchForm from "../UI/SearchForm/SearchForm";
import Button from "../UI/Button/Button";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import clsx from "clsx";
import {
  saveImmConsistent,
  saveImmConsistentMaxValue,
  saveSelectedTrackNums,
  resetDataFilters,
  setIs3D,
  saveTime,
} from "../../redux/datafilters/slice";
import {
  selectTrackNumbersForMultySelect,
  selectImmConsistent,
  selectImmConsistentValues,
  selectImmConsistentMaxValue,
  selectStartTime,
  selectEndTime,
  selectSelectedTrackNums,
  selectIs3D,
} from "../../redux/datafilters/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectSourceNumbers } from "../../redux/datasources/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import css from "./DataFilters.module.css";

const DataFilters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const selectedTrackNums = useSelector(selectSelectedTrackNums);
  const trackNumbersForMultySelect = useSelector(
    selectTrackNumbersForMultySelect
  );
  const immConsistentValues = useSelector(selectImmConsistentValues);
  const immConsistent = useSelector(selectImmConsistent);
  const immConsistentMaxValue = useSelector(selectImmConsistentMaxValue);
  const startTime = useSelector(selectStartTime);
  const endTime = useSelector(selectEndTime);
  const is3D = useSelector(selectIs3D);
  const sourceNumbers = useSelector(selectSourceNumbers);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { id: sourceNumber } = useParams();

  const location = useLocation();
  const hideTimeForm =
    location.pathname === "/example" ||
    /^\/example\/\d+$/.test(location.pathname);

  const handleSourceChange = async (sourceNumber) => {
    if (isLoggedIn) {
      navigate(`/data/${sourceNumber}`);
    } else {
      navigate(`/example/${sourceNumber}`);
    }
  };

  const handleImmConsistent = (value) => {
    dispatch(saveImmConsistent(value));
  };

  const handleSearch = (value) => {
    dispatch(saveImmConsistentMaxValue(value));
  };

  const handleChangedTime = async (value) => {
    dispatch(saveTime(value));
  };

  const handleReset = () => {
    dispatch(resetDataFilters());
  };

  const handleSelectionChange = (options) => {
    dispatch(saveSelectedTrackNums(options));
  };

  const handleToggle = () => {
    dispatch(setIs3D(!is3D));
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Track numbers:</p>
        <MultySelector
          btnLabel="Select  "
          options={trackNumbersForMultySelect}
          selectedOptions={selectedTrackNums}
          onChange={handleSelectionChange}
          dropdownCSSClass={css.dropdownMultyTrackNum}
        />
      </div>

      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>IMM Consistent:</p>
        <DropDownSelector
          btnLabel={immConsistent}
          options={immConsistentValues}
          selectedOption={immConsistent}
          onChange={handleImmConsistent}
          btnCSSClass={css.btnDropDown}
          dropdownCSSClass={css.listDropDown}
        />
      </div>
      <div className={css.searchWrapper}>
        <p className={clsx(css.label, css[theme])}>Consistent Value:</p>
        <SearchForm
          onSearch={handleSearch}
          initValue={immConsistentMaxValue}
          placeholder="Input Value"
        />
      </div>

      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Experiment N:</p>
        <DropDownSelector
          btnLabel={sourceNumber}
          options={sourceNumbers}
          selectedOption={sourceNumber}
          onChange={handleSourceChange}
          btnCSSClass={css.btnDropDown}
          dropdownCSSClass={css.listDropDown}
        />
      </div>

      {!hideTimeForm && (
        <div className={css.timeFormWrapper}>
          <p className={clsx(css.label, css[theme])}>Time:</p>
          <TimeForm
            initialValues={{ startTime, endTime }}
            onChange={handleChangedTime}
          />
        </div>
      )}
      <Button onClick={handleReset} btnAuxStyles={css.btnReset}>
        Reset
      </Button>
      <div className={css.wrapper}>
        <ToggleButton is3D={is3D} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default DataFilters;
