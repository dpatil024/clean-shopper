# Design System — Clean Shopper

Single entry point for "what does the Clean Shopper design system look like and why." This doc is an overview and index — the detailed source of truth for each piece lives in the files it links to. If this doc and a linked file disagree, the linked file wins; update this page to match rather than the other way around.

**Status note:** §3 and §4 below describe an earlier point in the project (still true directionally, stale on specifics — e.g. §3 says "currently one component is built," which is no longer accurate). For the actual current state, treat **[component-spec.md](component-spec.md)**'s inventory table and **`src/`** itself as the source of truth. The app now has six real pages (landing, browse/library, shopping list, cart, preferences, compare) plus a product detail view and an AI assistant chat page, a working Supabase backend (`supabase/`), and is deployed at both GitHub Pages and Vercel. §8 below covers the landing page (built); this note covers everything since.

---

## 1. Direction

Inspired by [seed.com](https://seed.com)'s calm, editorial aesthetic, then deliberately warmed further. The reasoning: Clean Shopper's core moment — checking whether a product is safe — can feel anxious if the interface amplifies it. So the system leans warm and unhurried rather than clinical: a buttery cream base instead of stark white, a terracotta (not red) "avoid" state framed as guidance ("Skip this one") rather than an alarm, loose type tracking instead of tight, and slow, soft motion.

Full reasoning and the seed.com research behind it: **[design-tokens.md](design-tokens.md) §"Tone note"**.

## 2. Tokens

Color, typography, spacing, radius, elevation, borders, and motion — all defined in **[design-tokens.md](design-tokens.md)**, implemented in **[src/index.css](../src/index.css)** via Tailwind v4's `@theme`.

One naming difference to know about: the doc's `color-base` is `color-cream` in code (`bg-cream`, `text-cream`) — it collided with Tailwind's built-in `text-base` font-size utility.

Visual reference (static, not live-wired to the actual tokens — will drift if `src/index.css` changes): **[design/design-tokens-visual.html](design/design-tokens-visual.html)**.

Every color/type pairing here has been run through `/a11y-check` (WCAG 2.1 AA) — see that skill for the method, `design-tokens.md` for the specific fixes made (three colors were darkened, focus rings moved off the accent color).

## 3. Components

Full inventory (built + planned), props, and accessibility notes: **[component-spec.md](component-spec.md)**.

Currently one component is built: **`ProductCard`** ([src/components/ProductCard.jsx](../src/components/ProductCard.jsx)) — photo with a verdict badge and save icon floating on it, brand, name, a verdict pill, an optional note, and an "add to shopping list" CTA. Styled after Grove Collaborative's card pattern (badge-on-photo), picked after comparing it against Credo Beauty, Thrive Market, and EWG Skin Deep's real product-card patterns.

`VerdictBadge`, `Button`, `IconButton`, and `SearchField` are also built — extracted as shared primitives so `ProductCard` doesn't duplicate them. `PreferenceTag`, `PreferencesPanel`, `ShoppingListItem`, and `CompareCard` are built too, but as a first pass with no comparison exploration behind them (unlike `ProductCard`'s two rounds of variant testing) — treat their current layout as provisional. See `component-spec.md`'s "Component inventory" table for status and the "first-pass design" note for what that provisional flag actually means.

