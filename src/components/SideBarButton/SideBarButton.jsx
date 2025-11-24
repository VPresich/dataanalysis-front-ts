import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/sidebar/slice";
import { selectTheme } from "../../redux/auth/selectors";
import { FiBarChart } from "react-icons/fi";
import clsx from "clsx";
import css from "./SidebarButton.module.css";

export default function SidebarButton({ handleClick = null }) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <button
      className={clsx(css.sidebarBtn, css[theme])}
      onClick={() => {
        dispatch(toggleSidebar());
        handleClick && handleClick();
      }}
    >
      <FiBarChart size={20} style={{ marginRight: "8px" }} />
      Experiments
    </button>
  );
}
