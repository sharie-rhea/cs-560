<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Auto Loan Calculator</v-app-bar-title>
      <!--
        TODO: Add an 'aria-label' attribute to the button below.
        - aria-label provides a text description for screen readers
        - Use a descriptive label like "Add a new loan calculator"
        - This helps users who rely on assistive technology understand the button's purpose
      -->
      <v-btn
        @click="addCalculator"
        variant="outlined"
        prepend-icon="mdi-plus"
        aria-label="Add new 'Generate a quote' calculator."
      >
        Add Calculator
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <!--
        TODO: Add ARIA landmark attributes to the container below:
        - Add role="region" to define this as a landmark region
        - Add aria-label="Loan calculators" to describe the region's purpose
        - Landmarks help screen reader users navigate and understand page structure
      -->
      <v-container
        fluid
        class="pa-4"
        aria-label="'Loan quote calculators."
        role="region"
      >
        <!--
          TODO: Add the 'justify' prop with a value of 'center' to the <v-row> below.
          This will horizontally center the calculators when they don't fill the entire row

          TODO: Add aria-live="polite" to the <v-row> below.
          - aria-live creates a "live region" that announces dynamic content changes
          - "polite" means the screen reader waits until the user is idle before announcing
          - This is useful here because calculators can be added/removed dynamically
        -->
        <v-row justify="center" aria-live="polite">
          <!--
            TODO: Add responsive breakpoints to the <v-col> below:
            - 'sm' for tablets (2 columns)
            - 'lg' for desktop (3 columns)

            Vuetify Grid System Explanation:
            - cols="12": Uses full width (12 out of 12 columns) on mobile screens
            - Vuetify divides each row into 12 equal columns
            - To show 2 items per row: each item needs 6 columns (12/2 = 6)
            - To show 3 items per row: each item needs 4 columns (12/3 = 4)

            Breakpoints work from smallest to largest (xs → sm → md → lg → xl):
            - xs (mobile) uses the 'cols' value
            - sm (tablet) and larger use the 'sm' value if specified
            - lg (desktop) and larger use the 'lg' value if specified
          -->
          <v-col v-for="id in calculators" :key="id" cols="12" sm="6" lg="4">
            <AutoLoanCalculator
              :removable="calculators.length > 1"
              @remove="removeCalculator(id)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AutoLoanCalculator from "./components/AutoLoanCalculator.vue";

const nextId = ref(1);
const calculators = ref<number[]>([nextId.value++]);

const addCalculator = () => {
  calculators.value.push(nextId.value++);
};

const removeCalculator = (id: number) => {
  calculators.value = calculators.value.filter((calcId) => calcId !== id);
};
</script>
