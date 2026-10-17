<script setup lang="ts">
import { useCart } from '../composables/useCart';

const { cartCount } = useCart();
</script>

<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title>
      <router-link to="/" class="text-white text-decoration-none">
        Cali's Electronics
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <v-btn to="/cart" icon>
      <v-badge :content="cartCount" :model-value="cartCount > 0" color="error">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>
