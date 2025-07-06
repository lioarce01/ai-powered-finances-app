import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateTransactionUseCase, CreateTransactionRequest } from '../application/create-transaction.use-case';
import { GetTransactionsUseCase, GetTransactionsRequest } from '../application/get-transactions.use-case';
import { UpdateTransactionUseCase, UpdateTransactionRequest } from '../application/update-transaction.use-case';
import { DeleteTransactionUseCase, DeleteTransactionRequest } from '../application/delete-transaction.use-case';
import { Transaction } from '../domain/transaction.repository';
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