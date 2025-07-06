"use client"

import { useState } from "react"
import type {
  Transaction,
  Budget,
  Category,
  FinancialSummary,
  CreateTransactionDto,
  CreateCategoryDto,
  CreateBudgetDto
} from "@/types/finance"

// Mock data hooks for the finance app
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-01-15T10:30:00.000Z",
      description: "Supermercado Coto",
      categoryId: "1",
      amount: 85.5,
      type: "expense",
      currency: "ARS",
      userId: "user-1",
    },
    {
      id: "2",
      date: "2024-01-15T14:20:00.000Z",
      description: "Freelance proyecto web",
      categoryId: "5",
      amount: 1200.0,
      type: "income",
      currency: "USD",
      userId: "user-1",
    },
    {
      id: "3",
      date: "2024-01-14T08:15:00.000Z",
      description: "Combustible YPF",
      categoryId: "2",
      amount: 45.0,
      type: "expense",
      currency: "ARS",
      userId: "user-1",
    },
    {
      id: "4",
      date: "2024-01-13T20:00:00.000Z",
      description: "Cine y cena",
      categoryId: "3",
      amount: 120.0,
      type: "expense",
      currency: "ARS",
      userId: "user-1",
    },
    {
      id: "5",
      date: "2024-01-12T09:00:00.000Z",
      description: "Salario mensual",
      categoryId: "4",
      amount: 8500.0,
      type: "income",
      currency: "ARS",
      userId: "user-1",
    },
  ])

  const addTransaction = (transaction: CreateTransactionDto) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      userId: "user-1",
    }
    setTransactions((prev: Transaction[]) => [newTransaction, ...prev])
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev: Transaction[]) => prev.map((t: Transaction) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev: Transaction[]) => prev.filter((t: Transaction) => t.id !== id))
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "1",
      categoryId: "1",
      amount: 1200,
      month: "2024-01",
      currency: "ARS",
      userId: "user-1",
    },
    {
      id: "2",
      categoryId: "2",
      amount: 400,
      month: "2024-01",
      currency: "ARS",
      userId: "user-1",
    },
    {
      id: "3",
      categoryId: "3",
      amount: 300,
      month: "2024-01",
      currency: "ARS",
      userId: "user-1",
    },
  ])

  const addBudget = (budget: CreateBudgetDto) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
      userId: "user-1",
    }
    setBudgets((prev: Budget[]) => [...prev, newBudget])
  }

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets((prev: Budget[]) => prev.map((b: Budget) => (b.id === id ? { ...b, ...updates } : b)))
  }

  const deleteBudget = (id: string) => {
    setBudgets((prev: Budget[]) => prev.filter((b: Budget) => b.id !== id))
  }

  return {
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
  }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Alimentación",
      type: "expense",
      color: "#ef4444",
      icon: "🍕",
      userId: "user-1"
    },
    {
      id: "2",
      name: "Transporte",
      type: "expense",
      color: "#f97316",
      icon: "🚗",
      userId: "user-1"
    },
    {
      id: "3",
      name: "Entretenimiento",
      type: "expense",
      color: "#eab308",
      icon: "🎮",
      userId: "user-1"
    },
    {
      id: "4",
      name: "Sueldo",
      type: "income",
      color: "#22c55e",
      icon: "💰",
      userId: "user-1"
    },
    {
      id: "5",
      name: "Freelance",
      type: "income",
      color: "#3b82f6",
      icon: "💼",
      userId: "user-1"
    },
  ])

  const addCategory = (category: CreateCategoryDto) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      userId: "user-1",
    }
    setCategories((prev: Category[]) => [...prev, newCategory])
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev: Category[]) => prev.map((c: Category) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const deleteCategory = (id: string) => {
    setCategories((prev: Category[]) => prev.filter((c: Category) => c.id !== id))
  }

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}

export function useFinancialSummary(): FinancialSummary {
  return {
    balance: 15420.5,
    monthlyIncome: 8500.0,
    monthlyExpenses: 6200.0,
    savingsRate: 27.1,
    currency: "ARS",
  }
}
