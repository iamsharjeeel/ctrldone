"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { X } from "lucide-react";
import { getLenis } from "@/lib/lenis";

const EXIT_MS = 280;

type Status = "idle" | "submitting" | "success";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="var(--signal-blue)"
        strokeWidth="2.5"
      />
      <path
        d="M16 24 L22 30 L33 17"
        stroke="var(--signal-lime)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      getLenis()?.stop();
      document.body.classList.add("modal-open");
      const raf = requestAnimationFrame(() => {
        setShown(true);
        firstFieldRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }

    if (mounted) {
      setShown(false);
      getLenis()?.start();
      document.body.classList.remove("modal-open");
      const timer = setTimeout(() => {
        setMounted(false);
        setStatus("idle");
      }, EXIT_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // [PLACEHOLDER] Wire to real endpoint / CRM before launch.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
  };

  if (!mounted) return null;

  return (
    <div
      className={`modal-overlay ${shown ? "modal-overlay--shown" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div ref={dialogRef} className="modal-card">
        <button
          type="button"
          className="modal-close"
          onClick={handleClose}
          aria-label="Close form"
        >
          <X size={20} aria-hidden />
        </button>

        {status === "success" ? (
          <div className="modal-success">
            <BrandMark className="modal-success__mark" />
            <h2 id="project-modal-title" className="text-section modal-heading">
              <span className="font-light">Message </span>
              <span className="font-bold">sent.</span>
            </h2>
            <p className="font-light text-text-secondary modal-sub">
              Thanks for reaching out. We&apos;ll reply within one business day
              with a specific next step — no sales script.
            </p>
            <button type="button" className="btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <BrandMark className="modal-head__mark" />
              <p className="text-eyebrow text-signal-blue modal-eyebrow">
                START A PROJECT
              </p>
              <h2
                id="project-modal-title"
                className="text-section modal-heading"
              >
                <span className="font-light">Let&apos;s get it </span>
                <span className="font-bold">done.</span>
              </h2>
              <p className="font-light text-text-secondary modal-sub">
                Tell us where you are and where you want to be. We&apos;ll come
                back with a concrete next step.
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label htmlFor="pm-name">Name</label>
                  <input
                    ref={firstFieldRef}
                    id="pm-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="modal-field">
                  <label htmlFor="pm-email">Email</label>
                  <input
                    id="pm-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="modal-field">
                <label htmlFor="pm-company">
                  Company <span className="modal-optional">(optional)</span>
                </label>
                <input
                  id="pm-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                />
              </div>

              <div className="modal-field">
                <label htmlFor="pm-focus">What do you need help with?</label>
                <select id="pm-focus" name="focus" defaultValue="">
                  <option value="" disabled>
                    Choose a focus
                  </option>
                  <option value="strategy">Strategy &amp; positioning</option>
                  <option value="brand">Brand</option>
                  <option value="growth">Growth marketing</option>
                  <option value="product">Product &amp; web</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="modal-field">
                <label htmlFor="pm-message">What&apos;s not working?</label>
                <textarea
                  id="pm-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="A few sentences on the challenge and the outcome you're after."
                />
              </div>

              <button
                type="submit"
                className="btn-primary modal-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <span className="modal-spinner" aria-hidden />
                ) : null}
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              <p className="modal-fineprint text-text-muted font-light">
                Prefer email? Reach us at{" "}
                <a href="mailto:hello@ctrldone.com" className="text-signal-blue">
                  hello@ctrldone.com
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
