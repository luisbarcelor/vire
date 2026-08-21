# V1 UI Guardrails — Investing Info Tool

Extends a core project guardrail — the tool must stay descriptive, never prescriptive,
and must never give personalized investment recommendations — from a content rule into
a presentation rule. [design-behavior-V1.md](./design-behavior-V1.md) specifies how the portfolio composition
data is *computed*; this doc specifies what the *display* of that computation is and
isn't allowed to do. It applies to every screen in the app, regardless of how each one
is eventually laid out or styled.

## Regulatory background

Under Spanish and EU financial regulation (MiFID II), a tool crosses from "education"
into "regulated investment advice" when it presents an opinion about specific financial
instruments as suitable for a particular person's circumstances. Purely explaining
concepts, showing generic information, or displaying a user's own data back to them
without added judgment stays outside that line. The risk is that this line can be
crossed by the *presentation* of data even when the underlying data and written copy are
neutral — for example, a plain percentage becomes an implicit opinion the moment it's
colored red as a warning.

## Rule

**Nothing in the UI may imply a verdict, a target, or an action the user should take.**
The app shows what a person's portfolio composition *is*, never what it *should be*.

## Prohibited patterns

- **No alarm-style color coding (e.g. red/green) applied to concentration or allocation
  figures.** A portfolio being 62% concentrated in one region is a fact, not a warning;
  coloring it as "bad" is an implicit opinion.
- **No benchmark or "ideal" comparison shown alongside a user's actual composition**
  (e.g. no "typical diversified portfolio" overlay, no "vs. recommended allocation").
  A comparison implies a target, and a target implies advice.
- **No directional language in UI copy** — avoid words like "consider," "you may want
  to," "this is risky," "rebalance," "diversify more." Use descriptive nouns only (e.g.
  "62% US, 12% tech"), never evaluative adjectives or instructive verbs.
- **No singling out of individual holdings for emphasis** (e.g. don't pull a user's
  largest position into a highlighted card, badge it, annotate it, or label it "most
  concentrated"). Selecting one row as noteworthy is framing, not neutral display.
- **No push notifications, alerts, or badges triggered by composition changes** (e.g.
  "Your exposure to X just crossed 60%") — this functions as an implicit call to action.
- **No AI-generated narration of a user's composition data in V1.** Free-text generation
  is a likely place for directional or evaluative language to appear unintentionally.

## Allowed / required

- Plain description of shares, groupings, and a caption showing how many tracked items
  the composition is based on (per the normalization and caption rules in
  [design-behavior-V1.md](./design-behavior-V1.md)) — numbers and neutral labels only.
- **Sorting the breakdown descending by share is allowed** — and is the expected default.
  Ordering a list by magnitude is a property of the data, not a judgment about it; the
  same ordering would be used for any quantity, favorable or not. What is prohibited is
  *emphasis*: highlighting, coloring, badging or annotating whichever row lands at the
  top. Sorted-and-plain is fine; unsorted-but-flagged is not.
- Neutral, factual visual encoding where used (e.g. a bar whose length is proportional
  to a percentage share) — this can show magnitude without judgment. Color should be
  reserved for pure categorical distinction (e.g. telling apart region vs. sector vs.
  asset class as separate views), not for signaling good or bad.
- **A statement that the composition reflects the user's own tags**, not verified
  underlying holdings — since funds and ETFs are tagged manually with no look-through
  (see [design-datamodel-V1.md](./design-datamodel-V1.md)). Phrase it descriptively ("calculado a partir de las
  etiquetas que has introducido"), not as a caution or a prompt to correct anything.
- A persistent, non-dismissible disclaimer stating that the app provides educational
  information, not investment advice.

## Why this is written down in advance

Most visual/layout design decisions for this project are deliberately left until a
screen is actually being built, since they're cheap to change later and resolve faster
with a real screen in front of you. This guardrail is the exception: a shipped feature
that reads as an investment recommendation is a regulatory risk, not just a design
inconvenience to fix later. Writing the rule down once, before any screen exists, means
every future screen can be checked against a fixed standard instead of relying on
catching problems by eye each time.

## Open question

Whether to run a lightweight review checklist against this document before shipping
each new screen (e.g. "does this imply a verdict?"). Not yet resolved — worth revisiting
once a real screen exists to test the process against.
