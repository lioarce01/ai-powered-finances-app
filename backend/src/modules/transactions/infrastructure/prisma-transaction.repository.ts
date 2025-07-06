import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../domain/transaction.repository';
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