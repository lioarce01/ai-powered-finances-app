"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
// Actualizar importaciones
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants/categories"

// Reemplazar el objeto categories con las constantes
const categories = {
  expense: EXPENSE_CATEGORIES,
  income: INCOME_CATEGORIES,
}

export function TransactionForm() {
  const [date, setDate] = useState<Date>()
  const [type, setType] = useState<"income" | "expense">("expense")
  const [description, setDescription] = useState("")
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null)

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    // Simulate AI category suggestion
    if (value.toLowerCase().includes("super") || value.toLowerCase().includes("comida")) {
      setSuggestedCategory("Alimentación")
    } else if (value.toLowerCase().includes("combustible") || value.toLowerCase().includes("uber")) {
      setSuggestedCategory("Transporte")
    } else if (value.toLowerCase().includes("cine") || value.toLowerCase().includes("restaurant")) {
      setSuggestedCategory("Entretenimiento")
    } else {
      setSuggestedCategory(null)
    }
  }

  return (
    <Card className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-neutral-100">Nueva Transacción</CardTitle>
        <CardDescription>Registra un nuevo ingreso o gasto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Transacción</Label>
          <RadioGroup value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="income" id="income" />
              <Label htmlFor="income" className="text-green-600">
                Ingreso
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expense" id="expense" />
              <Label htmlFor="expense" className="text-red-600">
                Gasto
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Monto</Label>
          <Input id="amount" type="number" placeholder="0.00" className="text-lg font-semibold" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Describe la transacción..."
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          {suggestedCategory && (
            <div className="flex items-center space-x-2 p-2 bg-violet-50 dark:bg-violet-950/30 rounded-md">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-violet-700 dark:text-violet-300">
                Categoría sugerida: <strong>{suggestedCategory}</strong>
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select defaultValue={suggestedCategory || undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories[type].map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Moneda</Label>
          <Select defaultValue="ARS">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ARS">ARS (Peso Argentino)</SelectItem>
              <SelectItem value="USD">USD (Dólar)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">Guardar Transacción</Button>
      </CardContent>
    </Card>
  )
}
