"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { primaryButton, secondaryButton } from "@/utils/styles/button";

export type TConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  context: string;
  loading?: boolean;
};

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, context, loading = false }: TConfirmationModalProps) => {
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4 backdrop-blur-sm bg-black/5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="max-w-xl w-full bg-[#FFF9F5] rounded-lg shadow-lg p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col text-center">
          <h3
            id="confirmation-modal-title"
            className="text-[#9F531B] font-semibold text-lg lg:text-xl mb-4"
          >
            {title}
          </h3>

          <p className="text-[#1A1615]/75 text-sm lg:text-base mb-4">{context}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={onClose}
              className={`${secondaryButton} gap-2 w-full sm:w-1/2 cursor-pointer`}
            >
              <FaArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              Cancelar
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`${primaryButton} gap-2 w-full sm:w-1/2 cursor-pointer`}
            >
              <FaCheck className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              {loading ? "Eliminando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
