# Component Spec — Clean Shopper

Built components live in `/src/components/` as PascalCase `.jsx` files, per `CLAUDE.md` conventions. This doc tracks what exists, what it looks like, and what was explored but not built. Check here before creating a new component — CLAUDE.md requires confirming name/location for any new one, and requires checking this file first for something that already covers the use case.

Component names and specs below are derived from the product scope in `project-context.md` §4 (research recommendations, saved preferences, shopping list, compare).

---

## Component inventory

| Component | Status | Surface | Purpose |
|---|---|---|---|
| `ProductCard` | ✅ Built | Browse page, (reusable) | Single product: photo, verdict, note, add-to-list |
| `VerdictBadge` | ✅ Built | Anywhere a verdict shows | The ribbon+pill visual, as its own primitive |
| `Button` | ✅ Built | Everywhere | Primary/secondary/ghost button, one source of truth for CTA styling |
| `IconButton` | ✅ Built | Anywhere (save/remove icons) | Icon-only button with required `aria-label`, `sm`/`md` sizes |
| `SearchField` | ✅ Built | Browse page header | Labeled search input, pill-shaped |
| `PreferenceTag` | ✅ Built (first-pass design — see note) | Preferences screen | A single saved preference as a removable tag |
| `PreferencesPanel` | ✅ Built (first-pass design — see note) | Preferences screen | Categorized list/editor for saved preferences |
| `ShoppingListItem` | ✅ Built (first-pass design — see note) | Shopping list screen | A product already added to the list, with a remove action |
| `CompareCard` | ✅ Built (first-pass design — see note) | Compare view | Condensed `ProductCard` with a `highlights` list for side-by-side comparison |
| `AssistantProductCard` | ✅ Built | AI assistant surface (chat/UI TBD) | Photo-left/editorial layout (Variant B) + Grove badge/save-icon/pill treatment |
| `LandingPage` | **Not built — direction picked** | Pre-app marketing page | Editorial direction chosen from 4 options; see `docs/design.md` §8 and `docs/design/landing-page-variants.html`. Name/location need confirming with the user before creating the file, per the rule at the top of this doc. |
| Conversational surface (name TBD) | **Scope undefined, not built** | Chat / assistant | See note below |

**Note on page-level components:** this table originally tracked reusable UI primitives; the app has since grown real pages (`LibraryPage`, `ShoppingListPage`, `PreferencesPage`, `ComparePage`, `ProductDetailPage`, plus the nav shell in `App.jsx`) that aren't individually itemized here — see `src/components/` and `src/App.jsx` directly for their current shape. This table hasn't been fully audited against that growth; treat it as reliable for the primitives listed, not as a complete inventory.

