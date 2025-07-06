"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { BudgetManager } from "@/components/budget-manager"
import { ReportsView } from "@/components/reports-view"
import { CategoryManager } from "@/components/category-manager"

// Agregar import de hooks y datos
//import { useFinancialSummary } from "@/hooks/useFinanceData"

export default function FinanceApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  // Replace the existing mockData usage with:
  const mockData = {
    balance: 15420.5,
    monthlyIncome: 8500.0,
    monthlyExpenses: 6200.0,
    savingsRate: 27.1,
    recentTransactions: [
      {
        id: "1",
        amount: -85.5,
        category: "Alimentación",
        description: "Supermercado",
        date: "2024-01-15",
        type: "expense" as const,
      },
      {
        id: "2",
        amount: 8500.0,
        category: "Sueldo",
        description: "Salario mensual",
        date: "2024-01-01",
        type: "income" as const,
      },
      {
        id: "3",
        amount: -45.0,
        category: "Transporte",
        description: "Combustible",
        date: "2024-01-14",
        type: "expense" as const,
      },
      {
        id: "4",
        amount: -120.0,
        category: "Entretenimiento",
        description: "Cine y cena",
        date: "2024-01-13",
        type: "expense" as const,
      },
    ],
    budgets: [
      { category: "Alimentación", spent: 850, limit: 1200, percentage: 71 },
      { category: "Transporte", spent: 320, limit: 400, percentage: 80 },
      { category: "Entretenimiento", spent: 180, limit: 300, percentage: 60 },
      { category: "Servicios", spent: 450, limit: 500, percentage: 90 },
    ],
  }

  // Remove the useFinancialSummary hook import and usage

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-black">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-neutral-100">Mi Finanzas</h1>
            <p className="text-slate-600 dark:text-neutral-400 mt-1">Gestiona tus finanzas de manera inteligente</p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Transacción
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              Transacciones
            </TabsTrigger>
            <TabsTrigger value="budgets" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              Presupuestos
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              Reportes
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              Categorías
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-neutral-400">
                    Balance Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-violet-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-neutral-100">
                    ${mockData.balance?.toLocaleString() || "0"}
                  </div>
                  <p className="text-xs text-violet-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% vs mes anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-neutral-400">
                    Ingresos Mensuales
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-neutral-100">
                    ${mockData.monthlyIncome?.toLocaleString() || "0"}
                  </div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Estable
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-neutral-400">
                    Gastos Mensuales
                  </CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-neutral-100">
                    ${mockData.monthlyExpenses?.toLocaleString() || "0"}
                  </div>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -5.2% vs mes anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-neutral-400">
                    Tasa de Ahorro
                  </CardTitle>
                  <PiggyBank className="h-4 w-4 text-violet-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-neutral-100">{mockData.savingsRate}%</div>
                  <p className="text-xs text-violet-600 flex items-center mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    Meta: 30%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Budget Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-neutral-100">Actividad Reciente</CardTitle>
                  <CardDescription>Últimas transacciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.recentTransactions?.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            transaction.type === "income" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-neutral-100">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-neutral-400">
                            {transaction.category} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-neutral-100">Resumen de Presupuestos</CardTitle>
                  <CardDescription>Estado actual de tus límites mensuales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.budgets?.map((budget, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900 dark:text-neutral-100">
                          {budget.category}
                        </span>
                        <Badge
                          variant={
                            budget.percentage > 85 ? "destructive" : budget.percentage > 70 ? "secondary" : "default"
                          }
                        >
                          {budget.percentage}%
                        </Badge>
                      </div>
                      <Progress value={budget.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-500 dark:text-neutral-400">
                        <span>${budget.spent}</span>
                        <span>${budget.limit}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <TransactionForm />
              </div>
              <div className="lg:col-span-2">
                <TransactionList />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetManager />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsView />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
