import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository, Transaction } from '../domain/transaction.repository';
import { UpdateTransactionDto } from '../../../shared/domain/dto.interface';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface UpdateTransactionRequest extends UpdateTransactionDto {
  id: string;
}

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(request: UpdateTransactionRequest): Promise<Transaction> {
    if (!request.id) {
      throw new ValidationException('ID requerido');
    }
    const { id, date, ...rest } = request;
    const updateData: any = { ...rest };
    if (date) {
      updateData.date = new Date(date);
    }
    return this.transactionRepository.update(id, updateData);
  }
} 