**Cart feature (added 2026-08-15):** `ProductCard` and `ProductDetailPage` each pair two actions below the photo — a full-width `Button` "Add to cart" CTA (solid honey/accent fill, the primary purchase-intent action) plus a small icon-only `IconButton` for the shopping list (a bulleted-list glyph that swaps to a checkmark once added), sized and styled like the existing save/heart icon so it reads as a lightweight secondary utility rather than a second CTA. Two pairing options were mocked up before building; this icon-beside-primary-CTA layout was the one picked. `IconButton`'s `icon` prop now accepts an inline SVG node in addition to plain characters (previously ♡/×/✓ only) — still no external icon library, per `component-spec.md`'s constraint. A new `CartPage` (mirrors `ShoppingListItem`/`ShoppingListPage`'s pattern) and a `Cart` nav item with a live count badge were added to `App.jsx` alongside the existing Shopping list — the two are deliberately separate concepts (cart = ready to buy now, shopping list = a running list), tracked as independent state.

## 4. Pages

**Browse page** (`src/App.jsx`): header with a search field, 3-column grid of `ProductCard`. This is "Variant 1 — Simple grid" from the Grove-card page comparison, picked **tentatively** — flagged for revisit once more of the product exists and it's clearer whether Variant 2's filtering or Variant 3's verdict-grouping is actually needed. See `component-spec.md` for the other two variants and why they weren't picked (yet).

**Other pages built since:** Shopping list, Cart (added 2026-08-15, see §3), Preferences, Compare, a product detail view, and an AI assistant chat page all exist in `src/components/` and are wired into `App.jsx`'s nav-tab switcher — see `component-spec.md`'s "page-level components" note and `src/App.jsx`'s `NAV_ITEMS` directly, since this doc doesn't itemize each one.

## 5. How decisions got made

Two rounds of comparison, each shown as a visual artifact before anything was built:

1. **Card layout** — 4 directions compared (`design/product-card-variants.html`) → Variant A (photo-top, chip) picked and built.
2. **Real-world pattern research** — since Mobbin access wasn't available, browsed Grove Collaborative, Credo Beauty, Thrive Market, and EWG Skin Deep directly and rebuilt their card patterns with our own tokens (`design/retailer-patterns.html`) → Grove's badge-on-photo pattern picked, superseding Variant A.
3. **Page layout, twice** — first against Card A/B (`design/browse-page-variants.html`), then rebuilt against the Grove card (`design/browse-page-grove-variants.html`) → Variant 1 (simple grid) picked, tentatively.

Full chronological detail of the first session: **[session-log-2026-08-01.md](session-log-2026-08-01.md)**.

## 6. Open decisions

- Browse page layout (§4) is provisional — Variant 2 (filters) or Variant 3 (verdict grouping) may replace it once there's more real data to browse.
- No dark-mode token values in code yet (the HTML explorations sketch one; `src/index.css` doesn't).
- `font-family-display`/`font-family-base` are system-font stand-ins for a warm serif + humanist sans; no licensed/self-hosted fonts chosen yet.
- **Resolved 2026-08-15:** `Button`'s `primary` fill color was briefly changed from honey/accent to solid ink during a design-system audit (to match `color-accent`'s "not for button fills" usage note), then reverted at the user's explicit request — the honey fill is the intended look for primary CTAs app-wide. See `design-tokens.md` §9 "Component notes" for the full history; `component-spec.md`'s `Button` entry now matches.

## 8. Landing page

A marketing/landing page (before the app itself) — the app previously started straight at the browse page, no auth, single-user. Four directions were compared in **[design/landing-page-variants.html](design/landing-page-variants.html)**, all built from the existing tokens and the Grove-style verdict system (no new visual language introduced):

1. **Calm & classic** — centered hero, direct headline + subhead + two CTAs, three numbered value props.
2. **Editorial** — ✅ **Picked and built.** Asymmetric hero (headline + supporting image side by side), a 3-step "how it works" sequence, and a pull-quote reframing "Worth a closer look" as reassurance rather than a warning. Matches the project's established warm/reassuring tone (see §1) more directly than the other three.
3. **Product-forward** — leads with real-looking product cards instead of describing the product abstractly. Not built.
4. **Trust-led** — leads with the verdict system itself as the pitch. Not built.

**Built** as `src/components/LandingPage.jsx`, implementing the Editorial direction. It sits outside `App.jsx`'s nav-tab page-switching pattern — a `hasEnteredApp` flag gates the whole app, and the landing page's own CTA ("Start browsing →") is what flips it, rather than being a `NAV_ITEMS` entry.

## 9. Where everything lives

| What | Path |
|---|---|
| Tokens (doc) | [design-tokens.md](design-tokens.md) |
| Tokens (code) | [src/index.css](../src/index.css) |
| Components (doc) | [component-spec.md](component-spec.md) |
| Built component | [src/components/ProductCard.jsx](../src/components/ProductCard.jsx) |
| Cart page (added 2026-08-15) | [src/components/CartPage.jsx](../src/components/CartPage.jsx) |
| Built page | [src/App.jsx](../src/App.jsx) |
| Accessibility skill | [.claude/skills/a11y-check/SKILL.md](../.claude/skills/a11y-check/SKILL.md) |
| Visual explorations (static snapshots) | [design/](design/) |
| Session history | [session-log-2026-08-01.md](session-log-2026-08-01.md) |
