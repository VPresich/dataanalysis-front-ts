import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleSidebar } from "../../redux/sidebar/slice";
import { selectTheme } from "../../redux/auth/selectors";
import { FiBarChart } from "react-icons/fi";
import clsx from "clsx";
import css from "./SidebarButton.module.css";

interface SidebarButtonProps {
  handleClick?: () => void;
}

export default function SidebarButton({ handleClick }: SidebarButtonProps) {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  return (
    <button
      className={clsx(css.sidebarBtn, css[theme])}
      onClick={() => {
        dispatch(toggleSidebar());
        handleClick?.();
      }}
    >
      <FiBarChart size={20} className={css.icon} />
      Experiments
    </button>
  );
}
