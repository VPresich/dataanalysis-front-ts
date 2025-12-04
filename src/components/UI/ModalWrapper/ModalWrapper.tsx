import { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import iconsPath from "../../../assets/img/icons.svg";
import css from "./ModalWrapper.module.css";
import { ModalWrapperProps } from "./ModalWrapper.types";

const ModalWrapper = ({
  children,
  onClose,
  portalId = "portal-root",
  isGraph = false,
}: ModalWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const target = event.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  const portalRoot = document.getElementById(portalId);
  if (!portalRoot) return null;

  return createPortal(
    <div className={css.modalWrapper} onClick={handleClickOutside}>
      <div
        ref={wrapperRef}
        className={clsx(css.modal, isGraph && css.graph)}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={css.closeBtn} onClick={onClose}>
          <svg
            className={clsx(css.icon, isGraph && css.graph)}
            aria-label="close button icon"
          >
            <use href={`${iconsPath}#icon-x-close`} />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default ModalWrapper;
