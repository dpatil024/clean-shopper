# Moon Design System — Extracted Reference

Values extracted directly from the [Moon Design System v1 (Community)](https://www.figma.com/design/7isXJ0ACoowbHDGaYoDqPE/Moon-Design-System-v1--Community---Copy-?node-id=73-2) Figma file via its Styles pages (Colors, Type, Shadow, Grids). This is **reference-only** — it does not replace or modify Clean Shopper's actual design tokens in [design-tokens.md](design-tokens.md). Names in `Main/...` and `Supportive/...` are Moon's own internal variable names (character-themed, not semantic) — kept as-is here for traceability back to the source file.

---

## 1. Color

### 1.1 Main palette

| Moon variable | Value | Likely role |
|---|---|---|
| `Main/goten` | `#ffffff` | white |
| `Main/gohan` | `#ffffff` | white (surface) |
| `Main/goku` | `#f5f5f5` | light gray surface |
| `Main/beerus` | `#e2e2e2` | border / divider |
| `Main/trunks` | `#595d62` | secondary text |
| `Main/bulma` | `#000000` | black |
| `Main/popo` | `#000000` | black |
| `Main/piccolo` | `#4e46b4` | primary/brand purple |
| `Main/hit` | `#40a69f` | teal accent |
| `Main/zeno` | `#0000008f` | overlay/scrim (56% black) |
| `Main/jiren` | `#4e46b41f` | primary tint (12% piccolo) |
| `Main/heles` | `#0000000a` | hairline tint (4% black) |

### 1.2 Supportive (semantic/status) palette

Each has a base, `-60` (56% opacity), and `-10` (12% opacity) tint variant — used for solid / medium / subtle-background treatments.

| Moon variable | Base | Likely role |
|---|---|---|
| `Supportive/chichi` | `#ff4e64` | error / danger (red) |
| `Supportive/roshi` | `#2e7d32` | success (green) |
| `Supportive/dodoria` | `#d33030` | error variant (deep red) |
| `Supportive/cell` | `#95f1d5` | success/mint accent |
| `Supportive/raditz` | `#b3804a` | warning (brown/amber) |
| `Supportive/whis` | `#3448f0` | info (blue) |
| `Supportive/frieza` | `#5c33cf` | secondary purple |
| `Supportive/nappa` | `#725550` | neutral brown |
| `Supportive/krillin` | `#ffb319` | warning/amber |

Each ships `-60` and `-10` opacity variants, e.g. `chichi-60: #ff4e648f`, `chichi-10: #ff4e641f`.

---

## 2. Typography

Single family throughout: **DM Sans** (one `text-2xs` variant uses "Averta Std" — likely a legacy/inconsistent style).

### UI Type scale (tighter line-height, used for interface text)

| Token | Size | Line-height | Letter-spacing | Weights available |
|---|---|---|---|---|
| `text-3xs` | 9px | 16px | 0 / 1 (upper) | Regular, Bold |
| `text-2xs` | 10px | 16px | 0 / 0.5 (upper) | Regular, Bold |
| `text-xs` | 12px | 16px | 0 | Regular, Bold |
| `text-sm` | 14px | 24px | 0 | Regular, Bold |
| `text-md` | 16px | 24px | 0 | Regular, Bold |
| `text-lg` | 18px | 28px | 0 | Regular, Bold |
| `text-xl` | 20px | 32px | 0 | Regular, Bold |
| `text-2xl` | 24px | 32px | 0 | Regular, Bold |
| `text-3xl` | 32px | 40px | -0.5 | Regular, Bold |
| `text-4xl` | 40px | 48px | -0.5 | Regular, Bold |
| `text-5xl` | 48px | 56px | -1 | Regular, Bold |
| `text-6xl` | 56px | 64px | -1.5 | Regular, Bold |
| `text-7xl` | 64px | 72px | -2 | Regular, Bold |
| `text-8xl` | 72px | 76px | -2.5 | Regular, Bold |

### Paragraph scale (looser line-height, used for body copy)

| Token | Size | Line-height | Weights available |
|---|---|---|---|
| `text-xs` | 12px | 16px | Regular, Medium ([S]) |
| `text-sm` | 14px | 20px | Regular, Bold, Medium |
| `text-md` | 16px | 24px | Regular, Bold |
| `text-lg` | 18px | 28px | Regular, Medium |
| `text-xl` | 20px | 28px | Regular, Bold |

Tracking tightens as size increases (0 up to `text-2xl`, then increasingly negative from `-0.5` at 32px to `-2.5` at 72px) — a much more aggressive tightening curve than Clean Shopper's own type scale, which deliberately stays at `normal`/loose tracking throughout.

---

## 3. Shadow / Elevation

Two theme variants (Light/Dark), each with 4 steps. Each step layers two drop shadows: a 1px "hairline" shadow plus a larger soft blur.

| Token (Light) | Value |
|---|---|
| `shadow-sm` | `0 0 1px #00000066, 0 6px 6px -6px #00000029` |
| `shadow-md` | `0 0 1px #00000066, 0 12px 12px -6px #00000029` |
| `shadow-lg` | `0 0 1px #00000066, 0 8px 24px -6px #00000029` |
| `shadow-xl` | `0 0 1px #00000033, 0 32px 32px -8px #0000001F, 0 32px 32px -8px #00000014` |

| Token (Dark) | Value |
|---|---|
| `shadow-sm` | `0 0 1px #0000008F, 0 6px 6px -6px #000000A3` |
| `shadow-md` | `0 0 1px #0000008F, 0 12px 12px -6px #000000A3` |
| `shadow-lg` | `0 0 1px #0000008F, 0 24px 24px -6px #000000A3` |
| `shadow-xl` | `0 0 1px #000000B8, 0 48px 48px -6px #000000E0` |

Notably more layered/soft than Clean Shopper's current 2-step shadow system.

---

## 4. Radius

Only one explicit radius variable surfaced from the Styles pages:

| Token | Value |
|---|---|
| `--radius-s-md` | 12px |

Moon's full radius scale likely has more steps (e.g. xs/sm/md/lg/full) defined elsewhere in the file (possibly on component nodes rather than the Styles/Colors page) — this extraction only surfaced what appeared on the Colors/Type/Shadow style pages themselves.

---

## 5. Notes / Gaps

- **Grids page** (`30452:25873`) returned only color/type variables already seen elsewhere — no distinct spacing/grid scale surfaced. Moon's spacing scale wasn't exposed as Figma variables on this page; it may be encoded as raw layout values on component frames instead.
- **Icons page** and component pages (Button, Chip, Alert, etc.) weren't extracted — this pass covered Styles-level tokens only (Colors, Type, Shadow).
- Moon's variable names are non-semantic (Dragon Ball Z character names) — any adoption into Clean Shopper should remap to semantic names, not reuse these directly.
- Comparison to Clean Shopper's current system: Moon is a general-purpose, cooler, purple/teal-branded UI kit with tight-tracking type and dense multi-layer shadows — a fairly different design language from Clean Shopper's warm, editorial, serif+sans, loose-tracking system in [design-tokens.md](design-tokens.md). Nothing here is applied to that file; treat this purely as a reference point if specific pieces (e.g. shadow layering technique, radius token naming) are worth borrowing later.
