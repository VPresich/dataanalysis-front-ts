import { useDispatch } from "react-redux";
import { deleteAllSources } from "../../redux/datasources/operations";

import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import DeleteApproveForm from "../DeleteApproveForm/DeleteApproveForm";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function DeleteAllExperimentsModal({ onClose }) {
  const dispatch = useDispatch();

  const handleDeleteAllExperiments = () => {
    dispatch(deleteAllSources())
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify("Delete success");
        }
      })
      .catch(() => {
        if (isDevMode) {
          errNotify("Error in delete data");
        }
      });
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <DeleteApproveForm
        onApprove={handleDeleteAllExperiments}
        onCancel={onClose}
        title="Confirm Deletion"
        text="Are you sure you want to remove all data from all Experiments?"
      />
    </ModalWrapper>
  );
}
