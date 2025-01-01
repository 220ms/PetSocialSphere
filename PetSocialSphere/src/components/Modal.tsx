import { useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import React from "react";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current) {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
