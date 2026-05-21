import { useAppDispatch } from "../../../redux/hooks";
import SendLinkForm from "../Forms/SendLinkForm/SendLinkForm";
import { ResendPayload } from "../../../redux/auth/types";
import { getErrorMessage } from "../../../auxiliary/getErrorMessage";
import { resendVerify, requestResetPwd } from "../../../redux/auth/operations";
import { errNotify, successNotify } from "../../../auxiliary/notification";

interface SendLinkModalProps {
  isForgotPassword?: boolean;
  onClose: () => void;
}

export default function SendLinkModal({
  isForgotPassword = true,
  onClose,
}: SendLinkModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (formData: ResendPayload) => {
    if (isForgotPassword) {
      dispatch(requestResetPwd(formData))
        .unwrap()
        .then((resp) => {
          successNotify(
            resp?.message || "Success to send link to reset password",
          );
          onClose();
        })
        .catch((err: unknown) => {
          errNotify(getErrorMessage(err) || "Failed to send link");
        });
    } else {
      dispatch(resendVerify(formData))
        .unwrap()
        .then((resp) => {
          successNotify(
            resp?.message || "Success to send link to verify email",
          );
          onClose();
        })
        .catch((err: unknown) => {
          errNotify(getErrorMessage(err) || "Failed to send link");
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
