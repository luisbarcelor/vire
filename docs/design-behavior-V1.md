# V1 Behavior / Logic Note — Investing Info Tool

Holds the **computations and runtime rules** that were separated out of the data model.
Data structures live in [design-datamodel-V1.md](./design-datamodel-V1.md).

---

## PortfolioComposition (computed, not stored)

The core feature. Derived on demand from the WatchlistItem list; never persisted.

- **source:** WatchlistItem list
- **filter:** include only items where `weight` is set; exclude weightless items
  (a weightless item means "watching only", not a holding)
- **group:** produce three breakdowns — by region, by sector, by assetClass
- **normalize:** each included item's displayed share = `weight / sum(included weights) × 100`
  - guarantees shares always sum to 100% regardless of sloppy raw input
  - rationale: the tool exists to reveal concentration; raw (un-normalized) display
    would understate real concentration and make the core feature lie
- **caption:** show `based on N of M tracked items` (N = included, M = total tracked),
  so a partial picture is never mistaken for the whole

### Degenerate input — specified so the first implementation doesn't have to guess

- **No included items (N = 0), or sum of included weights = 0:** do not compute, do not
  divide. Render the empty state — a neutral line stating no weighted items are tracked
  yet. Never render `0%`, `NaN`, or an empty chart frame.
- **Negative weights:** treat as invalid input and reject at entry rather than
  normalizing them. A negative share has no meaning in a composition view and would
  break the "shares sum to 100%" guarantee.
- **Weights summing to more or less than 100:** expected and fine — that is exactly what
  normalization exists for. No warning, no correction, no prompt to "fix" it.

---

## Glossary cross-link mirroring (at load)

- for each term A, for each id B in `A.related`:
  - if B is an existing loaded term AND A is not already in `B.related` → add A to `B.related`
- **in memory only** — never written back to the source `.md` files
- **dedupe:** don't add a link that already exists
- **unresolved target** (B not loaded): **skip silently** — this is expected, not an error.
  The glossary is incomplete by design; a missing target is an entry not yet authored and
  will resolve when that file is added. Debug-level log at most — no user-facing warning.

---

## Weight semantics

- `weight` null/unset → "watching only", excluded from PortfolioComposition
- `weight` set → a holding, included in PortfolioComposition

---

## Content-authoring rule (not runtime)

- `GlossaryTerm.id` = filename slug: lowercase, accents stripped, hyphens for multi-word
  (e.g. `fondo-cotizado-vs-no-cotizado`)
- `related` links reference other terms by that slug
