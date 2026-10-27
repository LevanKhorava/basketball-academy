import { BRAND, content } from "../data/content";
import spectraLogo from "../assets/spectra-logo.jpg";
import crestLogo from "../assets/black-fortress-logo.png";

const navLinks = [
  { href: "#about", label: content.nav.about },
  { href: "#opportunities", label: content.nav.opportunities },
  { href: "#register", label: content.nav.register },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const socials = content.footer.socials.filter((social) => social.href);
  const hasContact = Boolean(content.footer.contactEmail || content.footer.contactPhone);

  return (
    <footer className="border-t border-white/5 bg-charcoal-900/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center gap-x-14 gap-y-6 border-b border-white/5 pb-10">
          <div className="flex items-center gap-4">
            <img
              src={spectraLogo}
              alt={content.partners.spectraAlt}
              className="h-12 w-12 rounded-xl mix-blend-screen"
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {content.partners.presenterLabel}
              </p>
              <p className="font-display tracking-wide">{content.partners.spectraName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={crestLogo} alt={content.partners.blackFortressAlt} className="h-12 w-12" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {content.partners.supporterLabel}
              </p>
              <p className="font-display tracking-wide">{content.partners.blackFortressName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl tracking-wide">
              BLACK FORTRESS <span className="text-court-500">× DWIGHT HOWARD</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/50">{content.footer.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <nav aria-label={content.footer.navHeading}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
                {content.footer.navHeading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {hasContact && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
                  {content.footer.contactHeading}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                  {content.footer.contactEmail && (
                    <li>
                      <a
                        href={`mailto:${content.footer.contactEmail}`}
                        className="transition-colors hover:text-white"
                      >
                        {content.footer.contactEmail}
                      </a>
                    </li>
                  )}
                  {content.footer.contactPhone && (
                    <li>
                      <a
                        href={`tel:${content.footer.contactPhone}`}
                        className="transition-colors hover:text-white"
                      >
                        {content.footer.contactPhone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {socials.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
                  {content.footer.socialsHeading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className="mt-12 border-t border-white/5 pt-6 text-sm text-white/40">
          © {year} {BRAND}. {content.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
