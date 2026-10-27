# BLACK FORTRESS × DWIGHT HOWARD — Basketball Academy

Georgian-language web application for a basketball academy, presented by
**Spectra** and supported by **Black Fortress Tbilisi**: a public landing page
with a pre-registration form (YouTube video submission with live embedded
preview) and a password-protected admin dashboard for reviewing, watching, and
managing applications.

**Stack:** Vite 8 · React 19 · TypeScript · Tailwind CSS 4 · React Router 7 · Supabase

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck (tsc -b) + production build
npm run preview    # serve the production build locally
npm run lint       # ESLint
npm run typecheck  # tsc -b only
```

Until Supabase credentials are filled in, the site runs in a graceful
"not configured" mode: the landing page works, the registration form shows a
Georgian configuration error instead of pretending to submit, and `/admin`
shows clearly-labelled demo data under a "demo mode" banner.

## Configuration — `src/config.ts`

Everything is hardcoded in [`src/config.ts`](src/config.ts) (no env files):

| Constant | What to put there |
|---|---|
| `SUPABASE_URL` | Supabase Dashboard → Project Settings → API → **Project URL** |
| `SUPABASE_PUBLISHABLE_KEY` | Same page → **publishable** key (`sb_publishable_…`); the legacy "anon public" key also works |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | `/admin` login (default `admin` / `admin123`) |
| `USE_DEV_MOCKS` | `true` shows demo data in `/admin` while Supabase is unconfigured; auto-disables once credentials are set |

Never put the Supabase **service-role key** anywhere in this project — the
frontend never needs it.

## Supabase setup (2 steps)

1. Create a project at [supabase.com](https://supabase.com).
2. Dashboard → **SQL Editor** → New query → paste the whole of
   [`supabase/schema.sql`](supabase/schema.sql) → Run (idempotent — safe to
   re-run). It creates the `applications` table with validation CHECK
   constraints, indexes, an `updated_at` trigger, column-level grants, and
   RLS policies.

Then paste the URL and publishable key into `src/config.ts` and restart the
dev server. **No Supabase Auth user is needed** — admin login is static.

## Security — read this once

- The `/admin` password is checked **in the browser**
  ([`src/lib/adminAuth.ts`](src/lib/adminAuth.ts)) and ships in the public JS
  bundle. It protects the UI from casual visitors, nothing more.
- Consequently the database allows key-holders (the publishable key is also
  in the bundle) to **read and delete** applications and to **update their
  status** via the REST API. Someone technical who extracts the key could do
  those operations without the password.
- What stays enforced server-side regardless:
  - inserts can only set the 6 content columns — `status` is forced to
    `pending`, ids/timestamps come from defaults;
  - applicant data is immutable (only `status` has UPDATE permission);
  - every value is re-validated by CHECK constraints (email/phone/YouTube-id
    formats, lengths, status whitelist);
  - the service-role key is never used by the frontend.
- This trade-off was chosen deliberately for a simple pre-launch tool. If the
  application data becomes sensitive enough to warrant it, the hardened
  variant (Supabase Auth admin user + authenticated-only policies) can be
  restored — the schema file's header says exactly what changes.
- Change `ADMIN_PASSWORD` before sharing the live link, and keep in mind that
  deleting an application only removes the database record — the video on
  YouTube is untouched.

## Branding & imagery

- Presenter: **Spectra** (logo in the hero and footer, `mix-blend-screen`
  drops its black background on the dark theme).
- Supporter: **Black Fortress Tbilisi** (crest in the navbar, hero, footer,
  and admin login).
- Photos of Dwight Howard: hero (entrance), academy section (training),
  registration section (court close-up).
- Web-optimized copies live in `src/assets/`; the untouched originals are in
  `src/assets/originals/` (gitignored — remove that line in `.gitignore` if
  you want them versioned). To swap a visual, edit
  [`src/data/images.ts`](src/data/images.ts) — no component changes needed.

## Project structure

```
src/
├── config.ts        ALL settings (Supabase URL/key, admin creds, demo flag)
├── data/            content.ts (ALL Georgian copy), images.ts (photo slots),
│                    mockApplications.ts (demo data)
├── lib/             supabaseClient, applicationsApi (CRUD + Georgian error
│                    mapping), adminAuth (static gate), youtube (strict URL
│                    parsing), validation, devMode (demo store), format, motion
├── hooks/           useReveal (scroll reveal), useDialog (focus trap/Esc/
│                    scroll lock for all dialogs), useApplications
├── components/      Navbar, Footer, Reveal, SuccessModal, ConfirmDialog,
│                    VideoLightbox, YouTubePreview, StatusBadge, ScrollToTop
│   ├── home/        Hero, AcademyIntro, Opportunities, RegistrationSection,
│   │                RegistrationForm
│   └── admin/       ApplicationsTable, ApplicationDetail, DevModeBanner
└── pages/           Home.tsx · admin/AdminPage, AdminLogin, AdminDashboard
```

## Deployment

SPA with client-side routing — every path must serve `index.html`:

- **Vercel:** `vercel.json` (included) already has the rewrite.
- **Netlify:** add `/* /index.html 200` to `_redirects`.

## Test status

**Verified locally** (no live Supabase): production build + typecheck + lint;
landing page layout and responsiveness; Georgian form validation; YouTube URL
parsing matrix (`watch?v=`, `youtu.be`, `shorts/`, `live/`, `embed/`, extra
params, scheme-less; rejects wrong hosts like `youtube.com.evil.com` and
malformed ids); live embed preview appears/updates/disappears; submit while
unconfigured → Georgian error, values preserved, **no** success modal;
dialogs (success/confirm/lightbox) with focus trap, Escape, backdrop close;
admin demo flow: login (`admin`/`admin123`), search/filter/sort, detail,
video lightbox, status change, delete with confirmation, logout;
reduced-motion behavior.

**Awaiting Supabase credentials** (re-test after setup): real submission →
success modal only after confirmed insert; insert with a non-pending status
rejected; status update + delete persistence; CHECK-violation error mapping.
