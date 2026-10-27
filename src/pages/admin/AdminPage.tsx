import { useAdminUnlocked } from "../../lib/adminAuth";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

/**
 * /admin entry point: a static gate (src/lib/adminAuth.ts). This protects the
 * UI only — what the data layer allows is defined in supabase/schema.sql.
 */
const AdminPage = () => {
  const unlocked = useAdminUnlocked();
  return unlocked ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;
