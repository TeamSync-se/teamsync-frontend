"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Vùng nút hành động (thường là nút phụ rồi nút chính). */
  actions?: ReactNode;
};

export function Modal({ open, onClose, title, children, actions }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className="m-auto w-full max-w-md rounded-lg border border-border bg-surface p-0 text-primary-text shadow-subtle backdrop:bg-inverse-surface/40"
    >
      <div className="flex flex-col gap-4 p-5">
        <h2 className="text-headline-sm">{title}</h2>
        <div>{children}</div>
        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </div>
    </dialog>
  );
}
