export type Transaction = {
  type: string
  destination: string
  amount: string
  category: number
  description: string
}

export type TransactionDay = {
  date: {
    dayName: string
    day: string
    month: string
    year: string
  }
  totalDay: {
    incomes: number
    expenses: number
  }
  data: Array<Transaction>
}
