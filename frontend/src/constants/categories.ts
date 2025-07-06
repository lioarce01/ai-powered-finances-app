export const EXPENSE_CATEGORIES = [
  "Alimentación",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Vivienda",
  "Servicios",
  "Educación",
  "Ropa",
  "Otros",
] as const

export const INCOME_CATEGORIES = ["Sueldo", "Freelance", "Inversiones", "Bonos", "Otros"] as const

export const CATEGORY_ICONS = {
  ShoppingCart: "🛒 Compras",
  Car: "🚗 Transporte",
  Home: "🏠 Hogar",
  Heart: "❤️ Salud",
  Gamepad2: "🎮 Entretenimiento",
  GraduationCap: "🎓 Educación",
  Shirt: "👕 Ropa",
  DollarSign: "💰 Dinero",
  Briefcase: "💼 Trabajo",
  TrendingUp: "📈 Inversiones",
  Gift: "🎁 Regalos",
  MoreHorizontal: "⚪ Otros",
} as const

export const CATEGORY_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#6b7280", // gray
] as const

export const CURRENCIES = [
  { value: "ARS", label: "ARS (Peso Argentino)" },
  { value: "USD", label: "USD (Dólar)" },
] as const
