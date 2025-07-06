import { Module } from '@nestjs/common';
import { ITransactionRepository } from './domain/transaction.repository';
import { PrismaTransactionRepository } from './infrastructure/prisma-transaction.repository';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { CreateTransactionUseCase } from './application/create-transaction.use-case';
import { GetTransactionsUseCase } from './application/get-transactions.use-case';
import { UpdateTransactionUseCase } from './application/update-transaction.use-case';
import { DeleteTransactionUseCase } from './application/delete-transaction.use-case';
import { GetFinancialSummaryUseCase } from './application/get-financial-summary.use-case';
import { GetTransactionsByCategoryUseCase } from './application/get-transactions-by-category.use-case';
import { GetMonthlyTrendUseCase } from './application/get-monthly-trend.use-case';
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
    GetFinancialSummaryUseCase,
    GetTransactionsByCategoryUseCase,
    GetMonthlyTrendUseCase,
  ],
  exports: [
    ITransactionRepository,
    CreateTransactionUseCase,
    GetTransactionsUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
    GetFinancialSummaryUseCase,
    GetTransactionsByCategoryUseCase,
    GetMonthlyTrendUseCase,
  ],
})
export class TransactionsModule { } 