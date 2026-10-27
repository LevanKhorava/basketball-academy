import { content } from "../data/content";
import { embedUrl, watchUrl } from "../lib/youtube";
import { prefersReducedMotion } from "../lib/motion";
import { useDialog } from "../hooks/useDialog";

interface VideoLightboxProps {
  /** `null` keeps the lightbox closed; unmounting the iframe stops playback. */
  videoId: string | null;
  /** Accessible name for the player (e.g. the applicant's name). */
  title?: string;
  onClose: () => void;
}

const VideoLightbox = ({ videoId, title, onClose }: VideoLightboxProps) => {
  const dialogRef = useDialog({ open: videoId !== null, onClose });

  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-[fadeSlideUp_0.2s_ease-out_both]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? content.lightbox.iframeTitle}
        tabIndex={-1}
        className="w-full max-w-5xl"
      >
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label={content.lightbox.close}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/85"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <iframe
            src={embedUrl(videoId, { autoplay: !prefersReducedMotion() })}
            title={title ?? content.lightbox.iframeTitle}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="mt-3 text-center text-xs text-white/50">
          {content.form.preview.fallbackNote}{" "}
          <a
            href={watchUrl(videoId)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-court-400 underline-offset-2 hover:underline"
          >
            {content.form.preview.watchOnYoutube}
          </a>
        </p>
      </div>
    </div>
  );
};

export default VideoLightbox;
