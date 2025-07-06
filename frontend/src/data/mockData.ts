import type { ChartData, CategoryData, SavingsGoalData } from "@/types/finance"

export const monthlyChartData: ChartData[] = [
  { month: "Oct", ingresos: 8500, gastos: 6800, ahorro: 1700 },
  { month: "Nov", ingresos: 8500, gastos: 6200, ahorro: 2300 },
  { month: "Dic", ingresos: 9200, gastos: 7100, ahorro: 2100 },
  { month: "Ene", ingresos: 8500, gastos: 6200, ahorro: 2300 },
]

export const categoryChartData: CategoryData[] = [
  { name: "Alimentación", value: 850, color: "#ef4444" },
  { name: "Transporte", value: 320, color: "#f97316" },
  { name: "Entretenimiento", value: 180, color: "#eab308" },
  { name: "Servicios", value: 450, color: "#22c55e" },
  { name: "Salud", value: 75, color: "#3b82f6" },
  { name: "Otros", value: 125, color: "#8b5cf6" },
]

export const savingsGoalChartData: SavingsGoalData[] = [
  { month: "Oct", objetivo: 2000, real: 1700 },
  { month: "Nov", objetivo: 2000, real: 2300 },
  { month: "Dic", objetivo: 2000, real: 2100 },
  { month: "Ene", objetivo: 2000, real: 2300 },
]

export const aiInsights = [
  {
    type: "success" as const,
    title: "Excelente control de gastos",
    description: "Redujiste tus gastos en un 8.8% comparado con diciembre",
  },
  {
    type: "warning" as const,
    title: "Oportunidad de ahorro",
    description: "Podrías ahorrar $200 más optimizando gastos de entretenimiento",
  },
]

export const budgetRecommendations = [
  "Considera reducir el presupuesto de Entretenimiento en un 15% para aumentar tus ahorros",
  "Tu gasto en Alimentación está 20% por encima del promedio. Intenta cocinar más en casa",
  "Excelente control en Salud. Mantén este patrón de gasto responsable",
]

export const categoryRecommendations = [
  "Considera crear una categoría 'Mascotas' - detectamos varios gastos relacionados",
  "La categoría 'Suscripciones' podría ayudarte a controlar mejor tus gastos recurrentes",
  "Tus categorías más utilizadas son Alimentación y Transporte - considera subcategorías",
]
