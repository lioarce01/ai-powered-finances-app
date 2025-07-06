import { Injectable, Inject } from '@nestjs/common';
import { IBudgetRepository } from '../domain/budget.repository';
import { BudgetNotFoundException } from '../../../shared/domain/exceptions';

export interface DeleteBudgetRequest {
  id: string;
}

@Injectable()
export class DeleteBudgetUseCase {
  constructor(
    @Inject(IBudgetRepository)
    private readonly budgetRepository: IBudgetRepository,
  ) { }

  async execute(request: DeleteBudgetRequest): Promise<void> {
    // Verificar que el presupuesto existe
    const existingBudget = await this.budgetRepository.findById(request.id);
    if (!existingBudget) {
      throw new BudgetNotFoundException(request.id);
    }

    await this.budgetRepository.delete(request.id);
  }
} 