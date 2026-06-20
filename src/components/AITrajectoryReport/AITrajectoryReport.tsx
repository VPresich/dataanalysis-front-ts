import React from "react";
import { useAppSelector } from "../../redux/hooks";
import ReactMarkdown from "react-markdown";
import {
  selectAITrackNum,
  selectCurrentAIResponse,
  selectAIIsLoading,
  selectAIError,
} from "../../redux/ai/selectors";
import css from "./AITrajectoryReport.module.css";

export default function AITrajectoryReport() {
  const activeTrackNum = useAppSelector(selectAITrackNum);
  const currentResponse = useAppSelector(selectCurrentAIResponse);
  const isLoading = useAppSelector(selectAIIsLoading);
  const error = useAppSelector(selectAIError);

  const handleBlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!activeTrackNum && !isLoading && !error) return null;

  return (
    <div onClick={handleBlockClick} className={css.reportContainer}>
      <h3 className={css.reportTitle}>
        AI Analytical Report: Trajectory #{activeTrackNum}
      </h3>

      {isLoading && (
        <div className={css.loadingState}>
          ⏳ AI is performing a comprehensive mathematical analysis of the IMM
          filter and Chi-square criteria...
        </div>
      )}

      {error && (
        <div className={css.errorState}>⚠️ Data Analysis Error: {error}</div>
      )}

      {currentResponse && (
        <div className={css.markdownContent}>
          <ReactMarkdown>{currentResponse.response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
