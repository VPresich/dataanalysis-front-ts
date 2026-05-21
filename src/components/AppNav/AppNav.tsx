import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AppNav.module.css";
import clsx from "clsx";

const classItem = ({ isActive }: { isActive: boolean }): string => {
  return clsx(css.item, isActive && css.active);
};

export default function AppNav(): JSX.Element {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <nav className={css.nav}>
      <NavLink className={classItem} to="/">
        Home
      </NavLink>
      {isLoggedIn ? (
        <NavLink className={classItem} to="/data">
          IMMAnalysis
        </NavLink>
      ) : (
        <NavLink className={classItem} to="/example">
          IMMExample
        </NavLink>
      )}
      {/* <NavLink className={classItem} to="/hough">
        Hough
      </NavLink>
      <NavLink className={classItem} to="/hough3d">
        Hough3D
      </NavLink>
      <NavLink className={classItem} to="/houghtracks">
        HoughTracks
      </NavLink> */}
    </nav>
  );
}
