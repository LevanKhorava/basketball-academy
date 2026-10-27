import { useRef } from "react";
import { useDialog } from "../hooks/useDialog";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  body?: string;
  confirmLabel: string;
  /** Label shown on the confirm button while `busy`. */
  busyLabel?: string;
  cancelLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Accessible confirmation dialog; initial focus lands on Cancel (safe default). */
const ConfirmDialog = ({
  open,
  title,
  body,
  confirmLabel,
  busyLabel,
  cancelLabel,
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useDialog({ open, onClose: onCancel, initialFocusRef: cancelRef });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-[fadeSlideUp_0.2s_ease-out_both]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        tabIndex={-1}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-charcoal-900 p-7 shadow-2xl"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-bold leading-snug">
          {title}
        </h2>
        {body && <p className="mt-2 text-sm text-white/60">{body}</p>}

        <div className="mt-7 flex gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="flex-1 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 rounded-full bg-red-500/90 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-500 disabled:opacity-60"
          >
            {busy ? (busyLabel ?? confirmLabel) : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
