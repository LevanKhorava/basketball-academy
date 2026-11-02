import { useEffect, useState } from "react";
import { content } from "../data/content";
import BasketballIcon from "./BasketballIcon";
import crestLogo from "../assets/black-fortress-logo.png";

const links = [
  { href: "#about", label: content.nav.about },
  { href: "#opportunities", label: content.nav.opportunities },
  { href: "#register", label: content.nav.register },
];

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 8);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-white/10 bg-charcoal-950/95 shadow-[0_10px_34px_rgba(0,0,0,0.4)]"
          : "border-white/5 bg-charcoal-950/80"
      }`}
    >
      <nav
        aria-label={content.nav.ariaLabel}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a href="#hero" className="group flex items-center gap-2.5">
          <img
            src={crestLogo}
            alt=""
            className="h-9 w-9 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
          />
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
              className="nav-link text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#register"
          className="btn-sheen inline-flex items-center gap-2 rounded-full bg-court-500 px-5 py-2 text-sm font-bold text-charcoal-950 transition-all duration-300 hover:bg-court-400 hover:shadow-[0_6px_22px_rgba(255,107,26,0.45)]"
        >
          <BasketballIcon mono className="h-4 w-4 shrink-0" />
          {content.nav.cta}
        </a>
      </nav>

      {/* Reading progress along the bottom edge of the navbar. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 block h-[2px] origin-left bg-gradient-to-r from-court-700 via-court-500 to-court-300"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
};

export default Navbar;
