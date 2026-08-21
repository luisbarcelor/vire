# V1 Data Model — Investing Info Tool

Stack-agnostic. Describes **what the data is** only. Runtime behavior and computations
live in [design-behavior-V1.md](./design-behavior-V1.md), not here.

Terminology (DDD): **Entity** = has identity, persists through change.
**Value Object** = pure attribute value, no identity, interchangeable.

---

## ENTITY: WatchlistItem

| field | kind | notes |
|---|---|---|
| id | attribute | generated |
| identifier | attribute | ticker or free-text name |
| notes | attribute | optional |
| weight | attribute | nullable percentage |
| region | value object | enum: US / EU / Spain / Emerging / Other |
| sector | value object | enum: Tech / Finance / Healthcare / Energy / Consumer / Other |
| assetClass | value object | enum: Equity / ETF / Fund / Bond / Crypto / Other |

No parent entity — flat list. No Portfolio/User entity in V1 (deliberate).

---

## Multi-exposure holdings (funds / ETFs) — V1 decision

**The problem.** A WatchlistItem carries exactly one region, one sector and one asset
class. A diversified fund or ETF does not: an MSCI World tracker is not "US" and it is
not "Other" — it is roughly 70% US across every sector. This matters more than it looks,
because the motivating case for the whole tool (spotting US concentration) is precisely a
look-through problem. A single-tag model cannot answer it automatically.

**V1 decision: single tag per item, no look-through. The user splits manually.**

- One WatchlistItem = one exposure. To represent a fund's internal mix, the user enters
  it as several rows (e.g. "MSCI World (US portion)" weight 45, "MSCI World (ex-US)"
  weight 20) and tags each row separately.
- The app does not fetch, infer, or store fund holdings. No look-through logic exists.
- Tagging a whole fund with one region is also valid — it is the user's call how coarse
  the picture is.

**Rejected for V1: weighted tag splits on a single item** (e.g. one item carrying
`{US: 70, EU: 15, Emerging: 15}`). It models reality better, but it multiplies the data
model, the entry UI and the composition math for a problem that manual row-splitting
already solves. Revisit only if manual splitting proves genuinely unusable in real use.

**Known consequence, accepted:** the composition view is exactly as accurate as the tags
the user typed. It reflects self-reported exposure, not actual underlying holdings. The
UI should state this plainly (see [design-ui-guardrails-V1.md](./design-ui-guardrails-V1.md)) so a coarse picture is
never mistaken for a precise one.

---

## ENTITY: GlossaryTerm

| field | kind | notes |
|---|---|---|
| id | attribute | = filename slug (lowercase, accents stripped) |
| term | attribute | Spanish |
| term_en | attribute | English |
| lang | attribute | `es` for now |
| category | value object | enum: tax / broker / fx / risk / markets |

**Body (named sections):**
- `definicion_sencilla` — required
- `por_que_importa` — optional
- `nota_espana` — optional

**Relationships:**
- `related` → GlossaryTerm (many-to-many)

**Content lifecycle:**
- `last_verified` — nullable
- `verify_notes` — optional (authored as the "Verificar antes de publicar" body section)

---

## StrategyExplainer — not an entity in V1

Cut from scope; see [project-brief-investing-tool-V1.md](./project-brief-investing-tool-V1.md).
When the first explainer is written it will reuse the GlossaryTerm shape and loader, and
the entity gets designed then, against real content.

---

## Consciously accepted for V1 (not defects)
- `identifier` is unvalidated; no dedup (can add same ticker twice).
- `lang` is dead weight while all content is `es` — kept for a possible bilingual future.
- Glossary set is intentionally incomplete; some `related` targets point to entries not
  yet authored (see behavior note for how load handles this).
- No look-through on funds/ETFs (see the multi-exposure decision above).
