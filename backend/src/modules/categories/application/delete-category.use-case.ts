import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository } from '../domain/category.repository';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface DeleteCategoryRequest {
  id: string;
}

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(request: DeleteCategoryRequest): Promise<void> {
    if (!request.id) {
      throw new ValidationException('ID requerido');
    }
    return this.categoryRepository.delete(request.id);
  }
} 