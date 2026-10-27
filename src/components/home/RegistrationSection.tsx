import Reveal from "../Reveal";
import RegistrationForm from "./RegistrationForm";
import { content } from "../../data/content";
import { images } from "../../data/images";

const RegistrationSection = () => (
  <section id="register" aria-labelledby="register-heading" className="relative scroll-mt-24">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-court-500/10 blur-3xl"
    />
    <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="register-heading" className="text-3xl font-black sm:text-4xl">
          {content.register.heading}
        </h2>
        <p className="mt-4 leading-relaxed text-white/60">{content.register.lead}</p>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr]">
        {images.register && (
          <Reveal className="hidden h-full lg:block">
            <img
              src={images.register}
              alt="დუაიტ ჰოვარდი მოედანზე FORTRESS-ის ფორმით"
              loading="lazy"
              className="h-full w-full rounded-3xl border border-white/10 object-cover"
            />
          </Reveal>
        )}
        <Reveal
          delay={150}
          className={images.register ? "mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none" : "mx-auto w-full max-w-2xl"}
        >
          <div className="rounded-3xl border border-white/10 bg-charcoal-900 p-6 shadow-2xl sm:p-10">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default RegistrationSection;
