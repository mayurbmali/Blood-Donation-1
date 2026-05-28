---
name: Dark mode architecture
description: How dark mode is implemented across the Angular app
---

## The Rule
`ThemeService` sets `data-theme="dark"` on `document.documentElement`. Global CSS vars are overridden inside `[data-theme="dark"]` in `_tokens.scss`.

**Why:** Angular Material uses global styles; attaching to `<html>` means all CSS vars cascade everywhere without needing component-level wiring.

## Landing Page Exception
The landing page has its own `:host` scoped CSS vars (`--dark`, `--bg`, `--card`, etc.) that shadow global vars. These must be overridden with:
```scss
:host-context([data-theme="dark"]) {
  --dark: #F1F5F9;
  --bg: #0F172A;
  ...
  .ll-specific-element { background: ... }
}
```

**Why:** `:host` vars are scoped to the component and don't inherit from `[data-theme="dark"]` on `<html>` automatically.

## Inner Pages (dashboard, donors, inventory, etc.)
All inner page SCSSes use the global `var(--bg)`, `var(--border)`, `var(--text)` etc. from `_utilities.scss` and `_tokens.scss`. They get dark mode automatically via the `[data-theme="dark"]` override block — no per-component dark styles needed.

**How to apply:** Only add `:host-context()` blocks in components that define their own `:host` CSS custom properties.
