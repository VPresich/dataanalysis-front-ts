import { useAppDispatch } from "../../redux/hooks";
import { deleteAllSources } from "../../redux/datasources/operations";

import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import DeleteApproveForm from "../DeleteApproveForm/DeleteApproveForm";
import { errNotify, successNotify } from "../../auxiliary/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

interface DeleteAllExperimentsModalProps {
  onClose: () => void;
}

export default function DeleteAllExperimentsModal({
  onClose,
}: DeleteAllExperimentsModalProps): JSX.Element {
  const dispatch = useAppDispatch();

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
