import React from "react";
import { useAppSelector } from "../../redux/hooks";
import ReactMarkdown from "react-markdown";
import {
  selectAITrackNum,
  selectCurrentAIResponse,
  selectAIError,
} from "../../redux/ai/selectors";
import css from "./AITrajectoryReport.module.css";

export default function AITrajectoryReport() {
  const activeTrackNum = useAppSelector(selectAITrackNum);
  const currentResponse = useAppSelector(selectCurrentAIResponse);
  const error = useAppSelector(selectAIError);

  const handleBlockClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!activeTrackNum && !error) return null;

  return (
    <div onClick={handleBlockClick} className={css.reportContainer}>
      <h3 className={css.reportTitle}>
        AI Analytical Report: Trajectory #{activeTrackNum}
      </h3>

      {error && (
        <div className={css.errorState}>Data Analysis Error: {error}</div>
      )}

      {currentResponse && (
        <div className={css.markdownContent}>
          <ReactMarkdown>{currentResponse.response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
