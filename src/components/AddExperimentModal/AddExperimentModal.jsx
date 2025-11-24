import { useDispatch } from "react-redux";
import AddExperimentForm from "../AddExperimentForm/AddExperimentForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import { uploadData } from "../../redux/datasources/operations";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function AddExperimentModal({ onClose }) {
  const dispatch = useDispatch();

  const handleAddExperimentSubmit = (values) => {
    // console.log(values);
    dispatch(uploadData(values))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify("Data uploaded successfully");
        }
        onClose && onClose();
      })
      .catch((error) => {
        if (isDevMode) {
          errNotify("Failed to upload data");
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
