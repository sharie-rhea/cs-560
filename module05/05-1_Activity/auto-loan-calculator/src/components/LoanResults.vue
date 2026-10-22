<template>
  <div class="mt-8">
    <v-divider class="mb-6" />

    <h3 class="text-h6 text-center mb-4">Loan Breakdown</h3>

    <v-table density="comfortable">
      <tbody>
        <tr>
          <td class="font-weight-medium">Vehicle Cost</td>
          <td class="text-right">{{ formatCurrency(input.vehicleCost) }}</td>
        </tr>
        <tr>
          <td class="font-weight-medium">Trade-in Value</td>
          <td class="text-right text-error">
            -{{ formatCurrency(input.tradeInValue) }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-medium">Title/Registration/Fees</td>
          <td class="text-right">{{ formatCurrency(input.fees) }}</td>
        </tr>
        <tr class="bg-grey-lighten-4">
          <td class="font-weight-bold">Subtotal</td>
          <td class="text-right font-weight-bold">
            {{ formatCurrency(results.subtotal) }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-medium">Tax ({{ input.taxRate }}%)</td>
          <td class="text-right">{{ formatCurrency(results.taxAmount) }}</td>
        </tr>
        <tr>
          <td class="font-weight-medium">Down Payment</td>
          <td class="text-right text-error">
            -{{ formatCurrency(input.downPayment) }}
          </td>
        </tr>
        <tr class="bg-grey-lighten-4">
          <td class="font-weight-bold">Amount Financed</td>
          <td class="text-right font-weight-bold">
            {{ formatCurrency(results.financedAmount) }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-medium">
            Total Interest ({{ input.interestRate }}% APR over {{ input.loanTerm }} months)
          </td>
          <td class="text-right">{{ formatCurrency(results.totalInterest) }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-divider class="my-4" />

    <v-table density="comfortable">
      <tbody>
        <tr>
          <td class="font-weight-medium">Down Payment</td>
          <td class="text-right">{{ formatCurrency(input.downPayment) }}</td>
        </tr>
        <tr>
          <td class="font-weight-medium">Loan Payments ({{ input.loanTerm }} × {{ formatCurrency(results.monthlyPayment) }})</td>
          <td class="text-right">{{ formatCurrency(results.financedAmount + results.totalInterest) }}</td>
        </tr>
        <tr class="bg-primary">
          <td class="font-weight-bold text-white text-body-1">Total Cost of Ownership</td>
          <td class="text-right font-weight-bold text-white text-body-1">
            {{ formatCurrency(results.totalCost) }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-card class="mt-6 pa-4 bg-blue-lighten-5" variant="flat">
      <div class="text-center">
        <div class="text-body-2 text-grey-darken-1">Monthly Payment</div>
        <div class="text-h4 font-weight-bold text-primary">
          {{ formatCurrency(results.monthlyPayment) }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { LoanInput, LoanResult } from '@/utils/loanCalculator'

defineProps<{
  input: LoanInput
  results: LoanResult
}>()

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
</script>
