import { Injectable } from '@nestjs/common';
import { ITransactionRepository, FinancialSummary } from '../domain/transaction.repository';

export interface GetFinancialSummaryRequest {
  userId: string;
  month: string; // YYYY-MM format
}

@Injectable()
export class GetFinancialSummaryUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) { }

  async execute(request: GetFinancialSummaryRequest): Promise<FinancialSummary> {
    return this.transactionRepository.getFinancialSummary(request.userId, request.month);
  }
} 