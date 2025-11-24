import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  errNotify,
  successNotify,
} from "../../../auxiliary/notification/notification";
import { register } from "../../../redux/auth/operations";
import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import RegisterForm from "../Forms/RegisterForm/RegisterForm";
import css from "./RegistrationButton.module.css";

const RegistrationButton = ({ handleClick }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const dispatch = useDispatch();

  const handleShowRegister = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegister = () => {
    setShowRegisterForm(false);
  };

  const handleRegistration = (values) => {
    dispatch(register(values))
      .unwrap()
      .then((response) => {
        if (response.verifyRequired) {
          successNotify("Verification email sent. Please check your inbox.");
        } else {
          successNotify("You've registered successfully — let's get started!");
        }
        setShowRegisterForm(false);
        handleClick && handleClick();
      })
      .catch((error) => {
        errNotify(error);
      });
  };

  return (
    <>
      <button className={css.btn} onClick={handleShowRegister}>
        Registration
      </button>

      {showRegisterForm && (
        <ModalWrapper onClose={handleCloseRegister}>
          <RegisterForm handleRegistration={handleRegistration} />
        </ModalWrapper>
      )}
    </>
  );
};

export default RegistrationButton;
