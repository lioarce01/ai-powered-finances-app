import { Injectable } from '@nestjs/common';
import { ITransactionRepository, FinancialSummary, CategorySummary, MonthlyTrend } from '../domain/transaction.repository';
import { Transaction } from '../domain/transaction.repository';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFiltersDto } from '../../../shared/domain/dto.interface';
import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';

@Injectable()
export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    return transaction ? this.mapToDomain(transaction) : null;
  }

  async findAllByUser(userId: string, filters?: TransactionFiltersDto, pagination?: PaginationOptions): Promise<PaginatedResult<Transaction>> {
    const where: any = { userId };

    // Aplicar filtros
    if (filters) {
      if (filters.dateFrom || filters.dateTo) {
        where.date = {};
        if (filters.dateFrom) where.date.gte = new Date(filters.dateFrom);
        if (filters.dateTo) where.date.lte = new Date(filters.dateTo);
      }
      if (filters.categoryId) where.categoryId = filters.categoryId;
      if (filters.type) where.type = filters.type;
      if (filters.amountMin || filters.amountMax) {
        where.amount = {};
        if (filters.amountMin) where.amount.gte = filters.amountMin;
        if (filters.amountMax) where.amount.lte = filters.amountMax;
      }
    }

    // Configurar paginación
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    // Obtener total de registros
    const total = await this.prisma.transaction.count({ where });

    // Obtener datos paginados
    const transactions = await this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        category: true,
      },
    });

    return {
      data: transactions.map(this.mapToDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: Omit<CreateTransactionDto, 'date'> & { userId: string; date: Date }): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount: data.amount,
        description: data.description,
        date: data.date,
        type: data.type,
        currency: data.currency,
        userId: data.userId,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
      },
    });

    return this.mapToDomain(transaction);
  }

  async update(id: string, data: Omit<UpdateTransactionDto, 'date'> & { date?: Date }): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: {
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.currency !== undefined && { currency: data.currency }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
      },
      include: {
        category: true,
      },
    });

    return this.mapToDomain(transaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }

  async getFinancialSummary(userId: string, month: string): Promise<FinancialSummary> {
    // Parse month (YYYY-MM) to get start and end dates
    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0, 23, 59, 59, 999);

    // Get user's currency preference
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { currency: true },
    });

    const currency = user?.currency || 'ARS';

    // Get income and expenses for the month
    const [incomeResult, expenseResult] = await Promise.all([
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: 'income',
          date: { gte: startDate, lte: endDate },
          currency,
        },
        _sum: { amount: true },
      }),
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: 'expense',
          date: { gte: startDate, lte: endDate },
          currency,
        },
        _sum: { amount: true },
      }),
    ]);

    const totalIncome = incomeResult._sum.amount || 0;
    const totalExpenses = expenseResult._sum.amount || 0;
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      balance,
      savingsRate: Math.round(savingsRate * 100) / 100, // Round to 2 decimal places
      currency,
    };
  }

  async getTransactionsByCategory(userId: string, month: string): Promise<CategorySummary[]> {
    // Parse month (YYYY-MM) to get start and end dates
    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0, 23, 59, 59, 999);

    const results = await this.prisma.transaction.groupBy({
      by: ['categoryId', 'type'],
      where: {
        userId,
        date: { gte: startDate, lte: endDate },
      },
      _sum: { amount: true },
      _count: { id: true },
    });

    // Get category details for all categoryIds
    const categoryIds = [...new Set(results.map(r => r.categoryId))];
    const categories = await this.prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true, color: true, icon: true },
    });

    const categoryMap = new Map(categories.map((c: any) => [c.id, c]));

    return results.map(result => {
      const category = categoryMap.get(result.categoryId) as any;
      return {
        categoryId: result.categoryId,
        categoryName: category?.name || 'Unknown',
        categoryColor: category?.color || '#6b7280',
        categoryIcon: category?.icon,
        totalAmount: result._sum.amount || 0,
        transactionCount: result._count.id,
        type: result.type,
      };
    });
  }

  async getMonthlyTrend(userId: string, year: string): Promise<MonthlyTrend[]> {
    // Get user's currency preference
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { currency: true },
    });

    const currency = user?.currency || 'ARS';

    // Get all months in the year with transactions
    const months = await this.prisma.transaction.findMany({
      where: {
        userId,
        currency,
        date: {
          gte: new Date(parseInt(year), 0, 1),
          lt: new Date(parseInt(year) + 1, 0, 1),
        },
      },
      select: {
        date: true,
        type: true,
        amount: true,
      },
    });

    // Group by month and type
    const monthlyData = new Map<string, { income: number; expenses: number }>();

    months.forEach(transaction => {
      const monthKey = `${year}-${String(transaction.date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expenses: 0 });
      }

      const data = monthlyData.get(monthKey)!;
      if (transaction.type === 'income') {
        data.income += transaction.amount;
      } else {
        data.expenses += transaction.amount;
      }
    });

    // Convert to array and calculate savings
    return Array.from(monthlyData.entries()).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      savings: data.income - data.expenses,
      currency,
    })).sort((a, b) => a.month.localeCompare(b.month));
  }

  private mapToDomain(prismaTransaction: any): Transaction {
    return {
      id: prismaTransaction.id,
      amount: prismaTransaction.amount,
      categoryId: prismaTransaction.categoryId,
      description: prismaTransaction.description,
      date: prismaTransaction.date,
      type: prismaTransaction.type,
      currency: prismaTransaction.currency,
      userId: prismaTransaction.userId,
    };
  }
} 