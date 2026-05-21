import { useAppDispatch } from "../../redux/hooks";
import AddExperimentForm from "../AddExperimentForm/AddExperimentForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import { getErrorMessage } from "../../auxiliary/getErrorMessage";
import { AddExperimentFormData } from "../AddExperimentForm/AddExperimentForm";
import { DataSourceCreate } from "../../redux/datasources/types";
import { uploadData } from "../../redux/datasources/operations";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

interface AddExperimentModal {
  onClose: () => void;
}

export default function AddExperimentModal({ onClose }: AddExperimentModal) {
  const dispatch = useAppDispatch();

  const handleAddExperimentSubmit = (values: AddExperimentFormData) => {
    dispatch(uploadData(values as DataSourceCreate))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify("Data uploaded successfully");
        }
        onClose?.();
      })
      .catch((error: undefined) => {
        if (isDevMode) {
          errNotify(getErrorMessage(error) || "Failed to upload data");
        }
        console.error("Upload error", error);
      });
  };

  return (
    <ModalWrapper onClose={onClose}>
      <AddExperimentForm onSubmitForm={handleAddExperimentSubmit} />
    </ModalWrapper>
  );
}
