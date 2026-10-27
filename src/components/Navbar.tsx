import { content } from "../data/content";
import crestLogo from "../assets/black-fortress-logo.png";

const links = [
  { href: "#about", label: content.nav.about },
  { href: "#opportunities", label: content.nav.opportunities },
  { href: "#register", label: content.nav.register },
];

const Navbar = () => (
  <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-charcoal-950/80 backdrop-blur-md">
    <nav
      aria-label={content.nav.ariaLabel}
      className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
    >
      <a href="#hero" className="flex items-center gap-2.5">
        <img src={crestLogo} alt="" className="h-9 w-9" />
        <span className="flex items-baseline gap-2">
          <span className="font-display text-lg tracking-wide text-white">BLACK FORTRESS</span>
          <span className="hidden font-display text-sm tracking-wide text-court-500 sm:inline">
            × DWIGHT HOWARD
          </span>
        </span>
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#register"
        className="inline-flex items-center rounded-full bg-court-500 px-5 py-2 text-sm font-bold text-charcoal-950 transition-all duration-300 hover:bg-court-400 hover:shadow-lg"
      >
        {content.nav.cta}
      </a>
    </nav>
  </header>
);

export default Navbar;
