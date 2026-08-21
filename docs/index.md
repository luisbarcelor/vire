# Docs — Investing Info Tool (V1)

Design and scoping documents for a Spain-localized investing information tool.
Solo, part-time project. No code in this folder — these describe what gets built.

These documents refer to the product as the "Investing Info Tool". The repository
and product name is **Vire**; they describe the same product.

## Reading order

1. **[project-brief-investing-tool-V1.md](./project-brief-investing-tool-V1.md)** —
   the problem, the audience, what V1 ships, what was cut, and the guardrails.
   Start here; everything else assumes it.
2. **[design-datamodel-V1.md](./design-datamodel-V1.md)** — what the data is.
   Entities, fields, and the fund/ETF tagging decision.
3. **[design-behavior-V1.md](./design-behavior-V1.md)** — what the code does with it.
   Composition math, normalization, edge cases, glossary link mirroring.
4. **[design-ui-guardrails-V1.md](./design-ui-guardrails-V1.md)** — what the screens
   may and may not show. A regulatory constraint (MiFID II / CNMV), not a style guide.
5. **[design-stack-V1.md](./design-stack-V1.md)** — Next.js, localStorage, and the
   list of decisions deliberately left open until the point of use.
6. **[spanish-market-research.md](./spanish-market-research.md)** — background research.
   Reference material, not a decision record; the brief records where V1 diverges from
   it. A point-in-time snapshot — its own Caveats section notes the vintage of each
   headline datapoint.

## Build order

Hardcoded watchlist items, then the composition view, then real glossary content.
Manual entry, persistence and styling come after the view works.

## Scope reminder

V1 is three things: a manual watchlist, a descriptive composition view, and a
Spain-flavored glossary. No accounts, no broker integration, no event tracking, no AI
layer. Those are later phases, not warm-up tasks.
