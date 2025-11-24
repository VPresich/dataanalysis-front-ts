// import { useDispatch } from "react-redux";

import ModalWrapper from "../UI/ModalWrapper/ModalWrapper.jsx";
import DeleteApproveForm from "../DeleteApproveForm/DeleteApproveForm.jsx";
// import {
//   errNotify,
//   successNotify,
// } from "../../auxiliary/notification/notification.js";

export default function DeleteAllExperimentsModal({ onClose }) {
  //   const dispatch = useDispatch();

  const handleDeleteAllExperiments = () => {
    // dispatch(deleteExperiment(numberSource))
    //   .unwrap()
    //   .then(() => {
    //     if (import.meta.env.VITE_DEVELOPED_MODE === "true") {
    //       successNotify("Delete success");
    //     }
    //   })
    //   .catch(() => {
    //     errNotify("Error in delete data");
    //   });
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
