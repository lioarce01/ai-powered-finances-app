import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository } from '../domain/transaction.repository';
import { ValidationException } from '../../../shared/domain/exceptions';

export interface DeleteTransactionRequest {
  id: string;
}

@Injectable()
export class DeleteTransactionUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(request: DeleteTransactionRequest): Promise<void> {
    if (!request.id) {
      throw new ValidationException('ID requerido');
    }
    return this.transactionRepository.delete(request.id);
  }
} 