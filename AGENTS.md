# CTRLDONE

Single long-scroll marketing website built with Next.js 15 (App Router, TypeScript), Tailwind CSS v4, React Three Fiber, GSAP, and Lenis. There is no backend, database, or required environment variables.

## Cursor Cloud specific instructions

- Single service only: the Next.js frontend. No API, DB, or env vars are needed to run, lint, build, or test.
- Standard commands live in `package.json` (`npm run dev`, `npm run build`, `npm run lint`). Dev and build both use Turbopack; dev serves at `http://localhost:3000`.
- The footer intentionally renders a `[PLACEHOLDER]` and the `#start` section has placeholder contact/booking links (see README "Pre-launch placeholders"). These are expected, not bugs.
- There is no automated test suite; validate changes via `npm run lint`, `npm run build`, and manual browser testing of the single page (theme toggle, nav smooth-scroll, section rendering, 3D Control Ring).
