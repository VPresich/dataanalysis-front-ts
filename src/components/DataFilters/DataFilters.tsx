import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TimeForm from "../TimeForm/TimeForm";
import DropDownSelector from "../UI/DropDownSelector/DropDownSelector";
import MultySelector from "../UI/MultySelector/MultySelector";
import SearchForm from "../UI/SearchForm/SearchForm";
import Button from "../UI/Button/Button";
import { TimeDataPayload } from "../../redux/datafilters/types";
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

const DataFilters = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector(selectTheme);
  const selectedTrackNums = useAppSelector(selectSelectedTrackNums);
  const trackNumbersForMultySelect = useAppSelector(
    selectTrackNumbersForMultySelect,
  );
  const immConsistentValues = useAppSelector(selectImmConsistentValues);
  const immConsistent = useAppSelector(selectImmConsistent);
  const immConsistentMaxValue = useAppSelector(selectImmConsistentMaxValue);
  const startTime = useAppSelector(selectStartTime);
  const endTime = useAppSelector(selectEndTime);
  const is3D = useAppSelector(selectIs3D);
  const sourceNumbers = useAppSelector(selectSourceNumbers);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { id } = useParams<{ id: string }>();
  const sourceNumber = id || "";

  const location = useLocation();
  const hideTimeForm =
    location.pathname === "/example" ||
    /^\/example\/\d+$/.test(location.pathname);

  const handleSourceChange = async (sourceNum: string | number | undefined) => {
    if (!sourceNum) return;
    if (isLoggedIn) {
      navigate(`/data/${sourceNum}`);
    } else {
      navigate(`/example/${sourceNum}`);
    }
  };

  const handleImmConsistent = (value: string): void => {
    dispatch(saveImmConsistent(value));
  };

  const handleSearch = (value: string): void => {
    dispatch(saveImmConsistentMaxValue(value));
  };

  const handleChangedTime = (value: TimeDataPayload): void => {
    dispatch(saveTime(value));
  };

  const handleReset = (): void => {
    dispatch(resetDataFilters());
  };

  const handleSelectionChange = (options: string[]): void => {
    dispatch(saveSelectedTrackNums(options));
  };

  const handleToggle = (): void => {
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
          btnLabel={sourceNumber.toString()}
          options={sourceNumbers.map(String)}
          selectedOption={sourceNumber.toString()}
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
        <ToggleButton onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default DataFilters;
