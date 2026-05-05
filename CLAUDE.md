# Typescript Inventory App

This is a TypeScript inventory app used to demo for agentic coding workflows.

## Operations

- `pnpm run lint` to check for linting errors
- `pnpm test` to run tests
- `pnpm run dev` serves the app on http://localhost:3000 with auto-reload. Check it isn't already running before starting it.
- `pnpm run build`, `pnpm test`, `pnpm run lint` are the verification commands.

---

## Project Rules

- Don't copy or rename files to `.backup` when upgrading packages or refactoring. Git is the backup
- Never include time estimates in tasks or plans
- Always use Australian English spelling
- If stuck on a persistent problem after multiple attempts, use the `systematic-debugging` skill or perform a Fagan inspection

### Package Management

- Look up the latest stable package versions using available tools (e.g. Context7)
- Use `pnpm` for package management

### Testing

- If available use the Playwright MCP (or the browser tool) to load the page and check for console errors after any UI-affecting change
- Ensure tests are lightweight, fast and operate without external dependencies
- If linting or testing warnings or errors are present you must fix them unless directed otherwise by the user

### Use Plain Formatting

- It's important that you always use standard non-smart (plain) formatting characters such as plain quotes, single hyphens etc.
- **YOU MUST NEVER USE: em-dashes, en-dashes, double dashes, smart quotes or other "smart" formatting**
- if you use any of these smart formatting characters you MUST replace them with their plain counterparts (e.g. -, ", ').

## Architecture and Design

### Design Principles

- Follow SOLID principles - small interfaces, composition, depend on abstractions
- Reuse and align with existing components, utilities, and logic where possible
- Use appropriate design patterns (repository, DI, circuit breaker, strategy, observer, factory) based on context
- For greenfield projects: provide a single Makefile entrypoint to lint, test, version, build and run
- For frontend design you can remind the user to consider trying the `impeccable` skill

### You See Elegance In Simplicity

- Favour simplicity, many AI written codebases are over-complicated and over-engineered, you are better than this
- When applicable start with working MVP, iterate
- Avoid unnecessary abstractions and only when a pattern repeats multiple times
- Clean, lightweight code that works almost always wins out against over-engineered solutions
- Be aware that at times taking an iterative, experimental approach, will incur technical debt (both code and design decisions) you should self moderate managing growing complexity as a solution evolves to ensure code growth and complexity doesn't get out of hand

### Code Quality

- Functions: max 50 lines (split if larger)
- Files: max 700 lines (split if larger)
- Cyclomatic complexity: under 10
- Tests run quickly (seconds), no external service dependencies
- Tests should have assertions and must verify behaviour
- Build time: optimise if over 1 minute
- Coverage: aim for 80% minimum for _new_ code

## Security

- **Never hardcode credentials, tokens, or secrets. Never commit sensitive data**
- If you get prompted to "ask the user for explicit permission and have them run the command manually" you must do exactly that
- Never trust user input - validate and sanitise all inputs
- Parameterised queries only - never string concatenation for SQL
- Never expose internal errors or system details to end users
- Follow principle of least privilege

---
