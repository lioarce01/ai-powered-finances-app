import { Injectable, Inject } from '@nestjs/common';
import { IBudgetRepository, Budget } from '../domain/budget.repository';
import { UpdateBudgetDto } from '../../../shared/domain/dto.interface';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface UpdateBudgetRequest extends UpdateBudgetDto {
  id: string;
}

@Injectable()
export class UpdateBudgetUseCase {
  constructor(
    @Inject(IBudgetRepository)
    private readonly budgetRepository: IBudgetRepository,
  ) { }

  async execute(request: UpdateBudgetRequest): Promise<Budget> {
    if (!request.id) {
      throw new ValidationException('ID requerido');
    }
    return this.budgetRepository.update(request.id, request);
  }
} 