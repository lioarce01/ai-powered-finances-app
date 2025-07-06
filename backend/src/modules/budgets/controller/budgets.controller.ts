import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateBudgetUseCase, CreateBudgetRequest } from '../application/create-budget.use-case';
import { GetBudgetsUseCase, GetBudgetsRequest } from '../application/get-budgets.use-case';
import { UpdateBudgetUseCase, UpdateBudgetRequest } from '../application/update-budget.use-case';
import { DeleteBudgetUseCase, DeleteBudgetRequest } from '../application/delete-budget.use-case';
import { GetBudgetProgressUseCase, GetBudgetProgressRequest } from '../application/get-budget-progress.use-case';
import { Budget, BudgetProgress } from '../domain/budget.repository';
import { PaginatedResult } from '../../../shared/domain/pagination.interface';
import { JwtAuthGuard } from '../../../shared/infrastructure/jwt-auth.guard';
import { CurrentUser, CurrentUser as CurrentUserType } from '../../../shared/infrastructure/current-user.decorator';
import {
  CreateBudgetDto,
  UpdateBudgetDto,
  PaginationDto
} from '../../../shared/domain/dto.interface';
import { BudgetResponse, PaginatedResponse } from '../../../shared/domain/response.entities';

@ApiTags('Presupuestos')
@ApiBearerAuth()
@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetsController {
  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly getBudgetsUseCase: GetBudgetsUseCase,
    private readonly updateBudgetUseCase: UpdateBudgetUseCase,
    private readonly deleteBudgetUseCase: DeleteBudgetUseCase,
    private readonly getBudgetProgressUseCase: GetBudgetProgressUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo presupuesto' })
  @ApiResponse({
    status: 201,
    description: 'Presupuesto creado exitosamente',
    type: BudgetResponse
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(
    @Body() createBudgetDto: CreateBudgetDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<Budget> {
    const request: CreateBudgetRequest = {
      ...createBudgetDto,
      userId: user.userId,
    };

    return this.createBudgetUseCase.execute(request);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los presupuestos del usuario' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página', example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Lista de presupuestos paginada',
    type: PaginatedResponse<BudgetResponse>
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll(
    @Query() pagination: PaginationDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<PaginatedResult<Budget>> {
    const request: GetBudgetsRequest = {
      userId: user.userId,
      pagination: pagination.page || pagination.limit ? {
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      } : undefined,
    };

    return this.getBudgetsUseCase.execute(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un presupuesto por ID' })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto encontrado',
    type: BudgetResponse
  })
  @ApiResponse({ status: 404, description: 'Presupuesto no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string): Promise<Budget> {
    // TODO: Implementar método findById en el caso de uso
    throw new Error('Not implemented');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un presupuesto' })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto actualizado exitosamente',
    type: BudgetResponse
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Presupuesto no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async update(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    const request: UpdateBudgetRequest = {
      id,
      ...updateBudgetDto,
    };

    return this.updateBudgetUseCase.execute(request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un presupuesto' })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiResponse({ status: 200, description: 'Presupuesto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Presupuesto no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('id') id: string): Promise<void> {
    const request: DeleteBudgetRequest = { id };
    return this.deleteBudgetUseCase.execute(request);
  }

  @Get('progress')
  @ApiOperation({ summary: 'Obtener progreso de presupuestos del mes' })
  @ApiQuery({ name: 'month', required: true, description: 'Mes en formato YYYY-MM', example: '2024-01' })
  @ApiResponse({
    status: 200,
    description: 'Progreso de presupuestos del mes',
    isArray: true,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          budgetId: { type: 'string' },
          categoryId: { type: 'string' },
          categoryName: { type: 'string' },
          categoryColor: { type: 'string' },
          categoryIcon: { type: 'string' },
          limit: { type: 'number' },
          spent: { type: 'number' },
          percentage: { type: 'number' },
          currency: { type: 'string', enum: ['ARS', 'USD'] },
          trend: { type: 'string', enum: ['up', 'down', 'stable'] },
        },
      },
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getBudgetProgress(
    @Query('month') month: string,
    @CurrentUser() user: CurrentUserType,
  ): Promise<BudgetProgress[]> {
    const request: GetBudgetProgressRequest = {
      userId: user.userId,
      month,
    };
    return this.getBudgetProgressUseCase.execute(request);
  }
} 