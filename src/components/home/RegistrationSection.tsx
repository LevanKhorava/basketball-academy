import Reveal from "../Reveal";
import RegistrationForm from "./RegistrationForm";
import BasketballIcon from "../BasketballIcon";
import { content } from "../../data/content";
import { images } from "../../data/images";

const RegistrationSection = () => (
  <section id="register" aria-labelledby="register-heading" className="relative scroll-mt-24 overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-court-500/10 blur-3xl" />
      <BasketballIcon className="animate-float absolute right-[6%] top-28 hidden h-10 w-10 opacity-40 blur-[1px] lg:block" />
      <BasketballIcon className="animate-float absolute bottom-36 left-[4%] hidden h-14 w-14 opacity-30 blur-[2px] lg:block [animation-delay:1.6s] [animation-duration:8s]" />
    </div>

    <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2
          id="register-heading"
          className="heading-accent heading-accent-center text-3xl font-black sm:text-4xl"
        >
          {content.register.heading}
        </h2>
        <p className="mt-4 leading-relaxed text-white/60">{content.register.lead}</p>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr]">
        {images.register && (
          <Reveal className="hidden h-full lg:block">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10">
              <img
                src={images.register}
                alt="დუაიტ ჰოვარდი მოედანზე FORTRESS-ის ფორმით"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent"
              />
              <div className="animate-float absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-court-500/40 bg-charcoal-950/80 px-4 py-2 backdrop-blur">
                <BasketballIcon className="h-4 w-4 shrink-0" />
                <span className="text-xs font-bold tracking-wider text-white">
                  {content.about.highlight.title}
                </span>
              </div>
            </div>
          </Reveal>
        )}
        <Reveal
          delay={150}
          className={images.register ? "mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none" : "mx-auto w-full max-w-2xl"}
        >
          <div className="glow-border rounded-3xl border border-white/10 bg-charcoal-900 p-6 shadow-2xl sm:p-10">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default RegistrationSection;
