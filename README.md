# Vire

Herramienta de información para invertir, localizada para España.

Vire is a descriptive investing information tool for people who already invest.
It does not give advice, verdicts, or recommendations — that line is a regulatory
constraint (MiFID II / CNMV), not a stylistic preference.

## V1 scope

Three things, and nothing else:

- **Watchlist** — manual entry, tagged by region / sector / asset class
- **Composition view** — aggregates those tags (e.g. "62% US, 12% tech"), descriptive only
- **Glossary** — Spain-flavored (€, Spanish brokers, IRPF, traspasos)

No accounts, no auth, no broker integrations, no event tracking, no AI layer, no
analytics. Those are later phases, not warm-up tasks.

## Design docs

Design is complete for V1 and lives in [`docs/`](./docs). Start with
[`docs/README.md`](./docs/README.md) for the reading order — the project brief
comes first and everything else assumes it.

## Stack

Next.js (App Router) · React · Tailwind CSS · TypeScript · pnpm

Persistence is browser `localStorage`. There is no backend and no database, by
deliberate decision — see [`docs/design-stack-V1.md`](./docs/design-stack-V1.md).

## Getting started

Requires Node.js 20.9+ (this project is developed on Node 24).

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.
