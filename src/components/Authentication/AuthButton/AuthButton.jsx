import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../../redux/sidebar/slice";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import LoginModal from "../LoginModal/LoginModal";
import { logOut } from "../../../redux/auth/operations";
import {
  errNotify,
  successNotify,
} from "../../../auxiliary/notification/notification";

import IconButton from "../../UI/IconButton/IconButton";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function AuthButton({ children, handleClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleButton = () => {
    if (isLoggedIn) {
      dispatch(logOut())
        .unwrap()
        .then(() => {
          if (isDevMode) {
            successNotify("You have been logged out successfully.");
          }
          dispatch(closeSidebar());
          handleClick && handleClick();
        })
        .catch(() => {
          errNotify("Failed to log out. Please try again.");
        });
    } else {
      handleOpenLogin();
    }
  };

  const handleCloseLogin = () => {
    setShowLoginForm(false);
    handleClick && handleClick();
  };

  const handleOpenLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div>
      <IconButton iconName="icon-log-in-out" onClick={handleButton}>
        {children}
      </IconButton>
      {showLoginForm && <LoginModal onClose={handleCloseLogin} />}
    </div>
  );
}
