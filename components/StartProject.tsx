export function StartProject() {
  return (
    <section id="start" className="relative z-10 section-pad">
      <div className="site-container">
        <div className="reveal-group max-w-xl mx-auto text-center">
          <p className="reveal text-eyebrow text-signal-blue mb-6">START</p>

          <h2 className="reveal text-section mb-8">
            <span className="font-light">Tell us what&apos;s not </span>
            <span className="font-bold">working.</span>
          </h2>

          <p className="reveal font-light text-text-secondary mb-10">
            Send us where you are and where you want to be. We&apos;ll reply
            with a specific next step, no sales script.
          </p>

          <div className="reveal flex flex-col items-center gap-4">
            <a href="#start" className="btn-primary">
              Book a call
            </a>
            <p className="font-light text-text-secondary text-base">
              or email{" "}
              <a
                href="mailto:hello@ctrldone.com"
                className="text-signal-blue hover:underline"
              >
                hello@ctrldone.com
              </a>
              {/* [PLACEHOLDER — confirm real contact email/booking link before launch] */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
