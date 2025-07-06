import { Module } from '@nestjs/common';
import { IBudgetRepository } from './domain/budget.repository';
import { PrismaBudgetRepository } from './infrastructure/prisma-budget.repository';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { CreateBudgetUseCase } from './application/create-budget.use-case';
import { GetBudgetsUseCase } from './application/get-budgets.use-case';
import { UpdateBudgetUseCase } from './application/update-budget.use-case';
import { DeleteBudgetUseCase } from './application/delete-budget.use-case';
import { GetBudgetProgressUseCase } from './application/get-budget-progress.use-case';
import { BudgetsController } from './controller/budgets.controller';

@Module({
  controllers: [BudgetsController],
  providers: [
    PrismaService,
    {
      provide: IBudgetRepository,
      useClass: PrismaBudgetRepository,
    },
    CreateBudgetUseCase,
    GetBudgetsUseCase,
    UpdateBudgetUseCase,
    DeleteBudgetUseCase,
    GetBudgetProgressUseCase,
  ],
  exports: [
    IBudgetRepository,
    CreateBudgetUseCase,
    GetBudgetsUseCase,
    UpdateBudgetUseCase,
    DeleteBudgetUseCase,
    GetBudgetProgressUseCase,
  ],
})
export class BudgetsModule { } 