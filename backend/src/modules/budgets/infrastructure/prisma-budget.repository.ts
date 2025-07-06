import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { IBudgetRepository, BudgetProgress } from '../domain/budget.repository';
import { Budget } from '../domain/budget.repository';
import { CreateBudgetDto, UpdateBudgetDto } from '../../../shared/domain/dto.interface';
import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';

@Injectable()
export class PrismaBudgetRepository implements IBudgetRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Budget | null> {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
    });

    return budget ? this.mapToDomain(budget) : null;
  }

  async findAllByUser(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Budget>> {
    const where = { userId };

    // Configurar paginación
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    // Obtener total de registros
    const total = await this.prisma.budget.count({ where });

    // Obtener datos paginados
    const budgets = await this.prisma.budget.findMany({
      where,
      skip,
      take: limit,
      orderBy: { month: 'desc' },
      include: {
        category: true,
      },
    });

    return {
      data: budgets.map(this.mapToDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: CreateBudgetDto & { userId: string }): Promise<Budget> {
    const budget = await this.prisma.budget.create({
      data: {
        categoryId: data.categoryId,
        amount: data.amount,
        month: data.month,
        currency: data.currency,
        userId: data.userId,
      },
      include: {
        category: true,
      },
    });

    return this.mapToDomain(budget);
  }

  async update(id: string, data: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.prisma.budget.update({
      where: { id },
      data: {
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.month !== undefined && { month: data.month }),
        ...(data.currency !== undefined && { currency: data.currency }),
      },
      include: {
        category: true,
      },
    });

    return this.mapToDomain(budget);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.budget.delete({
      where: { id },
    });
  }

  async getBudgetProgress(userId: string, month: string): Promise<BudgetProgress[]> {
    // Parse month (YYYY-MM) to get start and end dates
    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0, 23, 59, 59, 999);

    // Get all budgets for the user in the specified month
    const budgets = await this.prisma.budget.findMany({
      where: {
        userId,
        month,
      },
      include: {
        category: true,
      },
    });

    // Get spent amounts for each budget category
    const budgetProgress: BudgetProgress[] = [];

    for (const budget of budgets) {
      // Calculate spent amount for this category in the month
      const spentResult = await this.prisma.transaction.aggregate({
        where: {
          userId,
          categoryId: budget.categoryId,
          type: 'expense',
          date: { gte: startDate, lte: endDate },
          currency: budget.currency,
        },
        _sum: { amount: true },
      });

      const spent = spentResult._sum.amount || 0;
      const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

      // Calculate trend (simplified - could be enhanced with previous month comparison)
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (percentage > 80) trend = 'up';
      else if (percentage < 50) trend = 'down';

      budgetProgress.push({
        budgetId: budget.id,
        categoryId: budget.categoryId,
        categoryName: (budget.category as any)?.name || 'Unknown',
        categoryColor: (budget.category as any)?.color || '#6b7280',
        categoryIcon: (budget.category as any)?.icon,
        limit: budget.amount,
        spent,
        percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
        currency: budget.currency,
        trend,
      });
    }

    return budgetProgress;
  }

  private mapToDomain(prismaBudget: any): Budget {
    return {
      id: prismaBudget.id,
      categoryId: prismaBudget.categoryId,
      amount: prismaBudget.amount,
      month: prismaBudget.month,
      currency: prismaBudget.currency,
      userId: prismaBudget.userId,
    };
  }
} 