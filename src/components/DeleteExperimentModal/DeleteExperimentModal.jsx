import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import DeleteApproveForm from "../DeleteApproveForm/DeleteApproveForm";
import { deleteSourceByNumber } from "../../redux/datasources/operations";
import { selectNextSourceNumber } from "../../redux/datasources/selectors";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function DeleteExperimentModal({ onClose, sourceNumber }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: currentSource } = useParams();
  const nextSourceNumber = useSelector(selectNextSourceNumber(sourceNumber));

  const handleDeleteExperiment = () => {
    dispatch(deleteSourceByNumber(sourceNumber))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify(`Deleting experiment ${sourceNumber} was successful`);
        }

        if (String(currentSource) === String(sourceNumber)) {
          if (nextSourceNumber) {
            navigate(`/data/${nextSourceNumber}`);
          } else {
            navigate(`/data`);
          }
        }
        onClose?.();
      })
      .catch(() => {
        if (isDevMode) {
          errNotify(`Error deleting experiment ${sourceNumber}`);
        }
      });
  };

  return (
    <ModalWrapper onClose={onClose}>
      <DeleteApproveForm
        onApprove={handleDeleteExperiment}
        onCancel={onClose}
        title="Confirm Deletion"
        text={`Are you sure you want to delete Experiment ${sourceNumber}?`}
      />
    </ModalWrapper>
  );
}
