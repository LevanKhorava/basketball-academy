import { content } from "../../data/content";

/** Prominent reminder that the dashboard is running on dev mock data. */
const DevModeBanner = () => (
  <div
    role="status"
    className="border-b border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-center text-sm font-semibold text-amber-300"
  >
    {content.admin.dashboard.devBanner}
  </div>
);

export default DevModeBanner;
