import { useRef } from "react";
import css from "./UploadFileButton.module.css";

const UploadFileButton = ({
  children,
  icon = null,
  onFileSelect,
  className,
  accept,
  error,
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    onFileSelect?.(file);
  };

  return (
    <div className={css.wrapper}>
      <button type="button" onClick={handleButtonClick} className={className}>
        {icon && icon}
        {children}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={css.inputFile}
        accept={accept}
      />
      {error && <span className={css.error}>{error}</span>}
    </div>
  );
};

export default UploadFileButton;
