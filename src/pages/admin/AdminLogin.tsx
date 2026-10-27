import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { BRAND, content } from "../../data/content";
import { signInAdmin } from "../../lib/adminAuth";
import crestLogo from "../../assets/black-fortress-logo.png";

const inputClass =
  "w-full rounded-xl border border-charcoal-600 bg-charcoal-850 px-4 py-3 text-white placeholder:text-white/30 transition-colors focus:border-court-500 focus:outline-none";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = signInAdmin(username, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    // On success useAdminUnlocked flips the page to the dashboard.
  };

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-charcoal-950 px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-court-500/10 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <img src={crestLogo} alt={content.partners.blackFortressAlt} className="mx-auto h-20 w-20" />
        <p className="mt-3 text-center font-display text-sm tracking-[0.25em] text-court-500">
          {BRAND}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-3xl border border-white/10 bg-charcoal-900 p-8 shadow-2xl"
        >
          <h1 className="text-xl font-bold">{content.admin.login.heading}</h1>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="admin-username" className="mb-1.5 block text-sm font-medium text-white/80">
                {content.admin.login.username}
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-white/80">
                {content.admin.login.password}
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div aria-live="polite">
            {error && (
              <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-court-500 px-6 py-3 font-bold text-charcoal-950 transition-all duration-300 hover:bg-court-400"
          >
            {content.admin.login.submit}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-white/50 transition-colors hover:text-white"
        >
          {content.admin.login.backToSite}
        </Link>
      </div>
    </main>
  );
};

export default AdminLogin;
