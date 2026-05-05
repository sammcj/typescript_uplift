# Typescript Inventory App

This is a TypeScript inventory app used to demo for agentic coding workflows.

## Operations

- `pnpm run lint` to check for linting errors
- `pnpm test` to run tests
- `pnpm run dev` serves the app on http://localhost:3000 with auto-reload. Check it isn't already running before starting it.
- `pnpm run build`, `pnpm test`, `pnpm run lint` are the verification commands.

## Rules

- Don't copy or rename files to `.backup` when upgrading packages or refactoring. Git is the backup
- Never include time estimates in tasks or plans
- Always use Australian English spelling

### Package Management

- Look up the latest stable package versions using available tools (e.g. Context7)
- Use pnpm for package management

### Testing

- If available use the Playwright MCP (or the browser tool) to load the page and check for console errors after any UI-affecting change
- Ensure tests are lightweight, fast and operate without external dependencies
- If linting or testing warnings or errors are present you must fix them unless directed otherwise by the user
