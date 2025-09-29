import React from "react";
// import { Portal } from "react-portal";
import { FocusTrap } from "focus-trap-react";
import "./dialog.css";
import { createPortal } from "react-dom";

type DialogProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="dialog-backdrop" onClick={onClose}>
      <FocusTrap active={true}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="dialog-box"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="dialog-title">{title}</h2>
          <button
            className="dialog-close-button"
            onClick={onClose}
            aria-label="Close dialog"
            tabIndex={0}
          >
            &times;
          </button>
          <div className="dialog-content">
            {children}
            <button
              style={{ display: "none" }}
              tabIndex={0}
              aria-hidden="true"
            />
          </div>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
};

export default Dialog;
