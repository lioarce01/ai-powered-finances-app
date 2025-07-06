import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';
import { CreateBudgetDto, UpdateBudgetDto } from '../../../shared/domain/dto.interface';

export const IBudgetRepository = Symbol('IBudgetRepository');

export interface IBudgetRepository {
  findById(id: string): Promise<Budget | null>;
  findAllByUser(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Budget>>;
  create(data: CreateBudgetDto & { userId: string }): Promise<Budget>;
  update(id: string, data: UpdateBudgetDto): Promise<Budget>;
  delete(id: string): Promise<void>;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  month: string;
  currency: 'ARS' | 'USD';
  userId: string;
} 