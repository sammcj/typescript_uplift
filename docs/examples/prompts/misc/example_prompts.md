# Example Uplift Prompts

Here are some example prompts you could give to an AI coding agent to improve the quality of the `typescript_uplift` demonstration application.

---

## Update Outdated Dependencies

**Prompt:**

We need to audit and update our project dependencies to their latest stable versions for security and stability improvements.

The tasks required are as follows:

1. First, check for outdated packages and identify any security vulnerabilities.
2. Then create a concise upgrade plan in ./DEPENDENCY_UPGRADE_PLAN.md that prioritises security fixes and major version updates.
3. After the migration we need to verify the layout and styling remain consistent.

Note:

- Use available tools to research the latest versions.
- The plan should contain checklist of tasks to complete.
- The plan should not contain any unrelated work outside the scope of updating packages and ensuring the application works there after.

Review the code and dependencies, get the latest package versions, write the plan - then stop for me to review.

Once I approve the plan we will execute the upgrades while ensuring compatibility.

---

## Add inventory product images

**Prompt:**

We want to enhance the user experience by adding product images for the items in our inventory.

Product images (800x800) are stored in this projects ./inventory/images directory and are named <SKU>.jpg, e.g. SKU-123.jpg
If we have an item in our inventory without a matching image we should use placeholder.jpg located in the same directory.

When you've added the functionality, use your browser tool to verify that the images are displayed correctly.

---

## Improve Typescript

**Prompt:**

I want to enhance code reliability and maintainability in my project by better aligning to Typescript best practices, e.g. leveraging TypeScript's type system, stop using the `any` type and any other bad practices.

We should also check if we're running any out of date packages and update them.

Then we need to make the code compiles successfully and that the application functions as before after the changes.

Can you start by creating a new markdown document in `docs/TYPESCRIPT_UPLIFT.md` that outlines the changes you will make to improve the typescript?

*Follow up prompt:*

Read the docs/TYPESCRIPT_UPLIFT.md file to understand the task. Then proceed to implement the changes ensuring all requirements are met.

---

## Add Meaningful Unit Tests

**Prompt:**

Write unit tests for the functions in `src/app.ts` using the existing Jest setup. We want to ensure test coverage is at least 90%.
For example we probably want tests covering scenarios where:

- A valid SKU is entered, and stock is found.
- An invalid/non-existent SKU is entered.
- The input field is empty.
- Mock the global `inventoryData` and `translations` variables as needed for these tests.

Then we'd need to ensure `npm test` passes after adding the new tests.
Can you start by creating a new markdown document in `docs/unit-tests.md` that outlines the tests you will add and the expected outcomes?

*Follow up prompt:*
Read the docs/unit-tests.md file to understand the task. Then proceed to implement the tests ensuring all requirements are met.

---

## Modernise Asynchronous Operations

**Prompt:**

I'm worried our old code base in this project is far too synchronous especially in the functions within `app.ts`.
Can you please outline some recommended changes to improve the asynchronous operations in the codebase and some tests to ensure the changes are effective?
Please create a new markdown document in `docs/async-uplift.md` that outlines the changes you will make to improve the async operations and how you will test them.

**Follow up prompt:**
Read the docs/async-uplift.md file to understand the task. Then proceed to implement the changes ensuring all requirements are met.

---

## Refactor CSS

**Prompt:**

I want to refactor the CSS in this project to improve maintainability and align with modern CSS practices.
Please carefully review the existing CSS code and identify areas for improvement.
Create a new markdown document in `docs/css-refactor.md` that outlines the changes you will make to improve the CSS.

**Follow up prompt:**
Read the docs/css-refactor.md file to understand the task. Then proceed to implement the changes ensuring all requirements are met.
