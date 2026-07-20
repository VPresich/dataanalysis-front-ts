import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  selectIsLoggedIn,
  selectTheme,
  selectUserName,
} from "../../redux/auth/selectors";
import AuthButton from "../Authentication/AuthButton/AuthButton";
import GoogleButton from "../Authentication/GoogleBtn/GoogleBtn";
import RegistrationButton from "../Authentication/RegistrationButton/RegistrationButton";
import SidebarButton from "../SideBarButton/SideBarButton";
import clsx from "clsx";
import css from "./AppMobileMenuContent.module.css";

interface AppMobileMenuContentProps {
  onMenuClick: () => void;
}

const AppMobileMenuContent = ({
  onMenuClick,
}: AppMobileMenuContentProps): JSX.Element => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userName = useAppSelector(selectUserName);
  const theme = useAppSelector(selectTheme);

  const classItem = ({ isActive }: { isActive: boolean }): string => {
    return clsx(css.item, isActive && css.active);
  };

  return (
    <div className={css.mobileContent}>
      <nav className={css.nav}>
        <NavLink className={classItem} to="/" onClick={onMenuClick}>
          Home
        </NavLink>
        {isLoggedIn ? (
          <NavLink className={classItem} to="/data" onClick={onMenuClick}>
            IMMAnalysis
          </NavLink>
        ) : (
          <NavLink className={classItem} to="/example" onClick={onMenuClick}>
            IMMExample
          </NavLink>
        )}
      </nav>
      <SidebarButton handleClick={onMenuClick} />
      <div className={css.authPart}>
        {isLoggedIn ? (
          <>
            <p
              className={clsx(css.userName, css[theme])}
            >{`Hi, ${userName}`}</p>
            <AuthButton handleClick={onMenuClick}>Logout</AuthButton>
          </>
        ) : (
          <>
            <AuthButton handleClick={onMenuClick}>Log In</AuthButton>
            <RegistrationButton handleClick={onMenuClick} />
            <GoogleButton />
          </>
        )}
      </div>
    </div>
  );
};

export default AppMobileMenuContent;
