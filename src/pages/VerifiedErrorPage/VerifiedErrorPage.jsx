import { Link } from "react-router-dom";
import css from "./VerifiedErrorPage.module.css";

/**
 * Page displayed when email verification fails.
 */
export default function VerifiedErrorPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Email verification failed</h1>
      <p className={css.text}>
        The verification link is invalid or has already been used.
      </p>
      <Link to="/" className={css.link}>
        Back to Home
      </Link>
    </div>
  );
}
