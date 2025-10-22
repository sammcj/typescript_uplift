# TypeScript Uplift - Development Plan

## Project Context

This project is an inventory management application built with TypeScript, serving as a demonstration of common code quality issues. The codebase currently exhibits multiple anti-patterns and uses deprecated APIs that need modernization.

## Current State Assessment

### Technical Debt
- Synchronous XMLHttpRequest (deprecated, will break in future browsers)
- TypeScript strict mode disabled, heavy use of `any` types
- Zero meaningful test coverage
- Global state management without proper patterns
- Excessive debug logging in production code
- Outdated dependencies (TypeScript 4.9.5, ESLint 8.x, Jest 29.x)

### Architecture
- Single-file application (~300 lines) with no modularization
- Direct DOM manipulation without framework
- Manual file copying in build process
- Testing dependencies incorrectly placed in `dependencies` instead of `devDependencies`

## Development Phases

### Phase 1: Critical Fixes & Foundation

**Objective:** Address browser-breaking issues and establish proper TypeScript foundation

- [ ] Replace synchronous XMLHttpRequest with async fetch API in `loadTranslations()` and `loadInventoryData()`
- [ ] Enable TypeScript strict mode in tsconfig.json (`strict: true`, `noImplicitAny: true`)
- [ ] Update TypeScript compilation target from ES5 to ES2020+
- [ ] Remove all `any` types and add proper type definitions for inventory items, warehouse stock, and translation objects
- [ ] Move testing packages from `dependencies` to `devDependencies` in package.json
- [ ] Perform critical self-review of Phase 1 changes, fixing any issues found
- [ ] **STOP and wait for human review**

### Phase 2: State Management & Code Organization

**Objective:** Eliminate global state and modularize codebase

- [ ] Create proper state management structure (avoid globals, use encapsulation)
- [ ] Extract inventory logic into separate module with clear interfaces
- [ ] Extract translation/i18n logic into separate module
- [ ] Extract UI rendering logic into separate module
- [ ] Implement proper initialization flow replacing `window.onload` pattern
- [ ] Perform critical self-review of Phase 2 changes, fixing any issues found
- [ ] **STOP and wait for human review**

### Phase 3: Error Handling & Code Quality

**Objective:** Implement robust error handling and remove technical debt

- [ ] Add comprehensive error handling for fetch operations with user-friendly messages
- [ ] Remove all debug `console.log` statements (15+ occurrences)
- [ ] Implement proper error boundary for image loading failures
- [ ] Add input validation with clear error feedback
- [ ] Optimize build script to use proper tooling instead of manual file copying
- [ ] Perform critical self-review of Phase 3 changes, fixing any issues found
- [ ] **STOP and wait for human review**

### Phase 4: Dependency Updates

**Objective:** Update all outdated packages to latest stable versions

- [ ] Update TypeScript to 5.x
- [ ] Update ESLint to 9.x and @typescript-eslint plugins accordingly
- [ ] Update Jest ecosystem to 30.x (jest, jest-environment-jsdom, @types/jest, @testing-library/jest-dom)
- [ ] Update ts-jest to 29.4.x
- [ ] Update concurrently to 9.2.x
- [ ] Run full test suite after each update to catch breaking changes
- [ ] Perform critical self-review of Phase 4 changes, fixing any issues found
- [ ] **STOP and wait for human review**

### Phase 5: Testing Infrastructure

**Objective:** Establish comprehensive test coverage

- [ ] Remove trivial tautological test and create meaningful test structure
- [ ] Add unit tests for inventory lookup logic (found/not found cases)
- [ ] Add unit tests for translation loading and application
- [ ] Add unit tests for warehouse stock display logic
- [ ] Add integration tests for full user workflows (select item, lookup, display)
- [ ] Achieve minimum 80% code coverage
- [ ] Perform critical self-review of Phase 5 changes, fixing any issues found
- [ ] **STOP and wait for human review**

## Success Criteria

Each phase completion should meet these criteria:
- All TypeScript compilation warnings resolved
- ESLint passes without errors
- All tests passing
- Application runs without console errors
- No degradation in functionality

## Notes

- Each phase builds on the previous, do not skip ahead
- Breaking changes should be documented as they occur
- Maintain backward compatibility with existing data files (inventory.json, translations)
- The application should remain functional after each phase
