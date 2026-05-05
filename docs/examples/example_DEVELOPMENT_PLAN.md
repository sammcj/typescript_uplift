# TypeScript Application Modernisation & Security Uplift

<!-- Example development plan - "here's one I prepared earlier" for the demo -->

## Overview

This plan addresses critical security vulnerabilities and outdated code patterns in a TypeScript inventory management application. The application currently uses deprecated APIs, lacks type safety, and has XSS vulnerabilities. This uplift will bring the codebase onto current best practices for safety and maintainability whilst keeping all existing functionality.

## Current State

**Problems Identified:**

- Synchronous XMLHttpRequest blocking the main thread (critical security/UX issue)
- No input sanitisation creating XSS vulnerabilities
- TypeScript 4.9.5 with strict mode disabled
- ES5 target (from 2009) instead of modern JavaScript
- All types defined as `any` - no type safety
- Debug console.log statements in production code
- Global state management with no encapsulation
- No structured error handling around async work

**Technical Context:**

- TypeScript 4.9.5 targeting ES5 with CommonJS modules
- Browser-based single-page application
- Synchronous data loading from JSON files

**Project Structure:**

```
src/
├── app.ts              # Main application logic (300+ lines, all global)
├── index.html          # UI markup with inline styles
├── modern-ui.css       # ShadCN-inspired styling
├── __tests__/
│   └── app.test.ts     # Single trivial test
├── data/
│   └── inventory.json  # Product inventory data
└── i18n/
    └── en-US.json      # Translation strings
```

### Commands

```bash
npm run lint
npm test
npm run build
```

Development server - runs in background, accessible via localhost:3000, auto-reloads on changes:

```bash
npm run dev
```

## Definition of Done

1. TypeScript 5.x installed with strict mode enabled (`noImplicitAny`, `strictNullChecks` on); `tsconfig` targets ES2020+
2. All TypeScript compiles with no `any` types, with explicit return and parameter types on every function
3. No synchronous operations block the main thread; all data loading uses async `fetch`
4. Product lookup is not vulnerable to XSS via script tags or HTML entities; user-displayed data uses `textContent`
5. No debug `console.log` statements remain in production code
6. Async failures (network errors, missing products) surface as user-friendly messages, not raw stack traces
7. Global state is encapsulated and data loading lives in a separate module from DOM rendering
8. Build completes with zero errors or warnings; lint passes
9. All existing functionality verified in the browser: product lookup, warehouse stock display, language switching

---

## Development Workflow

1. Operate on tasks from the plan.
2. Before marking a task as complete in the plan:
   1. Ensure linting and tests pass without any warnings or errors (related or unrelated to your changes).
   2. Perform a critical self-review of your changes correcting any issues found.
   3. If you cannot verify your work, prompt the user to perform manual verification before proceeding.
3. Mark the task as complete.
4. Move to the next task.

---

## Development Plan

### Phase 1: Critical Security & Async Modernisation

**Goal:** Remove the blocking synchronous XHR, close the XSS hole, and bring TypeScript onto a modern target so subsequent work has solid ground to stand on.

- [ ] Upgrade TypeScript to latest 5.x and update `tsconfig.json` (target ES2020, enable `strict`)
- [ ] Replace synchronous `XMLHttpRequest` with async `fetch`:
  - [ ] Convert `loadTranslations()` to async
  - [ ] Convert `loadInventoryData()` to async
  - [ ] Update `window.onload` to handle async initialisation and surface a loading state
- [ ] Sanitise product lookup input and replace `innerHTML` with `textContent` wherever user data is displayed
- [ ] Remove all debug `console.log` statements from production code
- [ ] Run lint and build, then exercise the app in the browser to confirm product lookup, warehouse stock display, and language switching all still work
- [ ] Perform a critical self-review of your changes and fix any issues found
- [ ] STOP and wait for human review

### Phase 2: Type Safety & Architecture

**Goal:** Replace `any` with proper interfaces, encapsulate global state, and add structured error handling so the app fails gracefully.

- [ ] Define interfaces for `InventoryItem`, `WarehouseStock`, `Translations`, and key DOM element references
- [ ] Replace all `any` types with the new interfaces and add explicit return and parameter types to every function
- [ ] Enable `noImplicitAny` and `strictNullChecks` and resolve all resulting errors
- [ ] Extract global state (`currentLanguage`, `translations`, `inventoryData`) into a small `AppState` module
- [ ] Split data loading into a data service module and DOM rendering into a view module
- [ ] Wrap async work in try/catch and surface user-friendly error messages for network failures and missing products
- [ ] Verify the build, lint, and the existing test suite all pass
- [ ] Perform a critical self-review of your changes and fix any issues found
- [ ] STOP and wait for human review
