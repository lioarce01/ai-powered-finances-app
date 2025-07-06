import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFiltersDto } from '../../../shared/domain/dto.interface';

export const ITransactionRepository = Symbol('ITransactionRepository');

export interface ITransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  findAllByUser(userId: string, filters?: TransactionFiltersDto, pagination?: PaginationOptions): Promise<PaginatedResult<Transaction>>;
  create(data: Omit<CreateTransactionDto, 'date'> & { userId: string; date: Date }): Promise<Transaction>;
  update(id: string, data: Omit<UpdateTransactionDto, 'date'> & { date?: Date }): Promise<Transaction>;
  delete(id: string): Promise<void>;
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