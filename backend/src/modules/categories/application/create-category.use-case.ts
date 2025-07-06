import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository, Category } from '../domain/category.repository';
import { CreateCategoryDto } from '../../../shared/domain/dto.interface';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface CreateCategoryRequest extends CreateCategoryDto {
  userId: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(request: CreateCategoryRequest): Promise<Category> {
    if (!request.name || !request.type || !request.color) {
      throw new ValidationException('Faltan campos obligatorios');
    }
    return this.categoryRepository.create(request);
  }
} 