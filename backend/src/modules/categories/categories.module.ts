import { Module } from '@nestjs/common';
import { ICategoryRepository } from './domain/category.repository';
import { PrismaCategoryRepository } from './infrastructure/prisma-category.repository';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { CreateCategoryUseCase } from './application/create-category.use-case';
import { GetCategoriesUseCase } from './application/get-categories.use-case';
import { UpdateCategoryUseCase } from './application/update-category.use-case';
import { DeleteCategoryUseCase } from './application/delete-category.use-case';
import { CategoriesController } from './controller/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [
    PrismaService,
    {
      provide: ICategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    CreateCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  exports: [ICategoryRepository, CreateCategoryUseCase, GetCategoriesUseCase, UpdateCategoryUseCase, DeleteCategoryUseCase],
})
export class CategoriesModule { } 