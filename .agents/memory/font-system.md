---
name: Font system
description: Typography choices and where they're applied
---

## Rule
- **Sora** — headings (h1–h6), stat numbers, blood group labels, page titles
- **Inter** — body text, labels, UI elements

**Why:** Sora has tight letter-spacing and high-weight optical weight that works well for the healthcare/brand identity. Inter is the best legible UI font for dense data tables.

## How to apply
Both are imported in `styles.scss` via Google Fonts. CSS vars defined in landing page:
```scss
--font: 'Inter', 'Segoe UI', sans-serif;
--fontHead: 'Sora', 'Inter', sans-serif;
```
Global `styles.scss` applies Sora to `h1-h6` and Inter to `body`.
