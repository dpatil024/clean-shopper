# Design Tokens — Clean Shopper

Design system foundation, inspired by [seed.com](https://seed.com). Values below were pulled from seed.com's live computed styles (colors, type scale, radii, shadows), then adapted to Clean Shopper's own palette and content.

**Status: implemented.** Tailwind is installed and these tokens are wired into `src/index.css` via Tailwind v4's `@theme`. One naming change happened at implementation time: `color-base` below is `--color-cream` / `bg-cream` / `text-cream` in code, because `base` collides with Tailwind's built-in `text-base` font-size utility. Everything else maps 1:1 — see [src/index.css](../src/index.css).

Seed's design language: a calm, editorial, "clinical-but-warm" aesthetic — deep forest green as the dominant ink/brand color, a cream (not pure white) base, a single high-contrast lime accent used sparingly, fully-pill buttons, soft 16px card radii, and a light, tightly-tracked sans-serif type system. Clean Shopper adapts this into a palette suited to ingredient/safety signaling (clean / caution / avoid) rather than a single-brand color story.

**Tone note:** Clean Shopper's core moment — checking whether a product is safe — can feel anxious if the UI amplifies it (hard reds, tight tracking, high-contrast alerts). The system is deliberately tuned warmer and calmer than Seed's own: softer neutrals, a terracotta rather than red "avoid" state, looser tracking, and slower motion, so a caution or avoid result reads as reassuring guidance rather than an alarm.

---

## 1. Color

### 1.1 Seed reference palette (as observed on seed.com)

| Token | Value | Usage on seed.com |
|---|---|---|
| `seed-forest` | `#1C3A13` | primary text, primary button bg, dark section bg |
| `seed-cream` | `#FCFCF7` | button text on dark bg, light base |
| `seed-bone` | `#EFEFEA` | secondary/card background |
| `seed-lime` | `#D3FA99` | single accent — promo banner, highlight chips |
| `seed-sage` | `#698E79` | muted secondary green |
| `seed-olive` | `#9F995B` | muted secondary gold/olive |
| `seed-moss` | `#36542D` | darker green variant (gradients/depth) |
| `seed-slate` | `#575E55` (35% opacity typical) | overlays, scrims |

### 1.2 Clean Shopper palette (adapted, warm/reassuring)

Clean Shopper needs the calm editorial base Seed uses, plus a clear 3-state signal system for ingredient safety (clean / use caution / avoid) that Seed doesn't need. The base is warmed further than a literal Seed adaptation — a buttery cream over Seed's cooler off-white, a honey accent over Seed's lime, and a soft moss ink over Seed's punchier forest — and the verdict states are tuned so "avoid" reads as gentle concern (clay/terracotta) rather than a hard stop (red).

| Token | Value | Role |
|---|---|---|
| `color-ink` | `#2E3B26` | primary text, headings, primary button bg — softer moss, less corporate than Seed's forest |
| `color-ink-soft` | `#5B6650` | secondary ink — card note text, category filter chip labels; lighter than `color-ink` but still darker/more legible than `color-muted` |
| `color-base` (code: `color-cream`) | `#FBF6EC` | page background — warm, buttery cream. Renamed to `cream` in `src/index.css` to avoid colliding with Tailwind's built-in `text-base` font-size utility |
| `color-surface` | `#F3EDE0` | card / secondary surface background — warm oat |
| `color-panel` | `#FFFDF8` | raised panel background — product cards, icon buttons on photo, search field; near-white, lighter than `color-surface` |
| `color-border` | `#E4DBC8` | hairline borders — warm sand |
| `color-border-strong` | `#D3C6A9` | heavier borders — category filter chips, search field (`border-width-input`), secondary button outline |
| `color-accent` | `#E8B34A` | single accent — honey/amber, used for badges and highlights (not focus rings — see §7 a11y notes; not button fills — primary buttons are `color-ink`, see §"Component notes" below) |
| `color-muted` | `#6E6448` | secondary text, captions, labels — warm taupe, darkened from an earlier `#8B8064` draft to clear 4.5:1 at small sizes |
| `color-overlay` | `rgba(90, 82, 62, 0.32)` | scrims over imagery |
| `color-clean` | `#52713F` | "clean" ingredient verdict — soft sage, calm rather than saturated |
| `color-clean-bg` | `#EEF2E4` | clean verdict background/chip |
| `color-caution` | `#7E5720` | "use caution" verdict — warm toast/ochre, darkened from an earlier `#93672A` draft to clear 4.5:1 as chip text |
| `color-caution-bg` | `#F7EEDC` | caution verdict background/chip |
| `color-avoid` | `#8F452F` | "avoid" verdict — clay/terracotta, darkened from an earlier `#A6543D` draft to clear 4.5:1 as chip text |
| `color-avoid-bg` | `#F5E7DF` | avoid verdict background/chip |
| `color-focus-ring` | `color-ink` | focus indicator — not `color-accent`; the honey accent only reaches 1.78:1 against the cream base, well under the 3:1 minimum for focus indicators. `color-ink` clears 11:1 (light) / 14.76:1 (dark) in both themes |

Dark-mode values are not yet defined — CLAUDE.md does not currently require dark mode support; revisit if that changes.

**Accessibility pass (WCAG 2.1 AA, computed via `/a11y-check`):** the values above already reflect three fixes made after an initial contrast audit — `color-muted`, `color-caution`, and `color-avoid` were each darkened by 10–15% (same hue, more weight) after failing 4.5:1 at the sizes they're actually used at (11–13.5px), and the focus ring token was moved off `color-accent` entirely rather than darkened, since darkening it enough to hit 3:1 would have dulled the one bright color in the system. All three verdict text/background pairs now clear 4.5:1 (`clean` 6.1:1, `caution` 5.57:1, `avoid` 5.68:1) and `color-muted` clears 5.44:1 on `color-base`.

---

## 2. Typography

Seed uses a single custom typeface family, **"Seed Sans"**, at light-leaning weights with tight, size-dependent negative letter-spacing (tracking tightens as size increases) — efficient, but closer to clinical than warm. Clean Shopper pairs a warm serif for headings with a humanist sans for body copy, and loosens the tracking Seed uses, so the page reads unhurried rather than scanned.

| Token | Value |
|---|---|
| `font-family-display` | `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif` — warm serif, headings only |
| `font-family-base` | `"Inter", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif` — body, UI text |
| `font-family-mono` | `ui-monospace, "SF Mono", Consolas, monospace` (for ingredient/data callouts) |

### Weight scale
| Token | Value | Usage |
|---|---|---|
| `font-weight-light` | `350` | body copy |
| `font-weight-regular` | `400` | default UI text, serif headings |
| `font-weight-medium` | `500` | emphasized links, labels |

### Type scale (size / line-height / letter-spacing)
Tracking is loosened from Seed's tight negative values, and line-height opened up, to slow the read down rather than compress it.

| Token | Family | Size | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|
| `text-display` | display (serif) | 48px | 130% | normal | hero headline |
| `text-h1` | display (serif) | 40px | 130% | normal | section heading |
| `text-h2` | display (serif) | 32px | 130% | normal | section heading |
| `text-h3` | base (sans) | 24px | 130% | -0.1px | card/subsection heading |
| `text-h4` | base (sans) | 20px | 130% | -0.1px | small heading |
| `text-body` | base (sans) | 16px | 165% | normal | paragraph text |
| `text-label` | base (sans) | 14px | 150% | normal | buttons, nav |
| `text-caption` | base (sans) | 12px | 150% | 0.02em | captions, meta |

Two deliberate departures from the Seed reference: headings move to a serif (warmth, editorial calm) and tracking goes to `normal` or looser everywhere instead of Seed's tight negative values (tight tracking reads fast/urgent; loose reads unhurried).

---

## 3. Spacing

Seed's layout doesn't expose a single documented spacing unit, but observed padding/margins consistently land on an 8px rhythm. Adopt an 8px base scale:

| Token | Value |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |

Primary button padding observed on seed.com: `16px 24px` (`space-4` `space-6`).

---

## 4. Radius

Seed leans heavily on two radii: fully-rounded pills for anything interactive, and a soft 16px for cards/containers.

| Token | Value | Usage (per Seed, 35 & 19 occurrences respectively — the two dominant values) |
|---|---|---|
| `radius-pill` | 1000px (fully rounded) | buttons, badges, chips |
| `radius-card` | 16px | cards, product tiles, modals |
| `radius-md` | 8px | inputs, small containers |
| `radius-lg` | 32px | large hero containers/images |
| `radius-full` | 50% | avatars, icon dots |
| `radius-sm` | 4px | tags, tight elements |

Only `radius-card` and `radius-pill` are custom `@theme` values in code — `radius-md`, `radius-lg`, `radius-full`, `radius-sm` are close enough to Tailwind's built-in `rounded-md`/`rounded-lg`/`rounded-full`/`rounded-sm` that they weren't worth overriding.

---

## 5. Elevation (shadow)

Seed uses shadow sparingly — flat by default, soft shadow only on floating/overlay elements. Values below are warm-toned (`rgba(46,34,18,...)`, a dark brown rather than neutral black) to match the warm/reassuring pass — a cool black shadow read as clinical against the cream base.

| Token | Value | Usage |
|---|---|---|
| `shadow-none` | `none` | default state for cards, buttons |
| `shadow-card` (code: `shadow-card`) | `0px 6px 16px 0px rgba(46,34,18,0.12)` | raised cards, hover state |
| `shadow-modal` | `0px 8px 28px 0px rgba(46,34,18,0.16)` | modals, popovers, floating promo chips |

---

## 6. Borders

| Token | Value | Usage |
|---|---|---|
| `border-width-hairline` | 1px | card/section dividers |
| `border-width-input` | 2px | form inputs (observed: `2px solid` on Seed's email input) |
| `border-color-default` | `color-border` (`#E4DBC8`) | default hairline |
| `border-color-focus` | `color-focus-ring` / `color-ink` | focused input border — see §7 for why this isn't the accent color |

---

## 8. Motion

Not part of Seed's observed styles, but necessary to keep the "unhurried" quality once things move. Default to slow, soft easing; nothing should feel like it's flagging an alert.

| Token | Value | Usage |
|---|---|---|
| `motion-duration-default` | 400ms | most transitions (hover, focus, reveal) |
| `motion-duration-slow` | 700ms | page-load reveals, verdict state changes |
| `motion-easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | standard ease |
| `motion-easing-gentle` | `cubic-bezier(0.2, 0, 0, 1)` | slow reveals — soft start, soft stop, no snap |

Respect `prefers-reduced-motion` throughout.

---

## 9. Open items

- No dark-mode palette defined yet in code — the visual explorations in `docs/design/` sketch one (`prefers-color-scheme` + `data-theme` overrides) but `src/index.css` only defines the light values. Add if/when dark mode becomes a requirement.
- `font-family-display` and `font-family-base` are system-stack stand-ins; swap for licensed or self-hosted variable fonts (a warm serif + humanist sans) when chosen.
- Motion tokens (§8) are documented but not yet wired into Tailwind's `@theme` — `ProductCard.jsx` uses Tailwind's default `duration-300`/`ease-out` rather than the `400ms`/`cubic-bezier(0.2,0,0,1)` values specified above. Reconcile when more components need consistent motion.
- **The type scale (§2) is now wired into Tailwind's `@theme`** (`--text-display`/`h1`/`h2`/`h3`/`h4`/`body`/`label`/`caption`, each with matching line-height/letter-spacing) — fixed 2026-08-15 after a design-system audit found headings were rendering at Tailwind's stock sizes instead (e.g. page `<h1>`s at `text-4xl`/36px vs. the spec'd `text-h1`/40px). Page-level `<h1>`s (`LibraryPage`, `ShoppingListPage`, `PreferencesPage`, `ComparePage`, `ChatPage`) were switched from `text-4xl` to `text-h1`. Not yet fully reconciled: `ProductDetailPage`'s `<h1>` (`text-3xl`), `AssistantProductCard`/`LandingPage`'s `<h2>`s (`text-2xl`/`text-xl`), and most `text-xs`/`text-sm` body/label/caption usages across components still use Tailwind's stock scale rather than the new `text-body`/`text-label`/`text-caption` tokens — audit and migrate opportunistically as those components are touched.

### Component notes

- `Button`'s `primary` variant (`src/components/Button.jsx`) uses `bg-accent text-ink` at `rounded-pill`. A 2026-08-15 audit flagged this against §1's `color-accent` usage note (badges/highlights, not button fills) and against `component-spec.md`'s "solid ink fill" description of `primary`, and briefly changed it to `bg-ink text-cream`. Reverted the same day at the user's request — the honey/accent fill is the intended look for primary CTAs (Add to cart, Add to shopping list, chat send, landing page CTA), so treat `component-spec.md`'s "solid ink fill" line and §1's accent-usage note as the stale ones; `Button.jsx` is the source of truth here. The pill radius fix (`rounded-md` → `rounded-pill`) was not reverted and still stands.

## 10. Where this lives in code

- Tokens: [src/index.css](../src/index.css) (`@theme` block)
- Build config: [vite.config.js](../vite.config.js) (`@tailwindcss/vite` plugin)
- First component built from these tokens: [src/components/ProductCard.jsx](../src/components/ProductCard.jsx) — see [component-spec.md](component-spec.md)
- Visual references (not wired to live tokens — static snapshots, may drift): `docs/design/design-tokens-visual.html`, `docs/design/product-card-variants.html`, `docs/design/browse-page-variants.html`
