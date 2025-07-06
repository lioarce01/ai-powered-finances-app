import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository, Transaction } from '../domain/transaction.repository';
import { CreateTransactionDto } from '../../../shared/domain/dto.interface';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface CreateTransactionRequest extends CreateTransactionDto {
  userId: string;
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(request: CreateTransactionRequest): Promise<Transaction> {
    if (!request.amount || !request.categoryId || !request.date || !request.type || !request.currency) {
      throw new ValidationException('Faltan campos obligatorios');
    }
    const { date, ...rest } = request;
    return this.transactionRepository.create({
      ...rest,
      date: new Date(date),
    });
  }
} 