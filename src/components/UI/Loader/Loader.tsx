import { useSelector } from "react-redux";
import { selectLoader } from "../../../redux/loader/selectors";
import { selectTheme, selectIsRefreshing } from "../../../redux/auth/selectors";
import { Rings } from "react-loader-spinner";
import css from "./Loader.module.css";

const themeColors: Record<string, string> = {
  default: "var(--default)",
  yellow: "var(--yellow)",
  green: "var(--green)",
  blue: "var(--blue)",
  red: "var(--red)",
};

const Loader: React.FC = () => {
  const isLoading: boolean = useSelector(selectLoader);
  const isRefreshing: boolean = useSelector(selectIsRefreshing);
  const theme: keyof typeof themeColors = useSelector(selectTheme);

  if (!isLoading && !isRefreshing) return null;

  const color = themeColors[theme] || themeColors.default;

  return (
    <div className={css.loader}>
      <Rings
        visible={true}
        height="300"
        width="300"
        color={color}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;
