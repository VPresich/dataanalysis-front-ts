import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./UploadProgressBar.module.css";

export interface UploadProgressBarProps {
  progress: number;
  isLoading: boolean;
}

const UploadProgressBar: React.FC<UploadProgressBarProps> = ({
  progress,
  isLoading,
}) => {
  const theme = useSelector(selectTheme);

  if (!isLoading) return null;

  return (
    <div className={css.progressContainer}>
      <div
        className={clsx(css.progressBar, css[theme])}
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default UploadProgressBar;
