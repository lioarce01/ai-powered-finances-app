import { Injectable } from '@nestjs/common';
import { ITransactionRepository, MonthlyTrend } from '../domain/transaction.repository';

export interface GetMonthlyTrendRequest {
  userId: string;
  year: string; // YYYY format
}

@Injectable()
export class GetMonthlyTrendUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) { }

  async execute(request: GetMonthlyTrendRequest): Promise<MonthlyTrend[]> {
    return this.transactionRepository.getMonthlyTrend(request.userId, request.year);
  }
} 