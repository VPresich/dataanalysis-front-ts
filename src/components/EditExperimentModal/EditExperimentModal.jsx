import { useSelector, useDispatch } from "react-redux";
import { selectSourceByNumber } from "../../redux/datasources/selectors";
import { updateSourceByNumber } from "../../redux/datasources/operations";
import EditExperimentForm from "../EditExperimentForm/EditExperimentForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function EditExperimentModal({ onClose, sourceNumber }) {
  const source = useSelector(selectSourceByNumber(sourceNumber));
  const dispatch = useDispatch();

  const handleExperimentSave = (values) => {
    console.log("Updating experiment:", values);
    console.log("Experiment:", sourceNumber);
    dispatch(updateSourceByNumber({ sourceNumber, values }))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify(`Update experiment ${sourceNumber} was successful`);
        }
        onClose?.();
      })
      .catch(() => {
        if (isDevMode) {
          errNotify(`Error updating experiment ${sourceNumber}`);
        }
      });
  };

  return (
    <ModalWrapper onClose={onClose}>
      <EditExperimentForm
        experiment={source}
        handleExperimentSave={handleExperimentSave}
      />
    </ModalWrapper>
  );
}
