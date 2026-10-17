<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ProductType, FilterState } from '../types';

const emit = defineEmits<{
  (e: 'filter-change', filters: FilterState): void;
}>();

const productTypes: ProductType[] = [
  'CPU',
  'GPU',
  'Motherboard',
  'Case',
  'PowerSupply',
  'RAM',
];

const selectedType = ref<ProductType | null>(null);
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const applyFilters = () => {
  emit('filter-change', {
    type: selectedType.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  });
};

const clearFilters = () => {
  selectedType.value = null;
  minPrice.value = null;
  maxPrice.value = null;
  applyFilters();
};

watch([selectedType, minPrice, maxPrice], () => {
  applyFilters();
});
</script>

<template>
  <v-card class="pa-4" elevation="1">
    <v-card-title class="text-h6 pa-0 mb-4">
      <v-icon start>mdi-filter</v-icon>
      Filters
    </v-card-title>

    <v-select
      v-model="selectedType"
      :items="productTypes"
      label="Product Type"
      clearable
      variant="outlined"
      density="compact"
      class="mb-4"
    />

    <v-text-field
      v-model.number="minPrice"
      label="Min Price"
      type="number"
      prefix="$"
      variant="outlined"
      density="compact"
      class="mb-2"
      clearable
    />

    <v-text-field
      v-model.number="maxPrice"
      label="Max Price"
      type="number"
      prefix="$"
      variant="outlined"
      density="compact"
      class="mb-4"
      clearable
    />

    <v-btn variant="text" color="secondary" block @click="clearFilters">
      Clear Filters
    </v-btn>
  </v-card>
</template>
