import { Injectable } from '@nestjs/common';
import { ITransactionRepository, CategorySummary } from '../domain/transaction.repository';

export interface GetTransactionsByCategoryRequest {
  userId: string;
  month: string; // YYYY-MM format
}

@Injectable()
export class GetTransactionsByCategoryUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) { }

  async execute(request: GetTransactionsByCategoryRequest): Promise<CategorySummary[]> {
    return this.transactionRepository.getTransactionsByCategory(request.userId, request.month);
  }
} 