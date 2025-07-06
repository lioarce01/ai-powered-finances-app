"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Edit, Trash2 } from "lucide-react"

// Agregar import del hook
import { useTransactions } from "@/hooks/useFinanceData"

const mockTransactions = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Supermercado Coto",
    category: "Alimentación",
    amount: -85.5,
    type: "expense",
    currency: "ARS",
  },
  {
    id: "2",
    date: "2024-01-15",
    description: "Freelance proyecto web",
    category: "Freelance",
    amount: 1200.0,
    type: "income",
    currency: "USD",
  },
  {
    id: "3",
    date: "2024-01-14",
    description: "Combustible YPF",
    category: "Transporte",
    amount: -45.0,
    type: "expense",
    currency: "ARS",
  },
  {
    id: "4",
    date: "2024-01-13",
    description: "Cine y cena",
    category: "Entretenimiento",
    amount: -120.0,
    type: "expense",
    currency: "ARS",
  },
  {
    id: "5",
    date: "2024-01-12",
    description: "Salario mensual",
    category: "Sueldo",
    amount: 8500.0,
    type: "income",
    currency: "ARS",
  },
  {
    id: "6",
    date: "2024-01-11",
    description: "Farmacia",
    category: "Salud",
    amount: -35.75,
    type: "expense",
    currency: "ARS",
  },
  {
    id: "7",
    date: "2024-01-10",
    description: "Netflix suscripción",
    category: "Entretenimiento",
    amount: -12.99,
    type: "expense",
    currency: "USD",
  },
  {
    id: "8",
    date: "2024-01-09",
    description: "Dividendos acciones",
    category: "Inversiones",
    amount: 250.0,
    type: "income",
    currency: "USD",
  },
]

export function TransactionList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // En el componente, reemplazar mockTransactions con:
  const { transactions } = useTransactions()

  // Cambiar filteredTransactions para usar transactions en lugar de mockTransactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    const matchesType = filterType === "all" || transaction.type === filterType

    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-900 dark:text-neutral-100">Historial de Transacciones</CardTitle>
            <CardDescription>Gestiona y filtra tus transacciones</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar transacciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Ingresos</SelectItem>
              <SelectItem value="expense">Gastos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Alimentación">Alimentación</SelectItem>
              <SelectItem value="Transporte">Transporte</SelectItem>
              <SelectItem value="Entretenimiento">Entretenimiento</SelectItem>
              <SelectItem value="Salud">Salud</SelectItem>
              <SelectItem value="Sueldo">Sueldo</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Moneda</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString("es-AR")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={transaction.currency === "USD" ? "default" : "secondary"}>
                      {transaction.currency}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-neutral-500">
            No se encontraron transacciones que coincidan con los filtros.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
