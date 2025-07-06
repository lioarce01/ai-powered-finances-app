import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository, Transaction } from '../domain/transaction.repository';
import { TransactionFiltersDto, PaginationDto } from '../../../shared/domain/dto.interface';
import { PaginatedResult } from '../../../shared/domain/pagination.interface';

export interface GetTransactionsRequest {
  userId: string;
  filters?: TransactionFiltersDto;
  pagination?: PaginationDto;
}

@Injectable()
export class GetTransactionsUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(request: GetTransactionsRequest): Promise<PaginatedResult<Transaction>> {
    const pagination = request.pagination
      ? {
        page: request.pagination.page || 1,
        limit: request.pagination.limit || 10,
      }
      : undefined;
    return this.transactionRepository.findAllByUser(request.userId, request.filters, pagination);
  }
} 