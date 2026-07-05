# CTRLDONE

Growth and digital strategy partner website — a single long-scroll flagship page built with Next.js 15, Tailwind CSS v4, React Three Fiber, and GSAP.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** with light/dark theme tokens
- **Fredoka** via `next/font/google`
- **React Three Fiber** for the Control Ring signature element
- **GSAP + ScrollTrigger** for scroll choreography
- **Lenis** for smooth scrolling

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

```
/app          — layout, page, globals.css
/components   — Nav, ControlRing, section components
/lib          — gsap, lenis, motion utilities
/public       — logo.svg
```

## Pre-launch placeholders

- Contact email / booking link in `#start` section
- Footer social links
