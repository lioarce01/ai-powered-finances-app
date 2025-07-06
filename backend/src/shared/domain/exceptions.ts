import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string, id: string) {
    super(`${entityName} con ID ${id} no encontrado`);
  }
}

export class TransactionNotFoundException extends EntityNotFoundException {
  constructor(id: string) {
    super('Transacción', id);
  }
}

export class CategoryNotFoundException extends EntityNotFoundException {
  constructor(id: string) {
    super('Categoría', id);
  }
}

export class BudgetNotFoundException extends EntityNotFoundException {
  constructor(id: string) {
    super('Presupuesto', id);
  }
} 