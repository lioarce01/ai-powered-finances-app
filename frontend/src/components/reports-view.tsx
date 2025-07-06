"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Calendar, Download, Brain, AlertCircle, CheckCircle } from "lucide-react"

// Agregar imports de datos
import { monthlyChartData, categoryChartData, savingsGoalChartData } from "@/data/mockData"

// Reemplazar las constantes locales con las importadas
// monthlyData -> monthlyChartData
// categoryData -> categoryChartData
// savingsGoalData -> savingsGoalChartData

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-neutral-100">Reportes y Análisis</h2>
          <p className="text-slate-600 dark:text-neutral-400">Insights inteligentes sobre tus finanzas</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[150px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200 dark:border-violet-700">
        <CardHeader>
          <CardTitle className="flex items-center text-violet-900 dark:text-neutral-100">
            <Brain className="w-5 h-5 mr-2" />
            Análisis Inteligente - Enero 2024
          </CardTitle>
          <CardDescription className="text-violet-700 dark:text-violet-300">
            Insights generados por IA basados en tus patrones de gasto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-neutral-100">Excelente control de gastos</p>
                <p className="text-xs text-slate-600 dark:text-neutral-400">
                  Redujiste tus gastos en un 8.8% comparado con diciembre
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-neutral-100">Oportunidad de ahorro</p>
                <p className="text-xs text-slate-600 dark:text-neutral-400">
                  Podrías ahorrar $200 más optimizando gastos de entretenimiento
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-neutral-100">Tendencia Mensual</CardTitle>
            <CardDescription>Ingresos vs Gastos vs Ahorros</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ingresos" fill="#22c55e" name="Ingresos" />
                <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
                <Bar dataKey="ahorro" fill="#9333ea" name="Ahorros" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-neutral-100">Distribución por Categoría</CardTitle>
            <CardDescription>Gastos del mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Savings Goal Progress */}
      <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-neutral-100">Progreso de Meta de Ahorro</CardTitle>
          <CardDescription>Objetivo vs Ahorro Real</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsGoalChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="objetivo" stroke="#94a3b8" strokeDasharray="5 5" name="Objetivo" />
              <Line type="monotone" dataKey="real" stroke="#0d9488" strokeWidth={3} name="Ahorro Real" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-900 dark:text-neutral-100">Salud Financiera</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">85/100</div>
                <p className="text-sm text-slate-600 dark:text-neutral-400">Puntuación General</p>
              </div>
              <Progress value={85} className="h-2" />
              <Badge className="w-full justify-center bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                Muy Buena
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-900 dark:text-neutral-100">Tasa de Ahorro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">27.1%</div>
                <p className="text-sm text-slate-600 dark:text-neutral-400">Del ingreso total</p>
              </div>
              <Progress value={27.1} className="h-2" />
              <div className="flex items-center justify-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.2% vs mes anterior
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-900 dark:text-neutral-100">Control de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">92/100</div>
                <p className="text-sm text-slate-600 dark:text-neutral-400">Disciplina</p>
              </div>
              <Progress value={92} className="h-2" />
              <Badge className="w-full justify-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Excelente
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
