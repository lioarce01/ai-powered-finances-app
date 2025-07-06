import { ApiProperty } from '@nestjs/swagger';

// DTOs para la capa de presentación (HTTP requests/responses)
export class CreateTransactionDto {
  @ApiProperty({
    description: 'Monto de la transacción',
    example: 1500.50,
    minimum: 0,
  })
  amount: number;

  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  categoryId: string;

  @ApiProperty({
    description: 'Descripción de la transacción',
    example: 'Compra de supermercado',
    maxLength: 255,
  })
  description: string;

  @ApiProperty({
    description: 'Fecha de la transacción (ISO string)',
    example: '2024-01-15T10:30:00.000Z',
  })
  date: string; // ISO string

  @ApiProperty({
    description: 'Tipo de transacción',
    enum: ['income', 'expense'],
    example: 'expense',
  })
  type: 'income' | 'expense';

  @ApiProperty({
    description: 'Moneda de la transacción',
    enum: ['ARS', 'USD'],
    example: 'ARS',
  })
  currency: 'ARS' | 'USD';
}

export class UpdateTransactionDto {
  @ApiProperty({
    description: 'Monto de la transacción',
    example: 1500.50,
    minimum: 0,
    required: false,
  })
  amount?: number;

  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'Descripción de la transacción',
    example: 'Compra de supermercado',
    maxLength: 255,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Fecha de la transacción (ISO string)',
    example: '2024-01-15T10:30:00.000Z',
    required: false,
  })
  date?: string; // ISO string

  @ApiProperty({
    description: 'Tipo de transacción',
    enum: ['income', 'expense'],
    example: 'expense',
    required: false,
  })
  type?: 'income' | 'expense';

  @ApiProperty({
    description: 'Moneda de la transacción',
    enum: ['ARS', 'USD'],
    example: 'ARS',
    required: false,
  })
  currency?: 'ARS' | 'USD';
}

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Alimentación',
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    description: 'Tipo de categoría',
    enum: ['income', 'expense'],
    example: 'expense',
  })
  type: 'income' | 'expense';

  @ApiProperty({
    description: 'Color de la categoría (hex)',
    example: '#FF6B6B',
    pattern: '^#[0-9A-Fa-f]{6}$',
  })
  color: string;

  @ApiProperty({
    description: 'Icono de la categoría',
    example: '🍕',
    required: false,
  })
  icon?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Alimentación',
    maxLength: 100,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Tipo de categoría',
    enum: ['income', 'expense'],
    example: 'expense',
    required: false,
  })
  type?: 'income' | 'expense';

  @ApiProperty({
    description: 'Color de la categoría (hex)',
    example: '#FF6B6B',
    pattern: '^#[0-9A-Fa-f]{6}$',
    required: false,
  })
  color?: string;

  @ApiProperty({
    description: 'Icono de la categoría',
    example: '🍕',
    required: false,
  })
  icon?: string;
}

export class CreateBudgetDto {
  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  categoryId: string;

  @ApiProperty({
    description: 'Monto del presupuesto',
    example: 5000,
    minimum: 0,
  })
  amount: number;

  @ApiProperty({
    description: 'Mes del presupuesto (YYYY-MM)',
    example: '2024-01',
    pattern: '^\\d{4}-\\d{2}$',
  })
  month: string; // YYYY-MM

  @ApiProperty({
    description: 'Moneda del presupuesto',
    enum: ['ARS', 'USD'],
    example: 'ARS',
  })
  currency: 'ARS' | 'USD';
}

export class UpdateBudgetDto {
  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'Monto del presupuesto',
    example: 5000,
    minimum: 0,
    required: false,
  })
  amount?: number;

  @ApiProperty({
    description: 'Mes del presupuesto (YYYY-MM)',
    example: '2024-01',
    pattern: '^\\d{4}-\\d{2}$',
    required: false,
  })
  month?: string;

  @ApiProperty({
    description: 'Moneda del presupuesto',
    enum: ['ARS', 'USD'],
    example: 'ARS',
    required: false,
  })
  currency?: 'ARS' | 'USD';
}

// DTOs para filtros y paginación
export class TransactionFiltersDto {
  @ApiProperty({
    description: 'Fecha de inicio (ISO string)',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  dateFrom?: string; // ISO string

  @ApiProperty({
    description: 'Fecha de fin (ISO string)',
    example: '2024-01-31T23:59:59.999Z',
    required: false,
  })
  dateTo?: string; // ISO string

  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'Tipo de transacción',
    enum: ['income', 'expense'],
    example: 'expense',
    required: false,
  })
  type?: 'income' | 'expense';

  @ApiProperty({
    description: 'Monto mínimo',
    example: 100,
    minimum: 0,
    required: false,
  })
  amountMin?: number;

  @ApiProperty({
    description: 'Monto máximo',
    example: 10000,
    minimum: 0,
    required: false,
  })
  amountMax?: number;
}

export class PaginationDto {
  @ApiProperty({
    description: 'Número de página',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  page?: number;

  @ApiProperty({
    description: 'Límite de elementos por página',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  limit?: number;
} 