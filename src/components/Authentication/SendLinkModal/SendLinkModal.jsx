import { useDispatch } from "react-redux";
import SendLinkForm from "../Forms/SendLinkForm/SendLinkForm";
import { resendVerify, requestResetPwd } from "../../../redux/auth/operations";
import {
  errNotify,
  successNotify,
} from "../../../auxiliary/notification/notification";

export default function SendLinkModal({ isForgotPassword = true, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    console.log("Form Data:", formData);
    if (isForgotPassword) {
      dispatch(requestResetPwd(formData))
        .unwrap()
        .then((resp) => {
          successNotify(resp?.message);
          onClose && onClose();
        })
        .catch((err) => {
          errNotify(err);
        });
    } else {
      dispatch(resendVerify(formData))
        .unwrap()
        .then((resp) => {
          successNotify(resp?.message);
          onClose && onClose();
        })
        .catch((err) => {
          errNotify(err);
        });
    }
  };

  return (
    <SendLinkForm
      onSubmit={handleSubmit}
      onBack={onClose}
      title={isForgotPassword ? "Reset password" : "Resend verification email"}
      text={
        isForgotPassword
          ? "Enter your email address and we will send you instructions to reset your password."
          : "Enter your email below, and we will send you a new verification link to activate your account."
      }
    />
  );
}
