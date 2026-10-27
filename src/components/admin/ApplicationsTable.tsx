import type { Application } from "../../lib/applicationsApi";
import { formatDateTime } from "../../lib/format";
import { content } from "../../data/content";
import StatusBadge from "../StatusBadge";

interface ApplicationsTableProps {
  applications: Application[];
  onView: (id: string) => void;
}

const viewButtonClass =
  "rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-court-500/50 hover:text-court-300";

/** Desktop: a real table. Mobile: stacked cards. Same data, same actions. */
const ApplicationsTable = ({ applications, onView }: ApplicationsTableProps) => {
  const t = content.admin.dashboard.table;

  return (
    <>
      {/* Desktop */}
      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-white/8 md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{t.caption}</caption>
          <thead className="border-b border-white/8 bg-charcoal-900 text-xs uppercase tracking-wider text-white/40">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-semibold">{t.name}</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">{t.email}</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">{t.phone}</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">{t.status}</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">{t.date}</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                <span className="sr-only">{t.actions}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {applications.map((application) => (
              <tr key={application.id} className="transition-colors hover:bg-white/[0.03]">
                <td className="px-4 py-3.5 font-medium">
                  {application.firstName} {application.lastName}
                </td>
                <td className="max-w-56 break-all px-4 py-3.5 text-white/70">{application.email}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-white/70">{application.phone}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={application.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-white/60">
                  {formatDateTime(application.createdAt)}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button type="button" onClick={() => onView(application.id)} className={viewButtonClass}>
                    {content.admin.dashboard.view}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="mt-6 flex flex-col gap-3 md:hidden">
        {applications.map((application) => (
          <li
            key={application.id}
            className="rounded-2xl border border-white/8 bg-charcoal-900 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">
                {application.firstName} {application.lastName}
              </p>
              <StatusBadge status={application.status} />
            </div>
            <p className="mt-2 break-all text-sm text-white/70">{application.email}</p>
            <p className="mt-1 text-sm text-white/70">{application.phone}</p>
            <p className="mt-1 text-xs text-white/45">{formatDateTime(application.createdAt)}</p>
            <button
              type="button"
              onClick={() => onView(application.id)}
              className={`mt-3 w-full ${viewButtonClass}`}
            >
              {content.admin.dashboard.view}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ApplicationsTable;
