import { CtaButton } from "./CtaButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex items-center section-pad"
    >
      <div className="site-container w-full">
        <div className="reveal-group max-w-[45%] max-md:max-w-full">
          <p className="reveal text-eyebrow text-signal-blue mb-6">
            CTRLDONE — GROWTH &amp; DIGITAL PARTNERS
          </p>

          <h1 className="reveal text-hero mb-8">
            <span className="font-light">Take </span>
            <span className="font-bold">control</span>
            <span className="font-light">. Get it </span>
            <span className="font-bold">done</span>
            <span className="font-light">.</span>
          </h1>

          <p className="reveal font-light text-text-muted max-w-[480px] mb-10">
            We plan the brand, the growth channels and the market position.
            Otomate, our own technical studio, builds the product. Same team, no
            handoff gap.
          </p>

          <div className="reveal flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <CtaButton className="btn-primary">Start a project</CtaButton>
            <a href="#process" className="link-ghost">
              See how we work ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
