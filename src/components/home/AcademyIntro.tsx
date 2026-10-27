import Reveal from "../Reveal";
import { content } from "../../data/content";
import { images } from "../../data/images";

const AcademyIntro = () => (
  <section id="about" aria-labelledby="about-heading" className="scroll-mt-24">
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal>
            <h2 id="about-heading" className="text-3xl font-black sm:text-4xl">
              {content.about.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{content.about.p1}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 leading-relaxed text-white/60">{content.about.p2}</p>
          </Reveal>
          <Reveal delay={300}>
            <ul aria-label={content.about.pillarsLabel} className="mt-8 flex flex-wrap gap-2">
              {content.about.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="rounded-full border border-white/10 bg-charcoal-900 px-4 py-1.5 text-sm text-white/70"
                >
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:mt-10">
          {images.about && (
            <img
              src={images.about}
              alt="დუაიტ ჰოვარდი ვარჯიშზე მოთამაშესთან ერთად"
              loading="lazy"
              className="mb-6 aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
            />
          )}
          <div className="rounded-3xl border border-court-500/25 bg-gradient-to-br from-court-500/10 to-transparent p-8">
            <h3 className="text-xl font-bold text-court-400">{content.about.highlight.title}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{content.about.highlight.body}</p>
            <a
              href="#register"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-court-400 transition-colors hover:text-court-300"
            >
              {content.nav.register}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AcademyIntro;
