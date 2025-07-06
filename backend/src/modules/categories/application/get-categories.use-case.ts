import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository, Category } from '../domain/category.repository';
import { PaginationDto } from '../../../shared/domain/dto.interface';
import { PaginatedResult } from '../../../shared/domain/pagination.interface';

export interface GetCategoriesRequest {
  userId: string;
  pagination?: PaginationDto;
}

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(request: GetCategoriesRequest): Promise<PaginatedResult<Category>> {
    const pagination = request.pagination
      ? {
        page: request.pagination.page || 1,
        limit: request.pagination.limit || 10,
      }
      : undefined;
    return this.categoryRepository.findAllByUser(request.userId, pagination);
  }
} 