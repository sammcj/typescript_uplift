# TypeScript Uplift Plan

## Overview

This document outlines the plan to enhance code reliability and maintainability by aligning with TypeScript best practices, eliminating the use of `any` types, updating outdated packages, and ensuring the application compiles successfully whilst maintaining functionality.

The goal is to complete the tasks in a phased approach, marking off completed items as you go.

## Current State Analysis

### Critical Issues Identified

1. **TypeScript Configuration Problems**
   - `strict: false` - Disables all strict type checking
   - `noImplicitAny: false` - Allows implicit any types
   - `target: "es5"` - Using outdated ES5 target
   - TypeScript version 4.9.5 is significantly outdated (latest: 5.8.3)

2. **Extensive Use of `any` Types**
   - Global variables declared as `any`: `currentLanguage`, `translations`, `inventoryData`
   - Function parameters using `any`: `item: any`, `whStock: any`
   - DOM element queries cast to `any` without proper type checking
   - XMLHttpRequest responses handled without type safety

3. **Poor Code Practices**
   - Synchronous XMLHttpRequest calls (deprecated and blocking)
   - Direct DOM manipulation without type safety
   - No proper error handling or type guards
   - Global state management without proper typing
   - Potential XSS vulnerabilities with `innerHTML` usage

4. **Outdated Dependencies**
   - TypeScript: 4.9.5 → 5.8.3 (major version behind)
   - ESLint TypeScript plugins: 7.13.0 → 8.34.0
   - Jest: 29.7.0 → 30.0.0
   - Node types: 22.14.1 → 24.0.1

5. **ESLint Configuration Issues**
   - All TypeScript strict rules disabled
   - `@typescript-eslint/no-explicit-any` turned off
   - Missing important linting rules for code quality

---

## Development Plan (Implementation Checklist)

### Dependencies & Configuration
- [ ] Update package.json with latest versions
- [ ] Update tsconfig.json with strict settings
- [ ] Update .eslintrc.json with proper rules
- [ ] Test build process after updates
- [ ] STOP and wait for human review

### Type System
- [ ] Define all interface types
- [ ] Replace all `any` types with proper types
- [ ] Add type guards and null checks
- [ ] Implement proper error types
- [ ] Perform a critical self-review of your changes and fix any issues related to your changes
- [ ] STOP and wait for human review

### Code Refactoring
- [ ] Replace XMLHttpRequest with fetch API
- [ ] Implement async/await patterns
- [ ] Add proper error handling
- [ ] Replace innerHTML with safe alternatives
- [ ] Perform a critical self-review of your changes and fix any issues related to your changes
- [ ] STOP and wait for human review

### Testing
- [ ] Write comprehensive unit tests
- [ ] Add integration tests
- [ ] Achieve minimum 80% test coverage
- [ ] Test all error scenarios
- [ ] Perform a critical self-review of your changes and fix any issues related to your changes
- [ ] STOP and wait for human review

### Quality Assurance
- [ ] Run linting with no errors
- [ ] Ensure TypeScript compilation succeeds
- [ ] Verify all tests pass
- [ ] Test application functionality
- [ ] Performance testing
- [ ] Cross-browser compatibility testing
- [ ] Perform a critical self-review of your changes and fix any issues related to your changes
- [ ] STOP and wait for human review

---

## Uplift Strategy

### Phase 1: Foundation Updates

#### 1.1 Package Updates
- Update all packages to latest stable versions.

#### 1.2 TypeScript Configuration Overhaul
- Enable `strict: true` for comprehensive type checking
- Set `noImplicitAny: true` to catch implicit any usage
- Update `target` to `"ES2020"` for modern JavaScript features
- Add `strictNullChecks`, `strictFunctionTypes`, and other strict options
- Configure proper module resolution and declaration settings

#### 1.3 ESLint Configuration Enhancement
- Re-enable `@typescript-eslint/no-explicit-any` with error level
- Add `@typescript-eslint/no-unsafe-assignment` rule
- Enable `@typescript-eslint/prefer-nullish-coalescing`
- Add `@typescript-eslint/no-non-null-assertion` warnings
- Configure consistent code style rules

### Phase 2: Type System Implementation

#### 2.1 Define Proper Type Interfaces
```typescript
// Inventory types
interface WarehouseStock {
  warehouse: string;
  stock: number;
}

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  warehouseStock: WarehouseStock[];
}

// Translation types
interface TranslationMessages {
  title: string;
  lookupButton: string;
  output: {
    errorInputMissing: string;
    errorNotFound: string;
    successPrefix: string;
    successSuffixName: string;
    successSuffixStock: string;
  };
}

interface Translations {
  inventoryForm: TranslationMessages;
}

// Application state types
interface AppState {
  currentLanguage: string;
  translations: Translations | null;
  inventoryData: InventoryItem[];
}
```

#### 2.2 Replace Global `any` Variables
- Convert `currentLanguage: any` to `currentLanguage: string`
- Replace `translations: any` with proper `Translations | null` type
- Transform `inventoryData: any[]` to `inventoryData: InventoryItem[]`

#### 2.3 Implement Type-Safe DOM Manipulation
- Replace `any` DOM element references with proper HTMLElement types
- Add null checks for DOM queries
- Implement type guards for element validation
- Use proper event handler typing

### Phase 3: Code Quality Improvements

#### 3.1 Replace Synchronous XMLHttpRequest
- Implement modern `fetch()` API with proper error handling
- Add async/await pattern for better readability
- Implement proper loading states and error boundaries
- Add retry logic for failed requests

#### 3.2 Enhance Error Handling
- Replace try/catch blocks with proper error types
- Implement custom error classes for different failure modes
- Add comprehensive logging with structured error information
- Implement graceful degradation for missing data

#### 3.3 Security Improvements
- Replace `innerHTML` usage with safer DOM manipulation
- Implement proper input sanitisation
- Add Content Security Policy considerations
- Use `textContent` where appropriate to prevent XSS

### Phase 4: Testing Enhancement

#### 4.1 Comprehensive Test Suite
- Add unit tests for all core functions
- Implement integration tests for data loading
- Add DOM manipulation tests with proper mocking
- Create tests for error scenarios and edge cases

#### 4.2 Test Infrastructure
- Configure Jest with proper TypeScript support
- Add test coverage reporting and thresholds
- Implement test utilities for common scenarios
- Add performance testing for data operations

---

## Success Criteria

1. **Zero TypeScript Compilation Errors**: All code must compile without errors or warnings
2. **No `any` Types**: Complete elimination of explicit and implicit `any` usage
3. **100% Test Coverage**: All new functionality must have corresponding tests
4. **Linting Compliance**: Code must pass all ESLint rules without warnings
5. **Functional Parity**: Application must maintain all existing functionality
6. **Performance**: No degradation in application performance
7. **Security**: Enhanced security through proper type checking and input validation

## Risk Mitigation

- **Breaking Changes**: Thorough testing at each phase to catch regressions early
- **Type System**: Gradual implementation with fallbacks during transition
- **Dependencies**: Careful version compatibility checking before updates

## Timeline Considerations

**Note:** This plan prioritises security and stability. Each phase includes verification steps to ensure the application continues to function correctly. The phased approach allows for early detection and resolution of issues before they compound. You MUST stop at the end of each phase and ask for human review. Do not deviate from the plan unless required.

---

*This document will be updated as the uplift progresses to reflect actual implementation details and any adjustments to the plan.*
