"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Target, AlertTriangle, TrendingUp, Edit, Trash2 } from "lucide-react"

// Agregar imports
import { useBudgets } from "@/hooks/useFinanceData"
import { getBudgetStatusColor } from "@/lib/utils"

const mockBudgets = [
  {
    id: "1",
    category: "Alimentación",
    limit: 1200,
    spent: 850,
    currency: "ARS",
    month: "2024-01",
    percentage: 71,
    trend: "up",
  },
  {
    id: "2",
    category: "Transporte",
    limit: 400,
    spent: 320,
    currency: "ARS",
    month: "2024-01",
    percentage: 80,
    trend: "stable",
  },
  {
    id: "3",
    category: "Entretenimiento",
    limit: 300,
    spent: 180,
    currency: "ARS",
    month: "2024-01",
    percentage: 60,
    trend: "down",
  },
  {
    id: "4",
    category: "Servicios",
    limit: 500,
    spent: 450,
    currency: "ARS",
    month: "2024-01",
    percentage: 90,
    trend: "up",
  },
  {
    id: "5",
    category: "Salud",
    limit: 200,
    spent: 75,
    currency: "ARS",
    month: "2024-01",
    percentage: 38,
    trend: "stable",
  },
]

export function BudgetManager() {
  const [showForm, setShowForm] = useState(false)

  // En el componente, reemplazar mockBudgets con:
  const { budgets } = useBudgets()

  // Reemplazar getBudgetStatus con getBudgetStatusColor del utils
  const criticalBudgets = budgets.filter((budget) => budget.percentage >= 80)

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 90) return { color: "destructive", label: "Crítico" }
    if (percentage >= 80) return { color: "secondary", label: "Alerta" }
    if (percentage >= 70) return { color: "default", label: "Cuidado" }
    return { color: "default", label: "Saludable" }
  }

  // const criticalBudgets = mockBudgets.filter((budget) => budget.percentage >= 80)

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {criticalBudgets.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            Tienes {criticalBudgets.length} presupuesto{criticalBudgets.length > 1 ? "s" : ""} cerca del límite.
            Considera ajustar tus gastos en: {criticalBudgets.map((b) => b.category).join(", ")}.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-neutral-100">Gestión de Presupuestos</h2>
          <p className="text-slate-600 dark:text-neutral-400">Controla tus límites de gasto mensuales</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Presupuesto
        </Button>
      </div>

      {/* New Budget Form */}
      {showForm && (
        <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-neutral-100">Crear Nuevo Presupuesto</CardTitle>
            <CardDescription>Define un límite de gasto para una categoría</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacion">Alimentación</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="entretenimiento">Entretenimiento</SelectItem>
                    <SelectItem value="salud">Salud</SelectItem>
                    <SelectItem value="vivienda">Vivienda</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Límite Mensual</Label>
                <Input id="limit" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">Crear Presupuesto</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const status = getBudgetStatusColor(budget.percentage)
          return (
            <Card key={budget.id} className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-slate-900 dark:text-neutral-100">{budget.category}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={status.color as any}>{status.label}</Badge>
                  <div className="flex items-center text-xs text-slate-500 dark:text-neutral-500">
                    <TrendingUp
                      className={`w-3 h-3 mr-1 ${
                        budget.trend === "up"
                          ? "text-red-500"
                          : budget.trend === "down"
                            ? "text-green-500"
                            : "text-slate-400"
                      }`}
                    />
                    {budget.trend === "up" ? "Subiendo" : budget.trend === "down" ? "Bajando" : "Estable"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-neutral-400">Gastado</span>
                    <span className="font-semibold text-slate-900 dark:text-neutral-100">
                      ${budget.spent} / ${budget.limit}
                    </span>
                  </div>
                  <Progress value={budget.percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-neutral-400">
                    <span>{budget.percentage}% utilizado</span>
                    <span>${budget.limit - budget.spent} restante</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-neutral-400">Moneda</span>
                    <Badge variant="outline">{budget.currency}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200 dark:border-violet-700">
        <CardHeader>
          <CardTitle className="flex items-center text-violet-900 dark:text-neutral-100">
            <Target className="w-5 h-5 mr-2" />
            Recomendaciones Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-violet-800 dark:text-violet-200">
            • Considera reducir el presupuesto de Entretenimiento en un 15% para aumentar tus ahorros
          </div>
          <div className="text-sm text-violet-800 dark:text-violet-200">
            • Tu gasto en Alimentación está 20% por encima del promedio. Intenta cocinar más en casa
          </div>
          <div className="text-sm text-violet-800 dark:text-violet-200">
            • Excelente control en Salud. Mantén este patrón de gasto responsable
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
