# Development Plan: TypeScript Application Modernisation & Security Uplift

## Overview

This plan of work aims to address outdated code patterns and a stored-XSS vulnerability in a TypeScript inventory management application. The application currently uses deprecated APIs, lacks type safety, and renders untrusted data through `innerHTML`. This uplift will bring the codebase onto current best practices for safety and maintainability whilst keeping all existing functionality.

## Current State

**Problems Identified:**

- Synchronous `XMLHttpRequest` blocking the main thread (deprecated, will eventually break)
- Stored XSS via `innerHTML` interpolating data values (`${item.name}`, `${whStock.warehouse}`, etc.) and inline `onerror` handlers
- Outdated TypeScript packages, with strict mode disabled
- Outdated ES5 target instead of modern JavaScript
- Types defined as `any` = no type safety
- Debug `console.log` statements in production code
- Global state management with no encapsulation
- No structured error handling around async work

Current Technical Context:

- TypeScript 4.9.5 targeting ES5 with CommonJS modules
- Browser-based single-page application
- Synchronous data loading from JSON files

Project Structure:

```
src/
├── app.ts              # Main application logic
├── index.html          # UI markup with inline styles
├── modern-ui.css       # ShadCN-inspired styling
├── __tests__/
│   └── app.test.ts     # Single trivial test
├── data/
│   └── inventory.json  # Product inventory data
└── i18n/
    └── en-US.json      # Translation strings
```

### Operational Commands

- Uses `pnpm` for all package management and scripts (`lint`, `test`, `build`)
- Development server (`pnpm run dev`) runs in background, accessible via localhost:3000, auto-reloads on changes

---

## Out of Scope For This Plan

Keep changes focused. The following are deliberately not in scope:

- Build script refactor (the chain of `cp` commands in `pnpm run build`)
- ESLint 8 -> 9 upgrade
- TypeScript module system change (`commonjs` stays)
- Moving misplaced packages between `dependencies` and `devDependencies`
- Vestigial `tsconfig.json` settings (`jsx: react`, `paths`)

## Definition of Done

1. Latest stable 5.x version of TypeScript 5.x installed
2. Typescript `strict` enabled; `tsconfig` targets ES2020+
3. All TypeScript compiles with no `any` types; explicit return and parameter types on every function
4. No synchronous data loading; (e.g.`loadTranslations` and `loadInventoryData` use async `fetch`)
5. No data values reach the DOM via `innerHTML` interpolation; all dynamic content rendered with `textContent` / `createElement`; no inline `onerror` / `onclick` attributes that interpolate data
6. No debug `console.log` statements remain in production code
7. Async failures (network errors, missing products) surface as user-friendly messages, not raw stack traces or empty UI
8. Global state is encapsulated; data loading lives in a separate module from DOM rendering
9. ESLint passes with no-explicit-any and prefer-const re-enabled
10. Build completes with zero errors or warnings
11. Existing functionality verified operational in the browser: product lookup, warehouse stock display, language switching

## Development Checklist

### Phase 1: Critical Security & Async Modernisation

**Goal:** Remove the blocking synchronous XHR, close the stored-XSS hole, and bring TypeScript onto a modern target so subsequent work has solid ground to stand on.

Do all the code work below before pausing to verify. Save lint, build and browser checks for the end of the phase.

- [ ] Upgrade TypeScript to latest 5.x and update `tsconfig.json` target, enable strict
- [ ] Replace synchronous requests with async (translations, inventory data, window onload and any others):
- [ ] Replace innerHTML interpolation with safe DOM construction wherever data values are rendered. The XSS surface is the data file (`inventory.json`), not the input field - interpolating item name,id,warehouse into innerHTML is the actual vulnerability.
- [ ] Remove all debug console log statements from production code
- [ ] Run lint and build, then exercise the app in the browse to confirm product lookup, warehouse stock display, and language switching all still work
- [ ] Perform a critical self-review of your changes and fix any issues found
- [ ] STOP and wait for human review

### Phase 2: Type Safety & Architecture

**Goal:** Replace `any` with proper interfaces, encapsulate global state, and add structured error handling so the app fails gracefully.

Do all the code work below before pausing to verify.

- [ ] Define interfaces for inventory items, warehouse stock, translations, and key DOM element references
- [ ] Replace all `any` types with the new interfaces and add explicit return and parameter types to every function
- [ ] Enable `noImplicitAny` and `strictNullChecks` and resolve all resulting warnings or errors
- [ ] Extract global state (e.g. `currentLanguage`, `translations`, `inventoryData`) into a small `AppState` module
- [ ] Split data loading into a data service module and DOM rendering into a view module
- [ ] Wrap async work in try/catch and surface user-friendly error messages for network failures and missing products
- [ ] Re-enable `@typescript-eslint/no-explicit-any` and `prefer-const` and resolve any remaining violations
- [ ] Verify the build, lint, and the existing test suite all pass
- [ ] Perform a critical self-review of your changes and fix any issues found
- [ ] STOP and wait for human review

---

## Development Workflow

1. Operate on tasks from the plan
2. Before marking a task as complete in the plan:
   1. Ensure linting and tests pass without any warnings or errors (related or unrelated to your changes)
   2. Perform a critical self-review of your changes correcting any issues found
   3. If you cannot verify your work, prompt the user to perform manual verification before proceeding
3. Once you are certain the task is complete, you MUST update this development plan to mark it as done
4. Move to the next task
