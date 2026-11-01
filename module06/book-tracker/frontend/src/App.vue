<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();

const currentRouteHasBackButton = computed(() => {
  return !!route.meta.showBackButton;
});
</script>

<template>
  <v-app>
    <v-app-bar density="comfortable">
      <v-app-bar-title>
        <router-link to="/" class="text-white text-decoration-none">
          READING LOG
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-if="currentRouteHasBackButton"
        variant="text"
        prepend-icon="mdi-arrow-left"
        to="/"
        class="text-white mr-2"
      >
        Back to Books
      </v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
/*
 * this style block is intentionally unscoped, so that these imports and classes
 * are available to the whole project
 */
@import "./assets/styles/variables.css";

.v-app-bar {
  background-color: var(--primary) !important;
}

.primary-surface-container {
  background-color: var(--primary-surface);
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
