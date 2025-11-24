import css from "./UploadProgressBar.module.css";

const UploadProgressBar = ({ progress, isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={css.progressContainer}>
      <div className={css.progressBar} style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};

export default UploadProgressBar;
