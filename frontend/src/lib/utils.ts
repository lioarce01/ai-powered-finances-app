import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for the finance app
export function formatCurrency(amount: number, currency = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function getTransactionTypeColor(type: "income" | "expense"): string {
  return type === "income" ? "text-green-600" : "text-red-600"
}

export function getBudgetStatusColor(percentage: number): {
  color: "default" | "secondary" | "destructive"
  label: string
} {
  if (percentage >= 90) return { color: "destructive", label: "Crítico" }
  if (percentage >= 80) return { color: "secondary", label: "Alerta" }
  if (percentage >= 70) return { color: "default", label: "Cuidado" }
  return { color: "default", label: "Saludable" }
}
