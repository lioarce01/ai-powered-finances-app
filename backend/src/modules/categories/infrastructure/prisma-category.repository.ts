import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { ICategoryRepository } from '../domain/category.repository';
import { Category } from '../domain/category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../../../shared/domain/dto.interface';
import { PaginationOptions, PaginatedResult } from '../../../shared/domain/pagination.interface';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    return category ? this.mapToDomain(category) : null;
  }

  async findAllByUser(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Category>> {
    const where = { userId };

    // Configurar paginación
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    // Obtener total de registros
    const total = await this.prisma.category.count({ where });

    // Obtener datos paginados
    const categories = await this.prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    });

    return {
      data: categories.map(this.mapToDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: CreateCategoryDto & { userId: string }): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        type: data.type,
        color: data.color,
        icon: data.icon,
        userId: data.userId,
      },
    });

    return this.mapToDomain(category);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.color !== undefined && { color: data.color }),
        ...(data.icon !== undefined && { icon: data.icon }),
      },
    });

    return this.mapToDomain(category);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaCategory: any): Category {
    return {
      id: prismaCategory.id,
      name: prismaCategory.name,
      type: prismaCategory.type,
      color: prismaCategory.color,
      icon: prismaCategory.icon,
      userId: prismaCategory.userId,
    };
  }
} 