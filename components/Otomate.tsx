import { ArrowUpRight } from "lucide-react";

export function Otomate() {
  return (
    <section id="otomate" className="relative z-10 section-pad overflow-hidden">
      <div className="otomate-glow" aria-hidden />
      <div className="site-container relative">
        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="reveal text-eyebrow text-signal-blue mb-6">
              THE EXECUTION ARM
            </p>

            <h2 className="reveal text-section mb-8">
              <span className="font-light">Otomate builds what CTRLDONE </span>
              <span className="font-bold text-signal-lime">designs</span>
              <span className="font-light">.</span>
            </h2>

            <p className="reveal font-light text-text-secondary mb-8">
              Otomate is our own technical studio: the developers, motion
              designers and infrastructure that turn a growth plan into a
              working product. Same company, one contract. Nothing gets lost
              between the strategy and the ship date.
            </p>

            <a
              href="https://otomate.biz"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal link-arrow"
            >
              Visit otomate.biz
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>

          <div className="reveal flex justify-center md:justify-end order-first md:order-last">
            <div className="glow-card glow-card--lime flex items-center justify-center w-48 h-48 md:w-56 md:h-56">
              <svg
                viewBox="0 0 100 100"
                className="w-28 h-28"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="var(--signal-blue)"
                  strokeWidth="3"
                />
                <path
                  d="M32 50 L46 64 L72 34"
                  stroke="var(--signal-lime)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
