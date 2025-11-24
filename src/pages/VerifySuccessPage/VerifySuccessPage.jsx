import { Link } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import imgUrl from "../../assets/img/home/default_block.webp";
import css from "./VerifySuccessPage.module.css";

export default function VerifySuccessPage() {
  return (
    <>
      <DocumentTitle>Verify Error Page</DocumentTitle>
      <div className={css.container}>
        <div className={css.infoContainer}>
          <h1 className={css.title}>Email verified successfully!</h1>
          <p className={css.text}>
            Thank you! You can now log in to your account.
          </p>
          <Link to="/" className={css.link}>
            Back to Home
          </Link>
        </div>
        <div className={css.imgContainer}>
          <img src={imgUrl} alt="Picture" className={css.img} />
        </div>
      </div>
    </>
  );
}
