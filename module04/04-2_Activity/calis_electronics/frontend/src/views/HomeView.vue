<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from '../composables/useProducts';
import type { FilterState } from '../types';
import FilterPanel from '../components/FilterPanel.vue';
import ProductList from '../components/ProductList.vue';

const { products, loading, error, fetchProducts } = useProducts();

const handleFilterChange = (filters: FilterState) => {
  fetchProducts(filters);
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <FilterPanel @filter-change="handleFilterChange" />
      </v-col>

      <v-col cols="12" md="9">
        <h1 class="text-h4 mb-6">All Products</h1>

        <v-alert v-if="error" type="error" class="mb-4">
          {{ error }}
        </v-alert>

        <ProductList :products="products" :loading="loading" />
      </v-col>
    </v-row>
  </v-container>
</template>
