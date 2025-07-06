export interface Transaction {
  id: string
  amount: number
  categoryId: string
  description: string
  date: string
  type: "income" | "expense"
  currency: "ARS" | "USD"
  userId: string
}

export interface Category {
  id: string
  name: string
  type: "income" | "expense"
  color: string
  icon?: string
  userId: string
}

export interface Budget {
  id: string
  categoryId: string
  amount: number
  month: string
  currency: "ARS" | "USD"
  userId: string
}

export interface User {
  id: string
  email: string
  name: string
  currency: "ARS" | "USD"
  preferences: {
    theme: "light" | "dark" | "system"
    notifications: boolean
    language: "es" | "en"
  }
}

export interface FinancialSummary {
  balance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  currency: "ARS" | "USD"
}

export interface ChartData {
  month: string
  ingresos: number
  gastos: number
  ahorro: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

export interface SavingsGoalData {
  month: string
  objetivo: number
  real: number
}

export interface CreateTransactionDto {
  amount: number
  categoryId: string
  description: string
  date: string
  type: "income" | "expense"
  currency: "ARS" | "USD"
}

export interface UpdateTransactionDto {
  amount?: number
  categoryId?: string
  description?: string
  date?: string
  type?: "income" | "expense"
  currency?: "ARS" | "USD"
}

export interface CreateCategoryDto {
  name: string
  type: "income" | "expense"
  color: string
  icon?: string
}

export interface UpdateCategoryDto {
  name?: string
  type?: "income" | "expense"
  color?: string
  icon?: string
}

export interface CreateBudgetDto {
  categoryId: string
  amount: number
  month: string
  currency: "ARS" | "USD"
}

export interface UpdateBudgetDto {
  categoryId?: string
  amount?: number
  month?: string
  currency?: "ARS" | "USD"
}

export interface TransactionFiltersDto {
  dateFrom?: string
  dateTo?: string
  categoryId?: string
  type?: "income" | "expense"
  amountMin?: number
  amountMax?: number
}

export interface PaginationDto {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface TransactionWithCategory extends Transaction {
  category?: Category
}

export interface BudgetWithCategory extends Budget {
  category?: Category
  spent?: number
  percentage?: number
  trend?: "up" | "down" | "stable"
}

export interface CategoryWithStats extends Category {
  transactionCount?: number
}
