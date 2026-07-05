const STEPS = [
  {
    num: "01",
    title: "DISCOVER",
    description:
      "Two weeks. Your market, your data, your constraints. We leave with a plan, not a slide deck.",
  },
  {
    num: "02",
    title: "STRATEGIZE",
    description:
      "Positioning, channels and a roadmap you can defend to your board.",
  },
  {
    num: "03",
    title: "BUILD",
    description:
      "Otomate takes the plan and ships it: brand assets, site, campaigns, tracking.",
  },
  {
    num: "04",
    title: "SHIP & SCALE",
    description:
      "We stay on the numbers after launch. If a channel underperforms, we cut it fast.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative z-10 section-pad">
      <div className="site-container">
        <div className="reveal-group max-w-2xl mb-16">
          <p className="reveal text-eyebrow text-signal-blue mb-6">
            HOW WE WORK
          </p>
          <h2 className="reveal text-section">
            <span className="font-light">Four steps. No slide-deck </span>
            <span className="font-bold">theater.</span>
          </h2>
        </div>

        <div className="reveal-group relative max-w-2xl">
          <div className="process-line" aria-hidden />
          <ol className="flex flex-col gap-12">
            {STEPS.map((step) => (
              <li key={step.num} className="reveal relative pl-16">
                <span
                  className="absolute left-0 top-0 text-4xl font-bold text-signal-blue w-10 text-center"
                  aria-hidden
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold mb-2 tracking-wide">
                  {step.title}
                </h3>
                <p className="font-light text-text-secondary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
