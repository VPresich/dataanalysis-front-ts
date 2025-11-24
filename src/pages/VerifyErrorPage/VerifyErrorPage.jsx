import { Link } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import imgUrl from "../../assets/img/home/default_block.webp";
import css from "./VerifyErrorPage.module.css";

export default function VerifyErrorPage() {
  return (
    <>
      <DocumentTitle>Verify Error Page</DocumentTitle>
      <div className={css.container}>
        <div className={css.infoContainer}>
          <h1 className={css.title}>Email verification failed</h1>
          <p className={css.text}>
            The verification link is invalid or has already been used.
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
