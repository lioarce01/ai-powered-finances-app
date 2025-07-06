import { Module } from '@nestjs/common';
import { ITransactionRepository } from './domain/transaction.repository';
import { PrismaTransactionRepository } from './infrastructure/prisma-transaction.repository';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { CreateTransactionUseCase } from './application/create-transaction.use-case';
import { GetTransactionsUseCase } from './application/get-transactions.use-case';
import { UpdateTransactionUseCase } from './application/update-transaction.use-case';
import { DeleteTransactionUseCase } from './application/delete-transaction.use-case';
import { TransactionsController } from './controller/transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    PrismaService,
    {
      provide: ITransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    CreateTransactionUseCase,
    GetTransactionsUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
  ],
  exports: [ITransactionRepository, CreateTransactionUseCase, GetTransactionsUseCase, UpdateTransactionUseCase, DeleteTransactionUseCase],
})
export class TransactionsModule { } 