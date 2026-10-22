<template>
  <v-card class="mx-auto" elevation="4">
    <v-card-title class="py-2 bg-primary text-white d-flex align-center">
      <span class="flex-grow-1 text-center">Generate a quote</span>
      <v-btn
        v-if="removable"
        icon="mdi-close"
        variant="text"
        density="compact"
        @click="$emit('remove')"
      />
    </v-card-title>

    <v-card-text class="pa-6">
      <v-form @submit.prevent="calculate">
        <v-row>
          <!-- Vehicle Price Section -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.vehicleCost"
              label="Vehicle Cost"
              type="number"
              prefix="$"
              :rules="[rules.required, rules.positive]"
              min="0"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.taxRate"
              label="Tax Rate"
              type="number"
              suffix="%"
              :rules="[rules.required, rules.percentage]"
              step="0.1"
              min="0"
              max="100"
            />
          </v-col>

          <!-- Upfront Payments Section -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.downPayment"
              label="Down Payment"
              type="number"
              prefix="$"
              :rules="[rules.nonNegative]"
              min="0"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.tradeInValue"
              label="Trade-in Value"
              type="number"
              prefix="$"
              :rules="[rules.nonNegative]"
              min="0"
            />
          </v-col>

          <!-- Fees Section -->
          <v-col cols="12">
            <v-text-field
              v-model.number="form.fees"
              label="Title/Registration/Other Fees"
              type="number"
              prefix="$"
              :rules="[rules.nonNegative]"
              min="0"
            />
          </v-col>

          <!-- Loan Terms Section -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.interestRate"
              label="Interest Rate (APR)"
              type="number"
              suffix="%"
              :rules="[rules.required, rules.percentage]"
              step="0.1"
              min="0"
              max="100"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.loanTerm"
              label="Loan Term"
              type="number"
              suffix="months"
              :rules="[rules.required, rules.positive]"
              min="1"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-center mt-4">
          <v-btn type="submit" color="primary" size="large" class="px-12">
            Calculate
          </v-btn>
        </div>
      </v-form>

      <v-expand-transition>
        <LoanResults
          v-if="results"
          :input="form"
          :results="results"
        />
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { calculateLoan, type LoanInput, type LoanResult } from '@/utils/loanCalculator'
import LoanResults from './LoanResults.vue'

defineProps<{
  removable?: boolean
}>()

defineEmits<{
  remove: []
}>()

const form = reactive<LoanInput>({
  vehicleCost: 0,
  taxRate: 0,
  downPayment: 0,
  tradeInValue: 0,
  fees: 0,
  interestRate: 0,
  loanTerm: 60
})

const results = ref<LoanResult | null>(null)

const rules = {
  required: (v: number) => (v !== null && v !== undefined && v > 0) || 'This field is required',
  positive: (v: number) => v > 0 || 'Must be greater than 0',
  nonNegative: (v: number) => v >= 0 || 'Cannot be negative',
  percentage: (v: number) => (v >= 0 && v <= 100) || 'Must be between 0 and 100'
}

const calculate = () => {
  results.value = calculateLoan(form)
}
</script>
