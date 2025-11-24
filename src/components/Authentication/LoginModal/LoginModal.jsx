import { useDispatch } from "react-redux";
import { useState } from "react";
import LoginForm from "../Forms/LoginForm/LoginForm";
import SendLinkModal from "../SendLinkModal/SendLinkModal";
import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import { logIn } from "../../../redux/auth/operations";
import {
  errNotify,
  successNotify,
} from "../../../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function LoginModal({ onClose }) {
  const [isForgotPassword, setIsForgotPassword] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = (values) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify("You have logged in successfully");
        }
        setIsForgotPassword(null);
        onClose && onClose();
      })
      .catch((err) => {
        errNotify(err);
      });
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleResendVerify = () => {
    setIsForgotPassword(false);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(null);
  };

  return (
    <ModalWrapper onClose={onClose}>
      {isForgotPassword === null ? (
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
          onResendVerify={handleResendVerify}
        />
      ) : (
        <SendLinkModal
          onClose={handleBackToLogin}
          isForgotPassword={isForgotPassword}
        />
      )}
    </ModalWrapper>
  );
}
