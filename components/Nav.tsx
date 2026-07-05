"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "#why", label: "Why" },
  { href: "#services", label: "What We Run" },
  { href: "#process", label: "How We Work" },
  { href: "#otomate", label: "Otomate" },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToHash = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || !navRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "bottom top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`nav-bar fixed top-0 left-0 right-0 z-50 ${scrolled ? "nav-bar--scrolled" : ""}`}
      >
        <div className="site-container flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-2 text-text shrink-0">
            <Image
              src="/logo.svg"
              alt=""
              width={120}
              height={30}
              className="h-7 w-auto"
              priority
              aria-hidden
            />
            <span className="sr-only">CTRLDONE</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle light and dark mode"
            >
              {theme === "dark" ? (
                <Moon size={18} aria-hidden />
              ) : (
                <Sun size={18} aria-hidden />
              )}
            </button>

            <a href="#start" className="btn-primary hidden sm:inline-flex text-sm !py-3 !px-5">
              Start a project
            </a>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 text-text"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu md:hidden ${mobileOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollToHash(e, link.href)}
            className="text-2xl font-semibold text-text"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#start"
          className="btn-primary"
          onClick={() => setMobileOpen(false)}
        >
          Start a project
        </a>
      </div>
    </>
  );
}
