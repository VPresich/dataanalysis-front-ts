import { useState } from "react";
import { useSelector } from "react-redux";
import { FaFileUpload } from "react-icons/fa";

import Button from "../UI/Button/Button";
import AddExperimentModal from "../AddExperimentModal/AddExperimentModal";
import UnauthorizedModal from "../UnauthorizedModal/UnauthorizedModal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AddExperiment.module.css";

export default function AddExperiment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <Button onClick={openModal}>
        <span className={css.btn}>
          <FaFileUpload size={24} /> <span>Upload Data</span>
        </span>
      </Button>

      {isModalOpen &&
        (isLoggedIn ? (
          <AddExperimentModal onClose={closeModal} />
        ) : (
          <UnauthorizedModal onClose={closeModal} />
        ))}
    </div>
  );
}
