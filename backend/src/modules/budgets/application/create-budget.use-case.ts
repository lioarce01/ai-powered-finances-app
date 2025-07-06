import { Injectable, Inject } from '@nestjs/common';
import { IBudgetRepository, Budget } from '../domain/budget.repository';
import { CreateBudgetDto } from '../../../shared/domain/dto.interface';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface CreateBudgetRequest extends CreateBudgetDto {
  userId: string;
}

@Injectable()
export class CreateBudgetUseCase {
  constructor(
    @Inject(IBudgetRepository)
    private readonly budgetRepository: IBudgetRepository,
  ) { }

  async execute(request: CreateBudgetRequest): Promise<Budget> {
    if (!request.categoryId || !request.amount || !request.month || !request.currency) {
      throw new ValidationException('Faltan campos obligatorios');
    }
    return this.budgetRepository.create(request);
  }
} 