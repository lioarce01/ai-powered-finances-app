import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository, Category } from '../domain/category.repository';
import { UpdateCategoryDto } from '../../../shared/domain/dto.interface';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface UpdateCategoryRequest extends UpdateCategoryDto {
  id: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(request: UpdateCategoryRequest): Promise<Category> {
    if (!request.id) {
      throw new ValidationException('ID requerido');
    }
    return this.categoryRepository.update(request.id, request);
  }
} 