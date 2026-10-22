# Auto Loan Calculator

## Overview

This is a Vue 3 application that allows users to calculate and compare auto loan costs. Users can add multiple calculator instances to compare different loan scenarios side by side.

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

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Open a terminal in this project folder
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the dev server with:

```bash
npm run dev
```

Then open your browser to the URL shown in the terminal (usually http://localhost:5173).

## Your Assignment

Your task is to implement responsive breakpoints for the calculator grid layout.

### Where to Find the TODOs

Open the file `src/App.vue` and look for the `<!-- TODO: ... -->` comments. There are three tasks:

1. **Center the calculators**: Add a prop to the `<v-row>` component to horizontally center the calculator cards when they don't fill the entire row.

2. **Add responsive breakpoints**: Add props to the `<v-col>` component to control how many calculators appear per row at different screen sizes.

3. **Add ARIA attributes for accessibility**: Add ARIA (Accessible Rich Internet Applications) attributes to improve screen reader support. You'll need to add:
   - `aria-label` on the "Add Calculator" button
   - `role` and `aria-label` on the calculator container
   - `aria-live` on the row containing calculators

### Testing Your Solution

1. Run the dev server (`npm run dev`)
2. Open the app in your browser
3. Click "Add Calculator" to add multiple calculators
4. Resize your browser window to see the responsive behavior:
   - **Narrow window** (mobile): Calculators should stack in 1 column
   - **Medium window** (tablet): Calculators should display in 2 columns
   - **Wide window** (desktop): Calculators should display in 3 columns

### Grid System Hints

- Vuetify uses a **12-column grid system**
- To show 2 items per row, each item needs `12 / 2 = 6` columns
- To show 3 items per row, each item needs `12 / 3 = 4` columns
- Check the Vuetify documentation for [Grid System](https://vuetifyjs.com/en/components/grids/) and [v-row](https://vuetifyjs.com/en/api/v-row/) / [v-col](https://vuetifyjs.com/en/api/v-col/)

### ARIA Hints

- **`aria-label`**: Provides a text label for screen readers when the visible text isn't descriptive enough
- **`role`**: Defines what type of element something is (e.g., `region` creates a landmark)
- **`aria-live`**: Creates a "live region" that announces changes to screen readers (`polite` waits for the user to be idle)
- Check the MDN documentation for [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
