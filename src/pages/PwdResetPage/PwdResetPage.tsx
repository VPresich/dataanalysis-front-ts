import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../redux/auth/operations";
import DocumentTitle from "../../components/DocumentTitle";
import PasswordResetForm from "../../components/Authentication/Forms/PasswordResetForm/PasswordResetForm";
import imgUrl from "../../assets/img/home/default_block.webp";
import { getErrorMessage } from "../../auxiliary/getErrorMessage";
import { PasswordResetFormData } from "../../components/Authentication/Forms/PasswordResetForm/PasswordResetForm";
import { errNotify, successNotify } from "../../auxiliary/notification";
import css from "./PwdResetPage.module.css";

export default function PwdResetPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();

  const handleChangePassword = (formData: PasswordResetFormData): void => {
    if (!token) {
      errNotify("Reset token is missing or expired.");
      return;
    }
    dispatch(
      resetPassword({
        password: formData.password,
        token,
      }),
    )
      .unwrap()
      .then((resp) => {
        successNotify(resp.message);
        handleBackBtn();
      })
      .catch((error: unknown) => {
        errNotify(getErrorMessage(error) || "Error in reset password");
      });
  };

  const handleBackBtn = (): void => {
    navigate("/");
  };

  return (
    <>
      <DocumentTitle>Reset Password Page</DocumentTitle>
      <div className={css.container}>
        <div className={css.formContainer}>
          <PasswordResetForm
            onSubmit={handleChangePassword}
            onBack={handleBackBtn}
          />
        </div>
        <div className={css.imgContainer}>
          <img src={imgUrl} alt="Picture" className={css.img} />
        </div>
      </div>
    </>
  );
}
