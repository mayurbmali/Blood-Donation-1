---
name: Theme toggle
description: ThemeService + ThemeToggleComponent wiring
---

## ThemeService
Location: `frontend/src/app/core/services/theme.service.ts`
- Reads localStorage key `app-theme` on init; falls back to `prefers-color-scheme`
- `toggleTheme()`, `isDark()`, `setTheme()` — applies via `document.documentElement.setAttribute('data-theme', ...)`
- `providedIn: 'root'` — inject anywhere

## ThemeToggleComponent
Location: `frontend/src/app/shared/theme-toggle.component.*`
- Standalone component, imports `MatIconModule`
- Shows `light_mode` / `dark_mode` Material icon, calls `themeService.toggleTheme()` on click
- Used in: `navbar.component.html` (both desktop and mobile), `landing-page.component.html` (inline nav)

**How to apply:** Import `ThemeToggleComponent` in any standalone component's `imports[]`, then add `<app-theme-toggle>` to the template.
