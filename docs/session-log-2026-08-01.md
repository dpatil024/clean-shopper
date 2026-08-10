# Session Log — 2026-08-01

Chronological record of the design-system work done in this session, what shipped vs. what's still exploratory, and where every deliverable actually lives. Written as a session log, not living documentation — for the current state of tokens/components, see `design-tokens.md` and `component-spec.md`, which this session also updated.

---

## 1. Design tokens — foundation

Scope was deliberately narrowed to *tokens only* (no Tailwind, no components) after a scoping discussion, then Tailwind was added back in later in the session (§5) once component work started.

- Browsed **seed.com** live in-browser (not from memory) and pulled real computed styles: colors, type scale, radii, shadows, button/input treatment.
- Wrote **[docs/design-tokens.md](design-tokens.md)**: color, typography, spacing, radius, elevation, borders — adapted from Seed's palette into Clean Shopper's own (including a clean/caution/avoid verdict system Seed has no equivalent for, since Seed doesn't need ingredient-safety signaling).

## 2. Warm/reassuring revision

Feedback: the initial palette read clinical, not reassuring — a problem specifically because Clean Shopper's core moment (checking if a product is safe) can feel anxious if the UI amplifies it.

- Repalette: warmer neutrals, a honey accent instead of lime, and critically — **"avoid" moved from red to terracotta/clay**, reframed in copy as "Skip this one" rather than an alarm.
- Typography: paired a warm serif (headings) with a humanist sans (body), loosened Seed's tight tracking to `normal` or looser throughout.
- Added a **Motion** section to the tokens doc (slow, soft easing; respects `prefers-reduced-motion`).
- Built a visual reference artifact rendering every token as swatches/specimens — published as an Artifact, later saved to `docs/design/design-tokens-visual.html`.

## 3. Accessibility

- Ran a manual WCAG 2.1 AA contrast audit (computed, not eyeballed) on the warm palette. Found and fixed three real failures: `muted` text (3.63:1 → 5.44:1), `caution` chip text (4.32:1 → 5.57:1), `avoid` chip text (4.40:1 → 5.68:1), plus a focus-ring contrast failure (honey accent at 1.78:1, moved to `ink` at 11:1/14.76:1).
- Per request, turned this into a reusable **skill**: **[.claude/skills/a11y-check/SKILL.md](../.claude/skills/a11y-check/SKILL.md)** — computes real contrast ratios, checks focus indicators, color-only signaling, form labels, and heading structure.
- Wired it into **[CLAUDE.md](../CLAUDE.md)** as a standing instruction: run `/a11y-check` on any design/component/page work *before* presenting it as done, not only when asked.
- Re-published the tokens artifact with all fixes applied.

## 4. Product card — 4 layout variants (exploration)

Built as an HTML comparison (not code) varying type, hierarchy, photo placement, tag treatment, and CTA weight, all reusing the same warm tokens:
- **A — Photo-top, pill chip, solid CTA.** ✅ Picked.
- **B — Photo-left, larger serif headline, dot+label tag, text-link CTA.** ✅ Picked.
- **C — Compact thumbnail row, sans-serif bold heading, border-stripe tag, ghost CTA.** Not picked.
- **D — Full-bleed photo overlay with scrim, corner badge, floating CTA.** Not picked.

Saved to **`docs/design/product-card-variants.html`**.

## 5. Building it for real

- Installed **Tailwind CSS v4** (`@tailwindcss/vite`), wired into `vite.config.js`.
- Ported the tokens into `src/index.css` via Tailwind's `@theme` block. Note: `color-base` was renamed to `color-cream` in code — it collided with Tailwind's built-in `text-base` font-size utility. `design-tokens.md` was updated to flag this discrepancy.
- Built **[src/components/ProductCard.jsx](../src/components/ProductCard.jsx)** — Variant A's layout, since that's what was picked for the single-card build.
- Built a basic browse page in **`src/App.jsx`** rendering three sample products (one per verdict state).
- Ran `/a11y-check` on the actual component: found and fixed a heading-order skip (h1→h3, corrected to h1→h2) and added `motion-safe:` to the CTA's hover animation.
- Verified in-browser via the preview tooling (`.claude/launch.json` created for `npm run dev`) — images, chip states, and keyboard focus all confirmed working.

## 6. Browse page — 3 layout variants (exploration)

Built from the two picked card variants (A and B), applied at the page level:
- **1 — Simple grid.** Card A, 3-column grid, search field. Closest to what `App.jsx` currently runs (though `App.jsx` predates this comparison and doesn't match it exactly).
- **2 — Editorial list.** Card B stacked full-width as rows with hairline dividers.
- **3 — Grouped by verdict, with summary.** New structure: a stat strip (counts per verdict) followed by verdict-grouped sections.

**Not yet decided** which becomes the real page. Saved to **`docs/design/browse-page-variants.html`**.

## 7. Documentation pass

- Filled in **`docs/component-spec.md`** (was a placeholder all session) — documents `ProductCard`'s props/layout/a11y notes, and a "Built" vs. "Explored, not built" split so pending decisions (Variant B, the browse-page structure) are visible rather than implied.
- Synced **`docs/design-tokens.md`** to match shipped code exactly (naming, shadow values, radius values), added a "Status: implemented" line and a "Where this lives in code" section.
- Created **`docs/design/`** and copied all three HTML explorations there from scratchpad, so they're not orphaned in a temp directory. Each is flagged as a **static snapshot** — not wired to live tokens, will drift if `src/index.css` changes.

## 8. Mobbin connector

Attempted to search Mobbin (via the connected MCP tool) for real-world product card patterns to compare against. **Blocked** — the connected Mobbin account isn't on a paid plan; the tool returned an upgrade-required error before any results came back. No Mobbin data was retrieved.

## 9. In progress at time of writing

Switched to browsing product-listing pages directly (same method as the original seed.com research) as a substitute for Mobbin, specifically looking for product-card patterns from clean/ingredient-conscious retailers:
- **Grove Collaborative** (grove.co) — captured. Notable pattern: wishlist heart icon top-right over the image, a "New/Limited Edition" ribbon badge top-left over the image, star rating + review count, a green "Earn More" rewards pill, and a full-width solid "Add to Cart" button.
- **Thrive Market** — blocked, membership-gated with no public product browse.
- **Credo Beauty** — attempted, hit a 404 on the direct collection URL; not yet retried with corrected navigation.

This comparison was not finished when this log was written — pick back up by continuing the Credo Beauty look and adding one or two more retailers before reporting a "top 4 patterns" summary.

---

## Where everything lives

| What | Path |
|---|---|
| Design tokens (doc) | `docs/design-tokens.md` |
| Component spec (doc) | `docs/component-spec.md` |
| Design token visual reference | `docs/design/design-tokens-visual.html` |
| Product card variant comparison | `docs/design/product-card-variants.html` |
| Browse page variant comparison | `docs/design/browse-page-variants.html` |
| Built component | `src/components/ProductCard.jsx` |
| Built page | `src/App.jsx` |
| Tailwind theme | `src/index.css` |
| Accessibility skill | `.claude/skills/a11y-check/SKILL.md` |
| Standing a11y instruction | `CLAUDE.md` (References section) |
| Dev server launch config | `.claude/launch.json` |

Nothing in this session was committed to git — everything above is on disk, uncommitted.
