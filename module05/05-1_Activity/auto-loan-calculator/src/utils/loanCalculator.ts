export interface LoanInput {
  vehicleCost: number
  taxRate: number
  downPayment: number
  tradeInValue: number
  fees: number
  interestRate: number
  loanTerm: number
}

export interface LoanResult {
  subtotal: number
  taxAmount: number
  financedAmount: number
  monthlyPayment: number
  totalInterest: number
  totalCost: number
}

export function calculateLoan(input: LoanInput): LoanResult {
  const subtotal = input.vehicleCost - input.tradeInValue + input.fees
  const taxAmount = subtotal * (input.taxRate / 100)
  const amountBeforeDownPayment = subtotal + taxAmount
  const financedAmount = amountBeforeDownPayment - input.downPayment
  const monthlyRate = input.interestRate / 100 / 12
  const n = input.loanTerm

  let monthlyPayment: number
  let totalInterest: number

  if (monthlyRate === 0) {
    monthlyPayment = financedAmount / n
    totalInterest = 0
  } else {
    const factor = Math.pow(1 + monthlyRate, n)
    monthlyPayment = financedAmount * (monthlyRate * factor) / (factor - 1)
    totalInterest = (monthlyPayment * n) - financedAmount
  }

  const totalCost = input.downPayment + financedAmount + totalInterest

  return {
    subtotal,
    taxAmount,
    financedAmount,
    monthlyPayment,
    totalInterest,
    totalCost
  }
}
