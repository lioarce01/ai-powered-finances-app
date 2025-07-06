import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateTransactionUseCase, CreateTransactionRequest } from '../application/create-transaction.use-case';
import { GetTransactionsUseCase, GetTransactionsRequest } from '../application/get-transactions.use-case';
import { UpdateTransactionUseCase, UpdateTransactionRequest } from '../application/update-transaction.use-case';
import { DeleteTransactionUseCase, DeleteTransactionRequest } from '../application/delete-transaction.use-case';
import { GetFinancialSummaryUseCase, GetFinancialSummaryRequest } from '../application/get-financial-summary.use-case';
import { GetTransactionsByCategoryUseCase, GetTransactionsByCategoryRequest } from '../application/get-transactions-by-category.use-case';
import { GetMonthlyTrendUseCase, GetMonthlyTrendRequest } from '../application/get-monthly-trend.use-case';
import { Transaction, FinancialSummary, CategorySummary, MonthlyTrend } from '../domain/transaction.repository';
import { PaginatedResult } from '../../../shared/domain/pagination.interface';
import { JwtAuthGuard } from '../../../shared/infrastructure/jwt-auth.guard';
import { CurrentUser, CurrentUser as CurrentUserType } from '../../../shared/infrastructure/current-user.decorator';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionFiltersDto,
  PaginationDto
} from '../../../shared/domain/dto.interface';
import { TransactionResponse, PaginatedResponse } from '../../../shared/domain/response.entities';

@ApiTags('Transacciones')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionsUseCase: GetTransactionsUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    private readonly getFinancialSummaryUseCase: GetFinancialSummaryUseCase,
    private readonly getTransactionsByCategoryUseCase: GetTransactionsByCategoryUseCase,
    private readonly getMonthlyTrendUseCase: GetMonthlyTrendUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva transacción' })
  @ApiResponse({
    status: 201,
    description: 'Transacción creada exitosamente',
    type: TransactionResponse
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<Transaction> {
    const request: CreateTransactionRequest = {
      ...createTransactionDto,
      userId: user.userId,
    };

    return this.createTransactionUseCase.execute(request);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las transacciones del usuario' })
  @ApiQuery({ name: 'dateFrom', required: false, description: 'Fecha de inicio (ISO string)' })
  @ApiQuery({ name: 'dateTo', required: false, description: 'Fecha de fin (ISO string)' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'ID de la categoría' })
  @ApiQuery({ name: 'type', required: false, enum: ['income', 'expense'], description: 'Tipo de transacción' })
  @ApiQuery({ name: 'amountMin', required: false, description: 'Monto mínimo' })
  @ApiQuery({ name: 'amountMax', required: false, description: 'Monto máximo' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página', example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Lista de transacciones paginada',
    type: PaginatedResponse<TransactionResponse>
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll(
    @Query() filters: TransactionFiltersDto,
    @Query() pagination: PaginationDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<PaginatedResult<Transaction>> {
    const request: GetTransactionsRequest = {
      userId: user.userId,
      filters: filters.dateFrom || filters.dateTo || filters.categoryId || filters.type || filters.amountMin || filters.amountMax ? {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        categoryId: filters.categoryId,
        type: filters.type,
        amountMin: filters.amountMin,
        amountMax: filters.amountMax,
      } : undefined,
      pagination: pagination.page || pagination.limit ? {
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      } : undefined,
    };

    return this.getTransactionsUseCase.execute(request);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener resumen financiero del mes' })
  @ApiQuery({ name: 'month', required: true, description: 'Mes en formato YYYY-MM', example: '2024-01' })
  @ApiResponse({
    status: 200,
    description: 'Resumen financiero del mes',
    schema: {
      type: 'object',
      properties: {
        totalIncome: { type: 'number' },
        totalExpenses: { type: 'number' },
        balance: { type: 'number' },
        savingsRate: { type: 'number' },
        currency: { type: 'string', enum: ['ARS', 'USD'] },
      },
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getFinancialSummary(
    @Query('month') month: string,
    @CurrentUser() user: CurrentUserType,
  ): Promise<FinancialSummary> {
    const request: GetFinancialSummaryRequest = {
      userId: user.userId,
      month,
    };

    return this.getFinancialSummaryUseCase.execute(request);
  }

  @Get('by-category')
  @ApiOperation({ summary: 'Obtener transacciones agrupadas por categoría' })
  @ApiQuery({ name: 'month', required: true, description: 'Mes en formato YYYY-MM', example: '2024-01' })
  @ApiResponse({
    status: 200,
    description: 'Transacciones agrupadas por categoría',
    isArray: true,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          categoryId: { type: 'string' },
          categoryName: { type: 'string' },
          categoryColor: { type: 'string' },
          categoryIcon: { type: 'string' },
          totalAmount: { type: 'number' },
          transactionCount: { type: 'number' },
          type: { type: 'string', enum: ['income', 'expense'] },
        },
      },
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getTransactionsByCategory(
    @Query('month') month: string,
    @CurrentUser() user: CurrentUserType,
  ): Promise<CategorySummary[]> {
    const request: GetTransactionsByCategoryRequest = {
      userId: user.userId,
      month,
    };

    return this.getTransactionsByCategoryUseCase.execute(request);
  }

  @Get('monthly-trend')
  @ApiOperation({ summary: 'Obtener tendencia mensual del año' })
  @ApiQuery({ name: 'year', required: true, description: 'Año en formato YYYY', example: '2024' })
  @ApiResponse({
    status: 200,
    description: 'Tendencia mensual del año',
    isArray: true,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          month: { type: 'string' },
          income: { type: 'number' },
          expenses: { type: 'number' },
          savings: { type: 'number' },
          currency: { type: 'string', enum: ['ARS', 'USD'] },
        },
      },
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getMonthlyTrend(
    @Query('year') year: string,
    @CurrentUser() user: CurrentUserType,
  ): Promise<MonthlyTrend[]> {
    const request: GetMonthlyTrendRequest = {
      userId: user.userId,
      year,
    };

    return this.getMonthlyTrendUseCase.execute(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una transacción por ID' })
  @ApiParam({ name: 'id', description: 'ID de la transacción' })
  @ApiResponse({
    status: 200,
    description: 'Transacción encontrada',
    type: TransactionResponse
  })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string): Promise<Transaction> {
    // TODO: Implementar método findById en el caso de uso
    throw new Error('Not implemented');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una transacción' })
  @ApiParam({ name: 'id', description: 'ID de la transacción' })
  @ApiResponse({
    status: 200,
    description: 'Transacción actualizada exitosamente',
    type: TransactionResponse
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const request: UpdateTransactionRequest = {
      id,
      ...updateTransactionDto,
    };

    return this.updateTransactionUseCase.execute(request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una transacción' })
  @ApiParam({ name: 'id', description: 'ID de la transacción' })
  @ApiResponse({ status: 200, description: 'Transacción eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('id') id: string): Promise<void> {
    const request: DeleteTransactionRequest = { id };
    return this.deleteTransactionUseCase.execute(request);
  }
} 