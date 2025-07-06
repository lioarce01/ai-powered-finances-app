import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryUseCase, CreateCategoryRequest } from '../application/create-category.use-case';
import { GetCategoriesUseCase, GetCategoriesRequest } from '../application/get-categories.use-case';
import { UpdateCategoryUseCase, UpdateCategoryRequest } from '../application/update-category.use-case';
import { DeleteCategoryUseCase, DeleteCategoryRequest } from '../application/delete-category.use-case';
import { Category } from '../domain/category.repository';
import { PaginatedResult } from '../../../shared/domain/pagination.interface';
import { JwtAuthGuard } from '../../../shared/infrastructure/jwt-auth.guard';
import { CurrentUser, CurrentUser as CurrentUserType } from '../../../shared/infrastructure/current-user.decorator';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  PaginationDto
} from '../../../shared/domain/dto.interface';
import { CategoryResponse, PaginatedResponse } from '../../../shared/domain/response.entities';

@ApiTags('Categorías')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente',
    type: CategoryResponse
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<Category> {
    const request: CreateCategoryRequest = {
      ...createCategoryDto,
      userId: user.userId,
    };

    return this.createCategoryUseCase.execute(request);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías del usuario' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página', example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías paginada',
    type: PaginatedResponse<CategoryResponse>
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll(
    @Query() pagination: PaginationDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<PaginatedResult<Category>> {
    const request: GetCategoriesRequest = {
      userId: user.userId,
      pagination: pagination.page || pagination.limit ? {
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      } : undefined,
    };

    return this.getCategoriesUseCase.execute(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: CategoryResponse
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string): Promise<Category> {
    // TODO: Implementar método findById en el caso de uso
    throw new Error('Not implemented');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente',
    type: CategoryResponse
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const request: UpdateCategoryRequest = {
      id,
      ...updateCategoryDto,
    };

    return this.updateCategoryUseCase.execute(request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('id') id: string): Promise<void> {
    const request: DeleteCategoryRequest = { id };
    return this.deleteCategoryUseCase.execute(request);
  }
} 