import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../redux/auth/operations";
import DocumentTitle from "../../components/DocumentTitle";
import PasswordResetForm from "../../components/Authentication/Forms/PasswordResetForm/PasswordResetForm";
import imgUrl from "../../assets/img/home/default_block.webp";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";
import css from "./PwdResetPage.module.css";

export default function PwdResetPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { token } = useParams();

  const handleChangePassword = (formData) => {
    console.log("RESET_PASSWORD_FORM:", formData);

    dispatch(
      resetPassword({
        password: formData.password,
        token,
      })
    )
      .unwrap()
      .then((resp) => {
        successNotify(resp.message);
        handleBackBtn();
      })
      .catch((error) => {
        errNotify(error);
      });
  };

  const handleBackBtn = () => {
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
