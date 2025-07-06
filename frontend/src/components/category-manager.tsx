"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  Car,
  Home,
  Heart,
  Gamepad2,
  GraduationCap,
  Shirt,
  MoreHorizontal,
  DollarSign,
  Briefcase,
  TrendingUp,
  Gift,
} from "lucide-react"

// Agregar imports
import { useCategories } from "@/hooks/useFinanceData"

const iconMap = {
  ShoppingCart,
  Car,
  Home,
  Heart,
  Gamepad2,
  GraduationCap,
  Shirt,
  MoreHorizontal,
  DollarSign,
  Briefcase,
  TrendingUp,
  Gift,
}

const mockCategories = {
  expense: [
    { id: "1", name: "Alimentación", icon: "ShoppingCart", color: "#ef4444", transactionCount: 45 },
    { id: "2", name: "Transporte", icon: "Car", color: "#f97316", transactionCount: 23 },
    { id: "3", name: "Vivienda", icon: "Home", color: "#eab308", transactionCount: 12 },
    { id: "4", name: "Salud", icon: "Heart", color: "#22c55e", transactionCount: 8 },
    { id: "5", name: "Entretenimiento", icon: "Gamepad2", color: "#3b82f6", transactionCount: 18 },
    { id: "6", name: "Educación", icon: "GraduationCap", color: "#8b5cf6", transactionCount: 5 },
    { id: "7", name: "Ropa", icon: "Shirt", color: "#ec4899", transactionCount: 7 },
    { id: "8", name: "Otros", icon: "MoreHorizontal", color: "#6b7280", transactionCount: 15 },
  ],
  income: [
    { id: "9", name: "Sueldo", icon: "DollarSign", color: "#22c55e", transactionCount: 12 },
    { id: "10", name: "Freelance", icon: "Briefcase", color: "#3b82f6", transactionCount: 8 },
    { id: "11", name: "Inversiones", icon: "TrendingUp", color: "#8b5cf6", transactionCount: 4 },
    { id: "12", name: "Bonos", icon: "Gift", color: "#f59e0b", transactionCount: 2 },
    { id: "13", name: "Otros", icon: "MoreHorizontal", color: "#6b7280", transactionCount: 3 },
  ],
}

export function CategoryManager() {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState("expense")
  const [editingCategory, setEditingCategory] = useState<any>(null)

  // En el componente, reemplazar mockCategories con:
  const { categories } = useCategories()

  // Separar categorías por tipo
  const expenseCategories = categories.filter((c) => c.type === "expense")
  const incomeCategories = categories.filter((c) => c.type === "income")

  const CategoryIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || MoreHorizontal
    return <Icon className={className} />
  }

  const CategoryForm = ({ category, onClose }: { category?: any; onClose: () => void }) => (
    <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-neutral-100">
          {category ? "Editar Categoría" : "Nueva Categoría"}
        </CardTitle>
        <CardDescription>
          {category ? "Modifica los detalles de la categoría" : "Crea una nueva categoría personalizada"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Ej: Mascotas" defaultValue={category?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select defaultValue={category?.type || activeTab}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Gasto</SelectItem>
                <SelectItem value="income">Ingreso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="icon">Ícono</Label>
            <Select defaultValue={category?.icon || "MoreHorizontal"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ShoppingCart">🛒 Compras</SelectItem>
                <SelectItem value="Car">🚗 Transporte</SelectItem>
                <SelectItem value="Home">🏠 Hogar</SelectItem>
                <SelectItem value="Heart">❤️ Salud</SelectItem>
                <SelectItem value="Gamepad2">🎮 Entretenimiento</SelectItem>
                <SelectItem value="GraduationCap">🎓 Educación</SelectItem>
                <SelectItem value="Shirt">👕 Ropa</SelectItem>
                <SelectItem value="DollarSign">💰 Dinero</SelectItem>
                <SelectItem value="Briefcase">💼 Trabajo</SelectItem>
                <SelectItem value="TrendingUp">📈 Inversiones</SelectItem>
                <SelectItem value="Gift">🎁 Regalos</SelectItem>
                <SelectItem value="MoreHorizontal">⚪ Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex space-x-2">
              {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280"].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            {category ? "Actualizar" : "Crear"} Categoría
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-neutral-100">Gestión de Categorías</h2>
          <p className="text-slate-600 dark:text-neutral-400">
            Organiza y personaliza tus categorías de ingresos y gastos
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {/* Form */}
      {(showForm || editingCategory) && (
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setShowForm(false)
            setEditingCategory(null)
          }}
        />
      )}

      {/* Categories Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          <TabsTrigger value="expense" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            Gastos ({mockCategories.expense.length})
          </TabsTrigger>
          <TabsTrigger value="income" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Ingresos ({mockCategories.income.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCategories.expense.map((category) => (
              <Card
                key={category.id}
                className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <CategoryIcon iconName={category.icon} className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-neutral-100">{category.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-neutral-500">
                          {category.transactionCount} transacciones
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-full justify-center"
                    style={{ borderColor: category.color, color: category.color }}
                  >
                    Gasto
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCategories.income.map((category) => (
              <Card
                key={category.id}
                className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <CategoryIcon iconName={category.icon} className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-neutral-100">{category.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-neutral-500">
                          {category.transactionCount} transacciones
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-full justify-center"
                    style={{ borderColor: category.color, color: category.color }}
                  >
                    Ingreso
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200 dark:border-violet-700">
        <CardHeader>
          <CardTitle className="flex items-center text-violet-900 dark:text-neutral-100">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sugerencias Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-violet-800 dark:text-violet-200">
            • Considera crear una categoría "Mascotas" - detectamos varios gastos relacionados
          </div>
          <div className="text-sm text-violet-800 dark:text-violet-200">
            • La categoría "Suscripciones" podría ayudarte a controlar mejor tus gastos recurrentes
          </div>
          <div className="text-sm text-violet-800 dark:text-violet-200">
            • Tus categorías más utilizadas son Alimentación y Transporte - considera subcategorías
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
