import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { FaTrash, FaEdit } from "react-icons/fa";
import clsx from "clsx";
import { DataSourceResponse } from "../../redux/datasources/types";
import DeleteExperimentModal from "../DeleteExperimentModal/DeleteExperimentModal";
import EditExperimentModal from "../EditExperimentModal/EditExperimentModal";
import UnauthorizedModal from "../UnauthorizedModal/UnauthorizedModal";
import { selectIsLoggedIn, selectTheme } from "../../redux/auth/selectors";
import css from "./ExperimentCard.module.css";

interface ExperimentCardProps {
  experiment: DataSourceResponse;
  selected: boolean;
  onSelect: (value: number) => void;
}

export default function ExperimentCard({
  experiment,
  selected,
  onSelect,
}: ExperimentCardProps): JSX.Element {
  const { source_number, source_name, file_name, comment } = experiment;
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const theme = useAppSelector(selectTheme);
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    setIsModalEdit(true);
    setIsModalDelete(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    setIsModalEdit(false);
    setIsModalDelete(true);
  };

  const handleCardClick = (): void => {
    onSelect(source_number);
    if (isLoggedIn) {
      navigate(`/data/${source_number}`);
    } else {
      navigate(`/example/${source_number}`);
    }
  };

  return (
    <div
      className={clsx(css.card, css[theme], selected && css.selected)}
      onClick={handleCardClick}
    >
      <div className={css.title}>
        <span className={clsx(css.number)}>{source_number}</span>
        <p className={css.name}>{source_name}</p>
        <div className={css.buttons}>
          <span className={css.btn} onClick={handleEdit}>
            <FaEdit className={clsx(css.icon, css[theme])} size={20} />
          </span>
          <span className={css.btn} onClick={handleDelete}>
            <FaTrash className={clsx(css.icon, css[theme])} size={20} />
          </span>
        </div>
      </div>
      <div className={css.info}>
        <p className={css.fileName}>{file_name}</p>
        <p className={css.comment}>{comment}</p>
      </div>

      {isModalDelete &&
        (isLoggedIn ? (
          <DeleteExperimentModal
            sourceNumber={source_number}
            onClose={() => setIsModalDelete(false)}
          />
        ) : (
          <UnauthorizedModal onClose={() => setIsModalDelete(false)} />
        ))}

      {isModalEdit &&
        (isLoggedIn ? (
          <EditExperimentModal
            sourceNumber={source_number}
            onClose={() => setIsModalEdit(false)}
          />
        ) : (
          <UnauthorizedModal onClose={() => setIsModalEdit(false)} />
        ))}
    </div>
  );
}
