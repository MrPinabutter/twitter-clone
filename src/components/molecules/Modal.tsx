"use client";

import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../atoms/Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div
      className="
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        z-auto
        inset-0
        outline-none
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
      "
    >
      <div
        className="
            relative 
            w-full 
            lg:w-3/6
            my-6
            mx-auto
            lg:max-w-3xl
            h-full
            lg:h-auto
          "
      >
        <div
          className="
              h-full
              lg:h-auto
              border-0
              rounded-lg
              relative
              flex flex-col
              w-full
              bg-black
              outline-none
              focus:outline-none
            "
        >
          <div className="flex items-center justify-between p-10 rounded-t">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>

            <button
              className="rounded-full p-1 border-0 hover:opacity-70 transition"
              onClick={handleClose}
            >
              <AiOutlineClose size={24} color="white" />
            </button>
          </div>

          <section className="relative p-10 flex-autos">{body}</section>

          <footer className="flex flex-col gap-2 p-10">
            <Button
              label={actionLabel}
              disabled={disabled}
              secondary
              fullWidth
              large
              onClick={handleSubmit}
            />

            {footer}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Modal;
