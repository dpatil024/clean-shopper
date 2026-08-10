---
name: a11y-check
description: Audits a design system, token set, mockup, or built UI for WCAG 2.1 AA compliance. Use any time colors, type, or components are proposed or changed — new tokens, a new component, a redesign, or a visual artifact — before presenting it as done. Checks color contrast, focus indicators, color-only signaling, form labels, heading structure, and motion.
---

## Accessibility Check

You are auditing a design deliverable (tokens, a mockup, a component, or built markup) against WCAG 2.1 AA. Do not eyeball contrast — compute it. Report exact numbers, then fix what fails.

Run this whenever you produce or change: color tokens, a component, a page/artifact, or a redesign of any of those. Run it before telling the user the work is done, not only when asked.

---

## 1. Color contrast

For every distinct text-color / background-color pair actually used in the deliverable:

1. Convert each hex color to relative luminance using the WCAG formula:
   - Normalize each channel to 0–1.
   - Linearize: `c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`
   - `L = 0.2126*R + 0.7152*G + 0.0722*B`
2. Contrast ratio = `(L_lighter + 0.05) / (L_darker + 0.05)`.
3. Apply the correct threshold:
   - Normal text (under 18px, or under 14px/18.66px bold): **4.5:1**
   - Large text (18px+/24px regular, or 14px+/18.66px bold, i.e. `font-weight >= 700`): **3:1**
   - Non-text UI (borders, icons, focus indicators, chart elements that convey meaning): **3:1**
4. Check every theme the deliverable supports (light and dark both, if both exist) — a pair that passes in one theme can fail in the other.
5. Do not round in the deliverable's favor. 4.49:1 is a fail against a 4.5:1 threshold.

Report each pair as: `foreground on background: X.XX:1 — PASS/FAIL (threshold: Y:1, used at Zpx/weight)`.

## 2. Focus indicators

Every interactive element (button, link, input, custom control) needs a visible focus state. Check:
- Is there a `:focus` or `:focus-visible` style at all? Flag if focus is suppressed (`outline: none` with no replacement).
- Compute the focus indicator's contrast against its adjacent background(s) — needs 3:1 minimum, in every theme it appears in.

## 3. Color-only signaling

Anywhere color communicates state or meaning (status chips, verdicts, charts, form validation, required fields), confirm there's a second channel — icon, text label, pattern, or position — so the information survives grayscale. Flag any status/meaning that is color alone.

## 4. Forms

Every input, select, and textarea needs a programmatic label: a `<label for>`, `aria-label`, or `aria-labelledby`. A `placeholder` alone is not a label — flag it. Check that error and required states are conveyed in text, not color alone (see §3).

## 5. Structure

- Heading levels should not skip (h1 → h3 with no h2), even when a heading is styled small.
- Images need `alt` text (empty `alt=""` only for decorative images).
- Check `prefers-reduced-motion` is respected wherever there's non-trivial animation.

---

## Output

List every failure found, in this form:

```
[FAIL] <element/pair> — <measured value> vs <threshold> — <where it's used>
  Fix: <specific corrected value or change>
```

Then a one-line summary: `N issues found, M fixed` (if you're also applying fixes) or `N issues found` (if only auditing). Do not report items that pass unless the user asked for a full pass/fail inventory — the goal is a punch list, not a certificate.

If nothing fails, say so plainly in one line rather than listing every pass.
