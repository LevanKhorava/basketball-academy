import { useState, type ReactNode } from "react";
import {
  APPLICATION_STATUSES,
  type Application,
  type ApplicationStatus,
} from "../../lib/applicationsApi";
import { thumbnailUrl, watchUrl } from "../../lib/youtube";
import { formatDateTime } from "../../lib/format";
import { content } from "../../data/content";
import StatusBadge from "../StatusBadge";
import ConfirmDialog from "../ConfirmDialog";
import VideoLightbox from "../VideoLightbox";

interface ApplicationDetailProps {
  application: Application;
  onBack: () => void;
  /** Resolve with an error message, or null on success (parent patches the list). */
  onStatusChange: (id: string, status: ApplicationStatus) => Promise<string | null>;
  /** Resolve with an error message, or null on success (parent removes + closes). */
  onDelete: (id: string) => Promise<string | null>;
}

const DetailItem = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">{label}</dt>
    <dd className="mt-1 text-sm text-white/85">{children}</dd>
  </div>
);

const ApplicationDetail = ({
  application,
  onBack,
  onStatusChange,
  onDelete,
}: ApplicationDetailProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const t = content.admin.detail;
  const fullName = `${application.firstName} ${application.lastName}`;

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (savingStatus || status === application.status) return;
    setSavingStatus(true);
    setActionError(null);
    const error = await onStatusChange(application.id, status);
    setSavingStatus(false);
    if (error) setActionError(error);
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setActionError(null);
    const error = await onDelete(application.id);
    // On success the parent clears the selection and this component unmounts.
    setDeleting(false);
    if (error) {
      setConfirmOpen(false);
      setActionError(error);
    }
  };

  return (
    <section
      aria-label={t.heading}
      className="mt-6 rounded-2xl border border-white/8 bg-charcoal-900 p-5 sm:p-7"
    >
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-white/60 transition-colors hover:text-white"
      >
        {t.backToList}
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-black">{fullName}</h2>
        <StatusBadge status={application.status} />
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <DetailItem label={t.labels.email}>
          <a href={`mailto:${application.email}`} className="break-all text-court-300 hover:underline">
            {application.email}
          </a>
        </DetailItem>
        <DetailItem label={t.labels.phone}>
          <a href={`tel:${application.phone}`} className="text-court-300 hover:underline">
            {application.phone}
          </a>
        </DetailItem>
        <DetailItem label={t.labels.youtubeUrl}>
          <a
            href={application.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-court-300 hover:underline"
          >
            {application.youtubeUrl}
          </a>
        </DetailItem>
        <DetailItem label={t.labels.videoId}>
          <span className="font-mono text-white/70">{application.youtubeVideoId}</span>
        </DetailItem>
        <DetailItem label={t.labels.createdAt}>{formatDateTime(application.createdAt)}</DetailItem>
        <DetailItem label={t.labels.updatedAt}>{formatDateTime(application.updatedAt)}</DetailItem>
      </dl>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
          {t.videoHeading}
        </h3>
        <div className="mt-3 max-w-xl">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-court-500"
            aria-label={`${t.playVideo} — ${fullName}`}
          >
            <img
              src={thumbnailUrl(application.youtubeVideoId)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-court-500 shadow-xl transition-transform duration-300 group-hover:scale-110">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-7 w-7 text-charcoal-950" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
          <a
            href={watchUrl(application.youtubeVideoId)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-white/50 underline-offset-2 transition-colors hover:text-court-300 hover:underline"
          >
            {t.openOnYoutube}
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 border-t border-white/5 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label
            htmlFor="status-select"
            className="block text-sm font-semibold uppercase tracking-wider text-white/40"
          >
            {t.statusChange}
          </label>
          <div className="mt-2 flex items-center gap-3">
            <select
              id="status-select"
              value={application.status}
              disabled={savingStatus}
              onChange={(event) => handleStatusChange(event.target.value as ApplicationStatus)}
              className="rounded-xl border border-charcoal-600 bg-charcoal-850 px-4 py-2.5 text-sm focus:border-court-500 focus:outline-none disabled:opacity-60"
            >
              {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {content.admin.statuses[status]}
                </option>
              ))}
            </select>
            {savingStatus && <span className="text-sm text-white/50">{t.statusSaving}</span>}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={deleting}
          className="rounded-full border border-red-500/40 px-6 py-2.5 text-sm font-bold text-red-400 transition-colors hover:border-red-500 hover:bg-red-500/10 disabled:opacity-60"
        >
          {t.delete}
        </button>
      </div>

      <div aria-live="polite">
        {actionError && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {actionError}
          </p>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={content.admin.confirmDelete.title}
        body={content.admin.confirmDelete.body}
        confirmLabel={content.admin.confirmDelete.confirm}
        busyLabel={t.deleting}
        cancelLabel={content.admin.confirmDelete.cancel}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <VideoLightbox
        videoId={videoOpen ? application.youtubeVideoId : null}
        title={`${fullName} — ${content.lightbox.iframeTitle}`}
        onClose={() => setVideoOpen(false)}
      />
    </section>
  );
};

export default ApplicationDetail;
