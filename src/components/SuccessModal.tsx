import { useRef } from "react";
import { content } from "../data/content";
import { useDialog } from "../hooks/useDialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

/** Shown ONLY after the database has confirmed the application was saved. */
const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  const confirmRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useDialog({ open, onClose, initialFocusRef: confirmRef });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-[fadeSlideUp_0.2s_ease-out_both]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-body"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-charcoal-900 p-8 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={content.successModal.closeAriaLabel}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-court-500/30 bg-court-500/15 animate-[fadeSlideUp_0.45s_ease-out_both]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8 text-court-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 12.5l5 5 10-11" />
          </svg>
        </div>

        <h2 id="success-modal-title" className="mt-5 text-xl font-black">
          {content.successModal.title}
        </h2>
        <p id="success-modal-body" className="mt-3 text-sm leading-relaxed text-white/70">
          {content.successModal.body}
        </p>

        <button
          ref={confirmRef}
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-full bg-court-500 px-6 py-3 font-bold text-charcoal-950 transition-all duration-300 hover:bg-court-400 hover:shadow-[0_8px_30px_rgba(255,107,26,0.35)] active:scale-95"
        >
          {content.successModal.confirm}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
