const OUTCOMES = [
  {
    stat: "2",
    description:
      "Companies, one contract. Strategy and execution never separate.",
  },
  {
    stat: "14",
    description:
      "Days from first call to a growth plan you can act on.",
  },
  {
    stat: "0",
    description: "Handoffs between the deck and the deploy.",
  },
];

export function Outcomes() {
  return (
    <section id="outcomes" className="relative z-10 section-pad">
      <div className="site-container">
        <div className="reveal-group max-w-2xl mb-16">
          <p className="reveal text-eyebrow text-signal-blue mb-6">
            HOW WE OPERATE
          </p>
          <h2 className="reveal text-section">
            <span className="font-light">Three numbers that don&apos;t need a </span>
            <span className="font-bold">case study.</span>
          </h2>
        </div>

        <div className="reveal-group grid grid-cols-1 md:grid-cols-3 gap-6">
          {OUTCOMES.map((outcome) => (
            <article key={outcome.stat} className="reveal glow-card text-center md:text-left">
              <p className="text-6xl font-bold text-signal-blue mb-4">
                {outcome.stat}
              </p>
              <p className="font-light text-text-secondary text-base">
                {outcome.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
