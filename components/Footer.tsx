import Image from "next/image";

const FOOTER_LINKS = [
  { href: "#why", label: "Why" },
  { href: "#services", label: "What We Run" },
  { href: "#process", label: "How We Work" },
  { href: "#otomate", label: "Otomate" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-text-muted/20 py-16">
      <div className="site-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <a href="#hero" className="text-text">
            <Image
              src="/logo.svg"
              alt=""
              width={120}
              height={30}
              className="h-7 w-auto"
              aria-hidden
            />
            <span className="sr-only">CTRLDONE</span>
          </a>

          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* [PLACEHOLDER] social links */}
          <div className="flex gap-4 text-sm text-text-muted">
            <span>[PLACEHOLDER]</span>
          </div>
        </div>

        <p className="text-sm text-text-muted font-light">
          © 2026 CTRLDONE. Otomate is our technical studio.
        </p>
      </div>
    </footer>
  );
}
