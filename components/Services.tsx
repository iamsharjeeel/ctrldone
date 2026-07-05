import { BarChart3, Megaphone, Palette, Code2 } from "lucide-react";

const SERVICES = [
  {
    icon: BarChart3,
    label: "STRATEGY",
    description:
      "Positioning, market research and a growth plan built around your numbers, not a template.",
  },
  {
    icon: Palette,
    label: "BRAND",
    description:
      "Identity systems, naming and a voice that holds up across every channel you touch.",
  },
  {
    icon: Megaphone,
    label: "GROWTH MARKETING",
    description:
      "Paid media, lifecycle and content programs built to compound month over month.",
  },
  {
    icon: Code2,
    label: "PRODUCT & WEB",
    description:
      "Sites and products designed to convert, built by Otomate on the current stack.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative z-10 section-pad">
      <div className="site-container">
        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <article key={service.label} className="reveal glow-card group">
              <service.icon
                size={40}
                strokeWidth={1.5}
                className="text-text mb-6"
                aria-hidden
              />
              <h3 className="text-sm font-semibold tracking-wide mb-3">
                {service.label}
              </h3>
              <p className="font-light text-text-secondary text-base">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
