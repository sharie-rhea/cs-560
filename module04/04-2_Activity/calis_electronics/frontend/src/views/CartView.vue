<script setup lang="ts">
import { computed, ref } from "vue";
import confetti from "canvas-confetti";
import ProductCard from "../components/ProductCard.vue";
import { useCart } from "../composables/useCart";

const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } =
  useCart();

const showSuccessMessage = ref(false);

// Transform cart items to make product properties directly accessible
// This makes the template more consistent with ProductList.vue
const cartProducts = computed(() => {
  return cartItems.value.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));
});

const formattedTotal = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cartTotal.value);
});

// TODO: DELETE THIS SECTION after implementing ProductCard component
// These helper functions are duplicated from ProductList.vue and have already
// been implemented for you in ProductCard.vue. Once you complete the ProductCard
// template and integrate it here, you can remove all the code between these TODO markers.

const handleCheckout = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  showSuccessMessage.value = true;
  clearCart();
};
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-6">Shopping Cart</h1>

    <v-alert
      v-if="cartItems.length === 0"
      type="info"
      variant="tonal"
      class="mb-4"
    >
      Your cart is empty. Start shopping to add items!
    </v-alert>

    <template v-else>
      <v-row>
        <v-col
          v-for="product in cartProducts"
          :key="product.id"
          cols="12"
          md="6"
          lg="3"
        >
          <!-- TODO: Replace this with the ProductCard component -->
          <ProductCard
            :product="product"
            :show-add-to-cart="false"
            :show-quantity-controls="true"
            :quantity="product.quantity"
            @update:quantity="(qty: number) => updateQuantity(product.id, qty)"
            @remove="removeFromCart(product.id)"
          />
        </v-col>
      </v-row>

      <v-card class="mt-6 pa-4" elevation="2">
        <v-card-title class="text-h5">Order Summary</v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between text-h6">
            <span>Total:</span>
            <span class="text-primary font-weight-bold">{{
              formattedTotal
            }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" variant="text" @click="clearCart">
            Clear Cart
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            @click="handleCheckout"
          >
            Checkout
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-snackbar v-model="showSuccessMessage" color="success" :timeout="3000">
      Order placed successfully! Thank you for your purchase.
    </v-snackbar>
  </v-container>
</template>
