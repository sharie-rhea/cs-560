# Cali's Electronics Store

## Overview

This is a full-stack web application for an electronics store that sells computer components. Users can browse products (CPUs, GPUs, Motherboards, Cases, Power Supplies, RAM), filter by type and price, and add items to a shopping cart.

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

2. Run the setup command to install dependencies and seed the database:

```bash
make setup
```

Or manually:

```bash
cd backend
npm install
npm run seed

cd ../frontend
npm install
```

### Running the Application

You need to run both the backend and frontend servers.

**Terminal 1 - Backend:**

```bash
make dev-backend
```

Or: `cd backend && npm run dev`

**Terminal 2 - Frontend:**

```bash
make dev-frontend
```

Or: `cd frontend && npm run dev`

Then open your browser to http://localhost:5173

## Your Assignment

Your task is to consolidate duplicated product card code into a single reusable `ProductCard` component.

### Where to Find the TODOs

There are three files with TODO comments:

1. **`frontend/src/components/ProductCard.vue`** - The component skeleton you need to complete
2. **`frontend/src/components/ProductList.vue`** - Contains duplicated card markup to replace
3. **`frontend/src/views/CartView.vue`** - Contains duplicated card markup to replace

### Tasks

#### Task 1: Complete the ProductCard Component

In `ProductCard.vue`, you need to:

1. Add two boolean props:
   - `showAddToCart` (default: `true`) - controls whether to show the "Add to Cart" button
   - `showQuantityControls` (default: `false`) - controls whether to show quantity +/- buttons

2. Add default values for these props in `withDefaults()`

3. Implement the template by copying the card markup from `ProductList.vue`, then use `v-if` to conditionally render the appropriate `v-card-actions` based on the props

#### Task 2: Update ProductList.vue

Replace the inline card markup with the `ProductCard` component:

```vue
<ProductCard :product="product" />
```

Delete the duplicated helper functions marked with `BEGIN/END DUPLICATED CODE`.

#### Task 3: Update CartView.vue

Replace the inline card markup with the `ProductCard` component:

```vue
<ProductCard
  :product="product"
  :show-add-to-cart="false"
  :show-quantity-controls="true"
  :quantity="product.quantity"
  @update:quantity="(qty) => updateQuantity(product.id, qty)"
  @remove="removeFromCart(product.id)"
/>
```

Delete the duplicated helper functions marked with `BEGIN/END DUPLICATED CODE`.

### Testing Your Solution

1. Make sure both servers are running
2. Browse products and verify the cards display correctly
3. Add items to the cart and verify the cart view shows quantity controls
4. Verify that +/- buttons and delete work correctly in the cart

### Hints

- Study the existing card markup in `ProductList.vue` and `CartView.vue` to understand the structure
- The only difference between the two cards is the `v-card-actions` section
- Use `v-if="showAddToCart"` and `v-if="showQuantityControls"` to conditionally render the actions
- The `ProductCard` component already has all the helper functions implemented for you

## Documentation Links

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Vue Props](https://vuejs.org/guide/components/props.html)
- [Vue Emits](https://vuejs.org/guide/components/events.html)
- [Vuetify Components](https://vuetifyjs.com/en/components/all/)
- [Vuetify Cards](https://vuetifyjs.com/en/components/cards/)
