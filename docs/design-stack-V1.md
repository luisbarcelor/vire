# V1 Stack Decisions — Investing Info Tool

Records the technical stack decisions for V1. Data model lives in
[design-datamodel-V1.md](./design-datamodel-V1.md); computation/runtime rules live in [design-behavior-V1.md](./design-behavior-V1.md).

Context: this is a solo, part-time project (roughly 5-10 hrs/week). Prior side projects
have stalled after the "interesting" technical setup was solved but before real user
value was built. The stack decisions below are made with that risk in mind: prefer
tools already known well, and avoid building infrastructure before core value is proven.

---

## Framework: Next.js

- Chosen primarily for familiarity — for a small, part-time project, reducing the risk
  of stalling on unfamiliar tooling matters more than picking a theoretically optimal
  framework.
- Fits V1's actual shape: mostly static content (glossary) plus client-side
  interactivity (watchlist, portfolio composition view). No server-side data layer is
  required.

## Persistence: localStorage (browser-only)

- No backend, no database, no user accounts. This matches a core project guardrail:
  no auth, no accounts, and no external integrations until core value is proven.
- Trade-off accepted knowingly: data is tied to one browser on one device. There's no
  cross-device sync, and clearing browser data wipes it. This is acceptable for V1
  because the app only needs to be usable standalone by a single person at a time — it
  doesn't need to sync across devices.
- Rejected: a database (even a simple, single-user one without auth) — this would be
  infrastructure built ahead of proven value, which is the specific failure pattern
  this project is trying to avoid.
- Rejected: a literal local file on disk — this only works if the app runs, unrestarted,
  on one machine (e.g. `next dev`/`next start` locally). It breaks under any real
  deployment, since most hosting environments give the app an ephemeral filesystem that
  resets between requests. That would prevent anyone other than the developer from using
  a deployed version of the app.

## Deployment target: Vercel (default, not yet finalized)

- Not formally decided, but treated as the obvious default given a Next.js app with no
  backend. To be confirmed at first-deploy time rather than designed in advance.

## Resolved

- **How the "descriptive, not prescriptive" rule is enforced at the display level, not
  just in the computation** — answered by [design-ui-guardrails-V1.md](./design-ui-guardrails-V1.md): a fixed list of
  prohibited and required presentation patterns, applying to every screen.

## Explicitly deferred — to be decided at the point of use, not now

These were considered and deliberately left open. The reasoning: stack details like
these resolve faster and more accurately once there's a real, concrete task in front of
you (e.g. a framework's own setup prompts, or the first real attempt at a task) than by
deciding them abstractly ahead of time.

- TypeScript vs. plain JavaScript, Tailwind vs. CSS modules, App Router configuration —
  these are answered directly by Next.js's own project-creation prompts.
- MDX / frontmatter processing library specifics — to be resolved when the first
  glossary content file is actually loaded and rendered.
- Styling approach / design system — to be resolved once unstyled UI is actually felt
  as a problem, not designed preemptively.
- Testing setup — not addressed yet; no current signal that it's blocking anything.

None of these were judged expensive to reverse or currently blocking, so none warranted
upfront design time.

## Explicitly out of scope for V1

- No authentication, no user accounts
- No broker integrations or external API connections
- No AI-generated narration or commentary layer
- No event tracking (e.g. earnings/dividend calendars)
- No analytics or usage telemetry (see the brief's success criteria — V1 measures usage
  by asking, not by instrumenting)

---

## Open / not yet decided

- Content-loading mechanics for glossary markdown+frontmatter files (e.g. repo-based
  files rebuilt at build time, vs. some other loading approach) — still open, to be
  resolved when the first real glossary file is loaded.
