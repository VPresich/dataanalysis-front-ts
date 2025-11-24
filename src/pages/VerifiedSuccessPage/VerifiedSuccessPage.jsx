import { Link } from "react-router-dom";
import css from "./VerifiedSuccessPage.module.css";

/**
 * Page displayed after successful email verification.
 */
export default function VerifiedSuccess() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Email verified successfully!</h1>
      <p className={css.text}>Thank you! You can now log in to your account.</p>
      <Link to="/" className={css.link}>
        Back to Home
      </Link>
    </div>
  );
}
