import type { ApplicationStatus } from "../lib/applicationsApi";
import { content } from "../data/content";

const BADGE_STYLES: Record<ApplicationStatus, string> = {
  pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  reviewing: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  reviewed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

const DOT_STYLES: Record<ApplicationStatus, string> = {
  pending: "bg-amber-400",
  reviewing: "bg-sky-400",
  reviewed: "bg-emerald-400",
};

const StatusBadge = ({ status }: { status: ApplicationStatus }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${BADGE_STYLES[status]}`}
  >
    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status]}`} />
    {content.admin.statuses[status]}
  </span>
);

export default StatusBadge;
