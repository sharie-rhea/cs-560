<script setup lang="ts">
// =============================================================================
// ProductCard.vue - Reusable Product Card Component
// =============================================================================
//
// GOAL: Consolidate the duplicated product card code from ProductList.vue
// and CartView.vue into this single reusable component.
//
// STUDENT TASKS:
// 1. Add two boolean props to control card behavior:
//    - showAddToCart (default: true) - shows "Add to Cart" button
//    - showQuantityControls (default: false) - shows +/- quantity buttons
//
// 2. Add default values for the new props in withDefaults()
//
// 3. Implement the template by copying the card markup from ProductList.vue,
//    then conditionally render the v-card-actions based on the props
//
// AFTER completing this component, update ProductList.vue and CartView.vue
// to use <ProductCard> instead of their inline card markup, and delete the
// duplicated helper functions marked with "BEGIN/END DUPLICATED CODE".
// =============================================================================

import { computed } from "vue";
import type { Product } from "../types";
import { useCart } from "../composables/useCart";

// Props - some defined, some left as TODO for students
interface Props {
  product: Product;
  // TODO: Add a boolean prop to control whether to show the "Add to Cart" button (default: true)
  showAddToCart?: boolean;
  // TODO: Add a boolean prop to control whether to show quantity controls (default: false)
  showQuantityControls?: boolean;
  quantity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  // TODO: Add default value for showAddToCart (true)
  showAddToCart: true,
  // TODO: Add default value for showQuantityControls (false)
  showQuantityControls: false,
  quantity: 0,
});

const emit = defineEmits<{
  (e: "remove"): void;
  (e: "update:quantity", value: number): void;
}>();

const { addToCart, isInCart } = useCart();

const typeColor = computed(() => {
  const colors: Record<string, string> = {
    CPU: "#1976D2",
    GPU: "#4CAF50",
    Motherboard: "#9C27B0",
    Case: "#FF9800",
    PowerSupply: "#F44336",
    RAM: "#009688",
  };
  return colors[props.product.type] || "#757575";
});

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price);
});

const specsList = computed(() => {
  return Object.entries(props.product.specs)
    .filter(([, value]) => value !== undefined)
    .slice(0, 4);
});

const handleAddToCart = () => {
  addToCart(props.product);
};

const incrementQuantity = () => {
  emit("update:quantity", props.quantity + 1);
};

const decrementQuantity = () => {
  if (props.quantity > 1) {
    emit("update:quantity", props.quantity - 1);
  } else {
    emit("remove");
  }
};

const handleRemove = () => {
  emit("remove");
};
</script>

<!-- TODO: Move the duplicated card template here -->
<!-- See ProductList.vue and CartView.vue for the current implementations -->
<!--
    **************************************************************************
    * IMPORTANT: The templates in ProductList.vue and CartView.vue are NOT   *
    * exactly identical! The card body (header, title, price, description,   *
    * specs) is the same, but the v-card-actions section differs:            *
    *                                                                        *
    *   - ProductList.vue shows an "Add to Cart" button                      *
    *   - CartView.vue shows quantity controls (+/- buttons, delete)         *
    *                                                                        *
    * This is where PROPS come in! By using showAddToCart and                *
    * showQuantityControls props, we can parameterize the ProductCard to     *
    * handle BOTH situations. This still eliminates a ton of redundancy      *
    * and centralizes our logic and concerns into a single reusable          *
    * component.                                                             *
    **************************************************************************

    HINT: The only difference is in v-card-actions:
      - When showAddToCart is true: show "Add to Cart" button
        (disabled with "In Cart" text when already in cart)
      - When showQuantityControls is true: show quantity controls
        (minus button, quantity display, plus button, delete button)
  -->
<template>
  <v-card class="h-100 d-flex flex-column" elevation="2">
    <div
      class="d-flex align-center justify-center position-relative"
      :style="{ backgroundColor: typeColor, height: '200px' }"
    >
      <span class="text-h6 text-white text-center px-4">{{
        product.name
      }}</span>
      <v-chip
        color="white"
        class="ma-2 position-absolute"
        style="top: 0; left: 0"
        size="small"
      >
        {{ product.type }}
      </v-chip>
    </div>

    <v-card-title class="text-h6">
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle class="text-h5 font-weight-bold text-primary">
      {{ formattedPrice }}
    </v-card-subtitle>

    <v-card-text class="flex-grow-1">
      <p class="text-body-2 mb-2">{{ product.description }}</p>

      <v-divider class="my-2" />

      <div class="d-flex flex-wrap">
        <v-chip
          v-for="[key, value] in specsList"
          :key="key"
          size="x-small"
          variant="outlined"
          class="ma-1"
        >
          {{ key }}: {{ value }}
        </v-chip>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="showAddToCart"
        color="primary"
        variant="elevated"
        block
        :disabled="isInCart(product.id)"
        @click="handleAddToCart"
      >
        <v-icon start>mdi-cart-plus</v-icon>
        {{ isInCart(product.id) ? "In Cart" : "Add to Cart" }}
      </v-btn>

      <div
        v-if="showQuantityControls"
        class="d-flex align-center w-100 justify-center"
      >
        <v-btn
          icon="mdi-minus"
          size="small"
          variant="outlined"
          @click="decrementQuantity"
        />
        <span class="mx-4 text-h6">{{ quantity }}</span>
        <v-btn
          icon="mdi-plus"
          size="small"
          variant="outlined"
          @click="incrementQuantity"
        />
        <v-spacer />
        <v-btn
          icon="mdi-delete"
          color="error"
          variant="text"
          @click="handleRemove"
        />
      </div>
    </v-card-actions>
  </v-card>
</template>
