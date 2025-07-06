import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';
import { CreateCategoryDto, UpdateCategoryDto } from '../../../shared/domain/dto.interface';

export const ICategoryRepository = Symbol('ICategoryRepository');

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAllByUser(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Category>>;
  create(data: CreateCategoryDto & { userId: string }): Promise<Category>;
  update(id: string, data: UpdateCategoryDto): Promise<Category>;
  delete(id: string): Promise<void>;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon?: string;
  userId: string;
} 