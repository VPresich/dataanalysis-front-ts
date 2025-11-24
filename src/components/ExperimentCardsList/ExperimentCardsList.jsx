import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ExperimentCard from "../ExperimentCard/ExperimentCard";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./ExperimentCardsList.module.css";

export default function ExperimentCardsList({ experiments }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { id: currentSource } = useParams();

  const handleSelect = (source_number) => {
    if (isLoggedIn) {
      navigate(`/data/${source_number}`);
    } else {
      navigate(`/example/${source_number}`);
    }
  };

  return (
    <ul className={css.container}>
      {experiments.map((card) => (
        <li key={card.source_number}>
          <ExperimentCard
            experiment={card}
            selected={String(currentSource) === String(card.source_number)}
            onSelect={() => handleSelect(card.source_number)}
          />
        </li>
      ))}
    </ul>
  );
}
