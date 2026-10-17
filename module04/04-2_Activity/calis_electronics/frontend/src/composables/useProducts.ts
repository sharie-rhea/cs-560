import { ref, computed } from 'vue';
import type { Product, FilterState } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async (filters?: FilterState) => {
    loading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams();

      if (filters?.type) {
        params.append('type', filters.type);
      }
      if (filters?.minPrice !== null && filters?.minPrice !== undefined) {
        params.append('minPrice', String(filters.minPrice));
      }
      if (filters?.maxPrice !== null && filters?.maxPrice !== undefined) {
        params.append('maxPrice', String(filters.maxPrice));
      }

      const queryString = params.toString();
      const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      products.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch products';
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetchProducts,
  };
}
