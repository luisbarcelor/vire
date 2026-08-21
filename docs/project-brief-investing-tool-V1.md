# Project Brief — Investing Info Tool (V1)

## Root problem
Investing information is scattered, jargon-heavy, and not localized to Spain — which affects people differently depending on where they sit: total beginners don't start at all ("too difficult"), and people already investing waste time and gain anxiety piecing it together themselves.

## Problem (V1 slice)
V1 deliberately targets only the second half of the root problem above — people who already invest, not total beginners. People who already invest (not total beginners) waste time and gain anxiety because the information they need — event context, portfolio-shape awareness, jargon, Spain-specific tax/broker nuances — is scattered, jargon-heavy, and not localized. Symptom, not hypothetical: a friend spotted his own US-concentration risk, went searching for clarity, and got more anxious instead of less.

## Audience (V1)
People already investing — starting with myself, then people like my friend. **Not** total beginners yet (that's a deliberate, explicit later phase — see note below).

## Core features — what V1 actually ships
- **Watchlist/portfolio board** — manual entry, tagged by region / sector / asset class
- **Portfolio composition view** — aggregates those tags (e.g. "62% US, 12% tech") — descriptive only, no verdicts
- **Glossary** — Spain-flavored (€, Spanish brokers, IRPF, traspasos), starting with terms I still have gaps on, including concentration/diversification/FX entries

That is the whole of V1. Three things, one of which (the composition view) is the reason the tool exists.

## Cut from V1 — recorded so the scope stays honest
- **Strategy explainers (DCA, indexing, diversification, daytrading vs. investing).** Originally listed as a core MVP feature, then reduced to an empty "stub hook," now removed entirely. They reuse the glossary's file format and loader, so there is nothing to pre-build; the folder and nav entry get created the day the first explainer is written. Still wanted — just not V1.
- **Event tracking + plain-language event explainers.** Out of V1 on complexity grounds (external API, content maintenance) — see the divergence note below, because this is the feature the market research rates most differentiated.
- **Look-through on funds/ETFs.** V1 tags each item once; users split funds into multiple rows manually. See [design-datamodel-V1.md](./design-datamodel-V1.md).

## Optional / later
- Event tracking (earnings/dividends via API) + plain-language explanations
- Strategy explainers
- Self-assessment quiz / gap-checker → future beginner on-ramp
- Shareable explainer/FAQ links (built from real questions people ask me)
- AI narration layer on composition data (grounded in real numbers, disclaimed, no invented figures)
- Broker connection / auto-import (parked — real regulatory/complexity cost)

## Guardrails (my own failure patterns + regulatory line)
- No auth, no accounts, no integrations until core value is proven on myself — historically where projects died (OAuth trap)
- Descriptive, never prescriptive — no personalized recommendations, ever (MiFID II / CNMV line)
- Spain-tax framing is the actual differentiation vs. IBKR, Rankia, Finnhub, generic content
- Calm, non-alarmist tone — the anxiety-amplification problem is as real as the knowledge gap

## Success criteria for V1
- I personally use the composition view regularly and it changes or confirms a real decision
- At least one other person (friend) uses it unprompted, without me walking them through it live. **Measured by asking him, not by instrumenting the app** — there are no accounts and no analytics in V1, and adding telemetry to measure this would itself be infrastructure ahead of value.
- I can point to one real moment (like the concentration-risk case) where the tool gave a clearer answer than scattered searching would have

## Note — validation
So far this is validated against one real case (my friend's concentration-risk situation) plus my own use. Worth deliberately testing the problem statement against 2-3 more people before or shortly after building, rather than relying on a single anecdote.

## Market alignment (checked against Spain market research)
- **Regulatory fit:** strong. Descriptive-only, no personalized recommendations — matches the MiFID II / CNMV line between education and regulated advice.
- **Differentiation:** strong on paper. No existing Spanish product (Rankia, Finect, Finanzas para Todos, broker schools, IBKR InvestMentor) bundles glossary + strategy + portfolio composition + Spain-tax framing together. That combination, plus the Spain-tax localization, is the intended moat — but see the divergence note below on what V1 actually delivers of it.
- **Anxiety-reduction angle:** matches a real, documented pattern (finfluencer-driven anxiety in young investors) — the calm, non-alarmist tone is a deliberate response to that, not just a nice-to-have.
- **Known, accepted gap — audience size:** the research's strongest demand case (financial illiteracy, beginners who never start) is a segment V1 doesn't serve. V1 targets a smaller, better-validated slice (people already investing). This is a conscious staged decision, not an oversight — revisit when deciding whether/how to expand toward beginners later.
- **Not yet addressed — distribution & monetization:** the research flags Spain as price-sensitive with strong free incumbents. V1's success criteria are usage-only, no revenue test yet, and no distribution plan exists yet. Both are appropriately out of scope for now but should be tackled before assuming the product is "done."

## Divergences from the market research — deliberate, recorded

**1. Building before validating distribution.** The research's Stage 1 recommendation is to ship free content first, prove low-cost audience acquisition, and only then build the app. V1 does the opposite: it builds the app on one anecdote plus my own use. Accepted because the primary V1 user is me, and a tool I use myself has value independent of whether a content channel takes off. But it means V1 proves *usefulness*, not *market* — no conclusion about demand should be drawn from V1 succeeding.

**2. Dropping the differentiator the research rates highest.** The research names curated event explainers (earnings/dividends with plain-language "what this means") as the most differentiated element, with Spain-tax localization as the hardest-to-copy edge. V1 ships only the second. The bundle is therefore thinner than the "integrated bundle" the moat argument rests on. Accepted for scope reasons; the honest consequence is that V1's differentiation is narrower than the brief's Market alignment section implies.
