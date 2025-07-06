import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponse {
  @ApiProperty({
    description: 'ID único de la transacción',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Monto de la transacción',
    example: 1500.50,
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
  })
  description: string;

  @ApiProperty({
    description: 'Fecha de la transacción',
    example: '2024-01-15T10:30:00.000Z',
  })
  date: Date;

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

  @ApiProperty({
    description: 'ID del usuario',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}

export class CategoryResponse {
  @ApiProperty({
    description: 'ID único de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Alimentación',
  })
  name: string;

  @ApiProperty({
    description: 'Tipo de categoría',
    enum: ['income', 'expense'],
    example: 'expense',
  })
  type: 'income' | 'expense';

  @ApiProperty({
    description: 'Color de la categoría',
    example: '#FF6B6B',
  })
  color: string;

  @ApiProperty({
    description: 'Icono de la categoría',
    example: '🍕',
    required: false,
  })
  icon?: string;

  @ApiProperty({
    description: 'ID del usuario',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}

export class BudgetResponse {
  @ApiProperty({
    description: 'ID único del presupuesto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  categoryId: string;

  @ApiProperty({
    description: 'Monto del presupuesto',
    example: 5000,
  })
  amount: number;

  @ApiProperty({
    description: 'Mes del presupuesto',
    example: '2024-01',
  })
  month: string;

  @ApiProperty({
    description: 'Moneda del presupuesto',
    enum: ['ARS', 'USD'],
    example: 'ARS',
  })
  currency: 'ARS' | 'USD';

  @ApiProperty({
    description: 'ID del usuario',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}

export class PaginatedResponse<T> {
  @ApiProperty({
    description: 'Lista de elementos',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Total de elementos',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Página actual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Elementos por página',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 10,
  })
  totalPages: number;
} 