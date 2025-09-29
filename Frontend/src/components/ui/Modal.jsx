import React from "react";
import Button from "../ui/Button.jsx";
import Divider from "../ui/Divider.jsx";

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[hsl(var(--card))] rounded-xl p-4 w-full max-w-2xl border border-[hsl(var(--border))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="m-0 text-lg font-semibold">{title}</h3>
          <Button variant="ghost" onClick={onClose}>
            ✖
          </Button>
        </div>
        <Divider />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
