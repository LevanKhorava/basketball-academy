import { useCallback, useEffect, useMemo, useState } from "react";
import { BRAND, content } from "../../data/content";
import {
  APPLICATION_STATUSES,
  deleteApplication,
  updateApplicationStatus,
  type ApplicationStatus,
} from "../../lib/applicationsApi";
import { signOutAdmin } from "../../lib/adminAuth";
import { devMocksEnabled } from "../../lib/devMode";
import { useApplications } from "../../hooks/useApplications";
import ApplicationsTable from "../../components/admin/ApplicationsTable";
import ApplicationDetail from "../../components/admin/ApplicationDetail";
import DevModeBanner from "../../components/admin/DevModeBanner";

type StatusFilter = ApplicationStatus | "all";
type SortDirection = "desc" | "asc";

const controlClass =
  "rounded-xl border border-charcoal-600 bg-charcoal-850 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-court-500 focus:outline-none";

const AdminDashboard = () => {
  const { applications, setApplications, loading, error, refetch } = useApplications();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const d = content.admin.dashboard;

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let rows = applications;
    if (query) {
      rows = rows.filter(
        (application) =>
          `${application.firstName} ${application.lastName}`.toLowerCase().includes(query) ||
          application.email.toLowerCase().includes(query),
      );
    }
    if (statusFilter !== "all") {
      rows = rows.filter((application) => application.status === statusFilter);
    }
    return [...rows].sort((a, b) =>
      sortDirection === "desc"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt),
    );
  }, [applications, search, statusFilter, sortDirection]);

  const selected = applications.find((application) => application.id === selectedId) ?? null;

  const handleStatusChange = useCallback(
    async (id: string, status: ApplicationStatus): Promise<string | null> => {
      const result = await updateApplicationStatus(id, status);
      if (!result.ok) return result.message;
      setApplications((prev) =>
        prev.map((application) =>
          application.id === id
            ? { ...application, status, updatedAt: new Date().toISOString() }
            : application,
        ),
      );
      return null;
    },
    [setApplications],
  );

  const handleDelete = useCallback(
    async (id: string): Promise<string | null> => {
      const result = await deleteApplication(id);
      if (!result.ok) return result.message;
      setApplications((prev) => prev.filter((application) => application.id !== id));
      setSelectedId(null);
      setNotice(d.deleteSuccess);
      return null;
    },
    [setApplications, d.deleteSuccess],
  );

  return (
    <div className="min-h-svh bg-charcoal-950">
      {devMocksEnabled && <DevModeBanner />}

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-[0.25em] text-court-500">{BRAND}</p>
            <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">{d.heading}</h1>
            <p className="mt-1 text-sm text-white/50">
              {d.totalLabel}: {applications.length}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void signOutAdmin()}
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-court-500/60 hover:text-white"
          >
            {d.logout}
          </button>
        </header>

        <div aria-live="polite">
          {notice && (
            <p className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              {notice}
            </p>
          )}
        </div>

        {selected ? (
          <ApplicationDetail
            application={selected}
            onBack={() => setSelectedId(null)}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <div className="flex-1">
                <label htmlFor="search-input" className="sr-only">
                  {d.searchLabel}
                </label>
                <input
                  id="search-input"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={d.searchPlaceholder}
                  className={`w-full ${controlClass}`}
                />
              </div>
              <div className="flex gap-3">
                <div>
                  <label htmlFor="status-filter" className="sr-only">
                    {d.filterLabel}
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                    className={controlClass}
                  >
                    <option value="all">{d.filterAll}</option>
                    {APPLICATION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {content.admin.statuses[status]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sort-select" className="sr-only">
                    {d.sortLabel}
                  </label>
                  <select
                    id="sort-select"
                    value={sortDirection}
                    onChange={(event) => setSortDirection(event.target.value as SortDirection)}
                    className={controlClass}
                  >
                    <option value="desc">{d.sortNewest}</option>
                    <option value="asc">{d.sortOldest}</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-24" role="status">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-court-500" />
                <span className="sr-only">{d.loading}</span>
              </div>
            ) : error ? (
              <div className="mt-6 rounded-2xl border border-red-500/25 bg-red-500/5 p-8 text-center">
                <p className="text-sm text-red-300">{error}</p>
                <button
                  type="button"
                  onClick={refetch}
                  className="mt-4 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-court-500/60 hover:text-white"
                >
                  {content.admin.errors.retry}
                </button>
              </div>
            ) : applications.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-white/8 bg-charcoal-900 p-10 text-center text-sm text-white/50">
                {d.empty}
              </p>
            ) : filtered.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-white/8 bg-charcoal-900 p-10 text-center text-sm text-white/50">
                {d.emptyFiltered}
              </p>
            ) : (
              <ApplicationsTable applications={filtered} onView={setSelectedId} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
