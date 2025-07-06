import { Injectable } from '@nestjs/common';
import { IBudgetRepository, BudgetProgress } from '../domain/budget.repository';

export interface GetBudgetProgressRequest {
  userId: string;
  month: string; // YYYY-MM format
}

@Injectable()
export class GetBudgetProgressUseCase {
  constructor(private readonly budgetRepository: IBudgetRepository) { }

  async execute(request: GetBudgetProgressRequest): Promise<BudgetProgress[]> {
    return this.budgetRepository.getBudgetProgress(request.userId, request.month);
  }
} 