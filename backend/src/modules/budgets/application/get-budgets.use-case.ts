import { Injectable, Inject } from '@nestjs/common';
import { IBudgetRepository } from '../domain/budget.repository';
import { Budget } from '../domain/budget.repository';
import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';

export interface GetBudgetsRequest {
  userId: string;
  pagination?: {
    page: number;
    limit: number;
  };
}

@Injectable()
export class GetBudgetsUseCase {
  constructor(
    @Inject(IBudgetRepository)
    private readonly budgetRepository: IBudgetRepository,
  ) { }

  async execute(request: GetBudgetsRequest): Promise<PaginatedResult<Budget>> {
    const pagination: PaginationOptions | undefined = request.pagination ? {
      page: request.pagination.page,
      limit: request.pagination.limit,
    } : undefined;

    return this.budgetRepository.findAllByUser(request.userId, pagination);
  }
} 