**First-pass design note:** `PreferenceTag`, `PreferencesPanel`, `ShoppingListItem`, and `CompareCard` did **not** go through the comparison-exploration process the browse page and `ProductCard` did (no HTML variant artifacts, no retailer research) — they were built directly from the token system and existing patterns (`VerdictBadge`, `IconButton`) on request. Treat their current layout as a reasonable first pass, not a validated decision — revisit each with an actual comparison before treating the layout as final, especially `CompareCard`, whose `highlights` prop is a guess at what a comparison view needs, not something derived from real ingredient/certification data (that data model doesn't exist yet).

**Conversational surface note:** `project-context.md` §6 states the platform is "conversational interface backed by Claude," not a browse-first catalog — users describe what they want and get recommendations with reasoning, rather than filtering a grid. That's a materially different primary surface than the browse page we've been designing, and it hasn't been scoped or interviewed at all yet (no message bubble, composer, or inline-recommendation pattern has been discussed) — but `AssistantProductCard` (below) is a first building block for it: the card that would represent a single recommendation once that surface exists.

---

## Built

### ProductCard

**File:** [src/components/ProductCard.jsx](../src/components/ProductCard.jsx)
**Status:** built, in use on the browse page (`src/App.jsx`), passed `/a11y-check`. Second revision — see history below.

A single saved/researched product: photo (with the verdict badge and a save icon floating on it), brand, name, a clean/caution/avoid verdict pill, an optional note, and an "add to shopping list" action.

**Props**

| Prop | Type | Notes |
|---|---|---|
| `image` | string (URL) | required |
| `imageAlt` | string | required — descriptive alt text, not decorative |
| `brand` | string | required |
| `name` | string | required — product name |
| `verdict` | `'clean' \| 'caution' \| 'avoid'` | required — maps to the ribbon/pill color and label text |
| `note` | string | optional — short reasoning shown under the pill |
| `onAddToList` | function | required — click handler for the CTA |
| `onSave` | function | optional — click handler for the save (♡) icon on the photo |

**Layout — "Grove-style" (revised from the original photo-top card):** photo-top (square) with two elements floating directly on the photo — a verdict ribbon badge (top-left) and a save/wishlist icon button (top-right, `aria-label="Save {name}"`, not icon-only with no label). Below the photo: brand eyebrow, product name as `h2`, a verdict pill restating the same label as the ribbon, note text, then a full-width solid CTA. This pattern (badge-on-photo, not badge-in-text) came from researching Grove Collaborative, Credo Beauty, and EWG Skin Deep's product cards — see `docs/design/retailer-patterns.html`.

**Verdict signal — appears twice, never color alone:** the ribbon on the photo and the pill in the text block both carry the same text label ("Clean" / "Worth a closer look" / "Skip this one"), not just color. Redundant on purpose — the ribbon can be harder to read depending on the photo underneath it, so the pill is the reliable fallback.

**Accessibility notes specific to this component:**
- The product-name heading is an `h2` — it assumes the page it's placed on has exactly one `h1` above it and no other `h2` at the same level competing for that position. If it's ever nested under a page section that already uses `h2`, bump this to `h3` and check the rest of that page's hierarchy.
- The save button is icon-only (♡) — it has an `aria-label` naming the specific product, not a generic "Save" label, so multiple cards on one page remain distinguishable to screen readers.
- The CTA's hover lift (`motion-safe:hover:-translate-y-0.5`) is gated on `prefers-reduced-motion`; don't remove the `motion-safe:` prefix when editing.
- Focus ring is `outline-ink`, not the accent color — see `design-tokens.md` §1 (`color-focus-ring`) for why.

**Revision history:**
1. Photo-top card with an in-text verdict chip (dot + label). Chosen from a 4-variant comparison (`docs/design/product-card-variants.html`, Variant A).
2. **Current.** Badge moved onto the photo, save icon added, chip renamed to "pill" for consistency with the Grove reference. Chosen after a follow-up comparison against real retailer patterns (`docs/design/retailer-patterns.html`, Panel 1 — Grove Collaborative).

---

### AssistantProductCard

**File:** [src/components/AssistantProductCard.jsx](../src/components/AssistantProductCard.jsx)
**Status:** built, passed `/a11y-check`. Not yet mounted anywhere real — the conversational/assistant surface it's for doesn't exist yet (see the inventory table's conversational-surface note).

A product recommendation sized and shaped for a narrower, denser context than the browse grid — a photo-left row instead of a photo-top square. Combines two previously-separate decisions: Variant B's layout from the original 4-variant comparison (`docs/design/product-card-variants.html`), and the Grove badge/save-icon/pill treatment `ProductCard` uses. Built entirely from existing primitives (`Button`, `IconButton`, `VerdictBadge`) — no new visual patterns introduced.

**Props** — identical to `ProductCard`'s: `image`, `imageAlt`, `brand`, `name`, `verdict`, `note?`, `onAddToList`, `onSave?`.

**Layout:** fixed 128×128px photo on the left (not full-width/square like `ProductCard`), with the verdict ribbon and save icon floating on it exactly as `ProductCard` does, just at smaller scale (`IconButton size="sm"`). To the right: brand eyebrow, a larger serif `h2` (`text-2xl` vs. `ProductCard`'s `text-base` — this is Variant B's "bigger, more editorial headline" carried over), verdict pill, note, and a CTA. The CTA is `Button variant="primary"` **without** `fullWidth` — B's original used a text link instead of a button, but "Grove style" per this request means the solid CTA carries over too, not B's original link treatment.

**Accessibility notes:** same pattern as `ProductCard` — `h2` heading (same page-placement assumption applies), save button has a product-specific `aria-label`, focus rings via the shared `Button`/`IconButton` components. Verified via temporary mount + DOM inspection (screenshot tooling hit an intermittent rendering issue this session) — all three test cards rendered correct text, verdict labels, and `aria-label`s.

---

### VerdictBadge

**File:** [src/components/VerdictBadge.jsx](../src/components/VerdictBadge.jsx)

The ribbon+pill visual, extracted out of `ProductCard` so `CompareCard` (and anything else) can't drift out of sync with it. Also exports `VERDICT_STYLES` for anything that needs the raw label/style mapping.

| Prop | Type | Notes |
|---|---|---|
| `verdict` | `'clean' \| 'caution' \| 'avoid'` | required |
| `variant` | `'ribbon' \| 'pill'` | required — `ribbon` = solid fill for on-photo placement, `pill` = tinted background for in-text placement |

Both variants render the same label text for the given verdict — single source of truth, so the two never say different things for the same verdict.

### Button

**File:** [src/components/Button.jsx](../src/components/Button.jsx)

| Prop | Type | Notes |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `primary` = solid honey/accent fill (`bg-accent text-ink`), `secondary` = outlined, `ghost` = underlined text-only. Used in `ProductCard`'s cart CTA, `ProductDetailPage`, `ChatPage`'s send button, and the landing page CTA — `secondary`/`ghost` are implemented but less validated in context |
| `fullWidth` | boolean | default `false` |
| `children` | node | button label |
| `onClick` | function | |
| `type` | `'button' \| 'submit'` | default `'button'` |

Focus ring is always `outline-ink` regardless of variant (see `design-tokens.md` §1, `color-focus-ring`).

### IconButton

**File:** [src/components/IconButton.jsx](../src/components/IconButton.jsx)

| Prop | Type | Notes |
|---|---|---|
| `icon` | node | the icon/symbol to render (currently plain characters — ♡, × — not an icon library) |
| `label` | string | required — becomes `aria-label`; must name the specific item, not just the action |
| `onClick` | function | |
| `variant` | `'default' \| 'onPhoto'` | `onPhoto` = opaque panel background, for use over an image (`ProductCard`'s save icon) |
| `size` | `'md' \| 'sm'` | `md` = 28×28px, `sm` = 24×24px (the WCAG 2.2 minimum target size — don't go smaller) |

### SearchField

**File:** [src/components/SearchField.jsx](../src/components/SearchField.jsx)

| Prop | Type | Notes |
|---|---|---|
| `id` | string | required — links the visually-hidden `<label>` to the input |
| `label` | string | required — visually-hidden label text, not a placeholder-only field |
| `placeholder` | string | optional |
| `value` / `onChange` | string / function | optional — omit for an uncontrolled field (current use in `App.jsx`) |

### PreferenceTag

**File:** [src/components/PreferenceTag.jsx](../src/components/PreferenceTag.jsx)
**Status:** built, first-pass design (see note above the inventory table) — not compared against alternatives.

A single saved preference (an avoided ingredient, a trusted brand, a certification) as a removable pill. Deliberately neutral-toned (`border`/`panel`, not `VerdictBadge`'s colors) since a preference isn't a verdict.

| Prop | Type | Notes |
|---|---|---|
| `label` | string | required |
| `onRemove` | function | optional — omitting it renders the tag without a remove button (read-only) |

### PreferencesPanel

**File:** [src/components/PreferencesPanel.jsx](../src/components/PreferencesPanel.jsx)
**Status:** built, first-pass design.

Renders `PreferenceTag`s grouped by category, each with its own heading and an empty state ("Nothing saved yet.").

| Prop | Type | Notes |
|---|---|---|
| `categories` | `Array<{ label: string, items: Array<{id, label}>, onRemove?: function }>` | required |

**Accessibility note:** category headings are `h3` — assumes it's placed under a page `h1` and a section `h2`; adjust the level if that assumption doesn't hold wherever it's actually mounted.

### ShoppingListItem

**File:** [src/components/ShoppingListItem.jsx](../src/components/ShoppingListItem.jsx)
**Status:** built, first-pass design.

A product already on the shopping list — condensed, horizontal, with `remove` as the primary action instead of `ProductCard`'s `add`.

| Prop | Type | Notes |
|---|---|---|
| `image` / `imageAlt` | string | required |
| `brand` / `name` | string | required |
| `verdict` | `'clean' \| 'caution' \| 'avoid'` | required |
| `onRemove` | function | required |

**Accessibility note:** renders as `<li>` — must be placed inside a `<ul>`/`<ol>`, never used standalone. Product-name heading is `h3` (same assumption as `PreferencesPanel`, above).

### CompareCard

**File:** [src/components/CompareCard.jsx](../src/components/CompareCard.jsx)
**Status:** built, first-pass design — the `highlights` prop in particular is a guess (see note above the inventory table); there's no real ingredient/certification data model yet to know what a comparison actually needs to surface.

| Prop | Type | Notes |
|---|---|---|
| `image` / `imageAlt` | string | required |
| `brand` / `name` | string | required |
| `verdict` | `'clean' \| 'caution' \| 'avoid'` | required |
| `highlights` | `string[]` | optional — short bullet points, meant to show what differentiates this product in a comparison |
| `onAddToList` | function | required |

Uses `Button variant="secondary"` rather than `primary`, so a row of compare cards doesn't visually compete with the primary browse-page CTA.

---

## Explored, not built

These were design explorations shown as HTML comparisons, not components — kept as static references in `docs/design/`, not wired to live tokens (they'll drift if tokens change; treat as historical snapshots of a decision, not source of truth).

### ProductCard — 4 layout variants
**Reference:** `docs/design/product-card-variants.html`

Four directions on the same product/verdict, varying type, hierarchy, photo placement, tag treatment, and CTA weight:
- **A — Photo-top, pill chip, solid CTA.** Chosen first, then superseded (see below).
- **B — Photo-left, larger serif headline, dot+label tag (no chip), text-link CTA.** Not built.
- **C — Compact thumbnail row, sans-serif bold heading, colored border-stripe tag, ghost CTA.** Not chosen.
- **D — Full-bleed photo with scrim overlay, corner badge tag, floating CTA.** Not chosen.

### Retailer pattern reference
**Reference:** `docs/design/retailer-patterns.html`

Four clean/ingredient-conscious retailers' card patterns, rebuilt with Clean Shopper's own tokens (not screenshots): Grove Collaborative, Credo Beauty, Thrive Market (gated, unavailable), EWG Skin Deep. **Grove's pattern (badge + save icon on the photo) was picked** and superseded Variant A above — see `ProductCard`'s revision history.

### Browse page — 3 layout variants (round 1, Card A/B based)
**Reference:** `docs/design/browse-page-variants.html`

Three page-level structures built from card variants A and B: simple grid, editorial list, grouped-by-verdict-with-summary. Superseded by round 2 below once the card itself changed.

### Browse page — 3 layout variants (round 2, Grove-card based)
**Reference:** `docs/design/browse-page-grove-variants.html`

Rebuilt against the Grove-style card:
- **1 — Simple grid.** ✅ Chosen (tentatively — see below). 3-column grid with a search field. **This is what `App.jsx` currently implements.**
- **2 — Dense marketplace.** Filter sidebar (verdict/category checkboxes) + a tighter 4-column grid. Not built.
- **3 — Grouped by verdict, with summary.** Stat strip + verdict-grouped sections. Not built.

Picked "for now" — explicitly flagged for revisit once more of the product is built out and it's clearer whether grouping (Variant 3) or filtering (Variant 2) is actually needed.

---

## Design tokens visual reference

**Reference:** `docs/design/design-tokens-visual.html` — a rendered view of every token in `design-tokens.md` (color swatches, type scale, spacing, radius, elevation). Static snapshot, not live-wired; if tokens change in `src/index.css`, this file does not update automatically.
