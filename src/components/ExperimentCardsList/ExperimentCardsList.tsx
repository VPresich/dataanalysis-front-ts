import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataSourceResponse } from "../../redux/datasources/types";
import ExperimentCard from "../ExperimentCard/ExperimentCard";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { changeSourceAndReset } from "../../redux/ai/slice";
import css from "./ExperimentCardsList.module.css";

interface ExperimentCardsListProps {
  experiments: DataSourceResponse[];
}

export default function ExperimentCardsList({
  experiments,
}: ExperimentCardsListProps) {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const { id: currentSource } = useParams();

  const handleSelect = (card: DataSourceResponse): void => {
    dispatch(changeSourceAndReset(card._id));
    if (isLoggedIn) {
      navigate(`/data/${card.source_number}`);
    } else {
      navigate(`/example/${card.source_number}`);
    }
  };

  return (
    <ul className={css.container}>
      {experiments.map((card) => (
        <li key={card.source_number}>
          <ExperimentCard
            experiment={card}
            selected={String(currentSource) === String(card.source_number)}
            onSelect={() => handleSelect(card)}
          />
        </li>
      ))}
    </ul>
  );
}
