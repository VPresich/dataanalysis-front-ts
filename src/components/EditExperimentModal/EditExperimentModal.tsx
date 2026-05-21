import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSourceByNumber } from "../../redux/datasources/selectors";
import { updateSourceByNumber } from "../../redux/datasources/operations";
import EditExperimentForm from "../EditExperimentForm/EditExperimentForm";
import { DataSourceUpdate } from "../../redux/datasources/types";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import { errNotify, successNotify } from "../../auxiliary/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

interface EditExperimentModalProps {
  onClose: () => void;
  sourceNumber: number;
}

export default function EditExperimentModal({
  onClose,
  sourceNumber,
}: EditExperimentModalProps): JSX.Element {
  const source = useAppSelector(selectSourceByNumber(sourceNumber));
  const dispatch = useAppDispatch();

  const handleExperimentSave = (values: DataSourceUpdate) => {
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
