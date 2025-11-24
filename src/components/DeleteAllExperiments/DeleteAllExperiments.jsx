import { useState } from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import { useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import DeleteAllExperimentsModal from "../DeleteAllExperimentsModal/DeleteAllExperimentsModal";
import UnauthorizedModal from "../UnauthorizedModal/UnauthorizedModal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./DeleteAllExperiments.module.css";

export default function DeletAllExperiments() {
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
          <FcDeleteDatabase size={24} /> <span>Delete All</span>
        </span>
      </Button>
      {isModalOpen &&
        (isLoggedIn ? (
          <DeleteAllExperimentsModal onClose={closeModal} />
        ) : (
          <UnauthorizedModal onClose={closeModal} />
        ))}
    </div>
  );
}
