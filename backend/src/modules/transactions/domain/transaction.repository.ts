import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFiltersDto } from '../../../shared/domain/dto.interface';

export const ITransactionRepository = Symbol('ITransactionRepository');

export interface ITransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  findAllByUser(userId: string, filters?: TransactionFiltersDto, pagination?: PaginationOptions): Promise<PaginatedResult<Transaction>>;
  create(data: Omit<CreateTransactionDto, 'date'> & { userId: string; date: Date }): Promise<Transaction>;
  update(id: string, data: Omit<UpdateTransactionDto, 'date'> & { date?: Date }): Promise<Transaction>;
  delete(id: string): Promise<void>;

  // Aggregation methods
  getFinancialSummary(userId: string, month: string): Promise<FinancialSummary>;
  getTransactionsByCategory(userId: string, month: string): Promise<CategorySummary[]>;
  getMonthlyTrend(userId: string, year: string): Promise<MonthlyTrend[]>;
}

export interface TransactionFilters {
  dateFrom?: Date;
  dateTo?: Date;
  categoryId?: string;
  type?: 'income' | 'expense';
  amountMin?: number;
  amountMax?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  categoryId: string;
  description: string;
  date: Date;
  type: 'income' | 'expense';
  currency: 'ARS' | 'USD';
  userId: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
  currency: 'ARS' | 'USD';
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon?: string;
  totalAmount: number;
  transactionCount: number;
  type: 'income' | 'expense';
}

export interface MonthlyTrend {
  month: string; // YYYY-MM
  income: number;
  expenses: number;
  savings: number;
  currency: 'ARS' | 'USD';
} 