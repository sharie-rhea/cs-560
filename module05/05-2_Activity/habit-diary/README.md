# Habit Diary

## Overview

This is a full-stack web application for tracking personal habits and activities. Users can log journal entries with activity types (Social, Education, Career, Physical) and filter/view their entries in a data table.

## Viewing This README

This file is written in Markdown. To view it with proper formatting in VS Code:

1. Open this file in VS Code
2. Open the Command Palette:
   - **Mac**: `Cmd + Shift + P`
   - **Windows/Linux**: `Ctrl + Shift + P`
3. Type `Markdown: Open Preview` and press Enter

Alternatively, click the preview icon (split rectangle with magnifying glass) in the top-right corner of the editor.

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+)
- npm (comes with Node.js)

### Installation

1. Open a terminal in this project folder

2. Run the setup command to install dependencies and initialize the database:

```bash
make setup
```

Or manually:

```bash
cd backend
npm install
npm run migrate

cd ../frontend
npm install
```

3. Install Playwright browsers (first time only):

```bash
cd frontend
npx playwright install
sudo npx playwright install-deps
```

4. To clean up all generated files (node_modules, dist, database):

```bash
make clean
```

### Running the Application

You need to run both the backend and frontend servers.

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Then open your browser to http://localhost:5173

## Running E2E Tests

The E2E tests automatically start their own frontend and backend servers on separate ports (4173 and 3001), so they won't conflict with your dev servers. You can run tests without stopping anything:

```bash
cd frontend
npm run test:e2e
```

To run tests with the interactive Playwright UI:

```bash
npm run test:e2e:ui
```

## Your Assignment

Your task is to complete the E2E tests for the Habit Diary application.

### Where to Find the TODOs

There are two files with TODO comments:

1. **`frontend/e2e/journal.spec.ts`** - The test file with incomplete tests
2. **`frontend/e2e/components/entry-form.component.ts`** - A page object component with a method to implement

### Tasks

#### Task 1: Complete the Filter Test

In `journal.spec.ts`, find the test `'should filter entries by activity type'`. The setup code that adds 3 entries is already provided. You need to:

- Filter the entries by "Career" activity type
- Verify that only the Career entry is visible
- Verify that the other entries are NOT visible

#### Task 2: Implement the Validation Test

In `journal.spec.ts`, find the test `'should show validation error when submitting with empty description'`. You need to implement this test from scratch following the hints in the comments.

#### Task 3: Implement the getValidationError Method

In `entry-form.component.ts`, find the `getValidationError()` method. You need to implement this method to return a Playwright Locator that finds validation error messages.

### Testing Your Solution

1. Run `npm run test:e2e` from the frontend directory
2. All 3 tests should pass when your implementation is correct

### Hints

- Study the **first test** (`'should add a new journal entry'`) - it's fully implemented as an example
- Use `await expect(...).toBeVisible()` to verify an element is visible
- Use `await expect(...).not.toBeVisible()` to verify an element is NOT visible
- The `filterByActivityType()` method is already implemented in `entry-list.component.ts`
- For the validation error locator, consider using `this.root.getByText(message)`

## Documentation Links

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Vuetify Components](https://vuetifyjs.com/en/components/all/)
