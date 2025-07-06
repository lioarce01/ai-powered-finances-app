# 📚 Documentación Swagger/OpenAPI

Esta guía explica cómo usar la documentación automática de la API generada con Swagger/OpenAPI.

## 🚀 Acceso a la Documentación

Una vez que el servidor esté ejecutándose, accede a la documentación interactiva:

- **URL**: http://localhost:3001/docs
- **Formato**: Swagger UI interactivo
- **Especificación OpenAPI**: http://localhost:3001/docs-json

## 🔧 Configuración

### Dependencias Instaladas

```json
{
  "@nestjs/swagger": "^11.2.0",
  "swagger-ui-express": "^5.0.1"
}
```

### Configuración en main.ts

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Configurar Swagger
const config = new DocumentBuilder()
  .setTitle('Finanzas Personales API')
  .setDescription('Documentación de la API para la app de finanzas personales')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
```

## 📋 Estructura de la Documentación

### 1. Información General
- **Título**: Finanzas Personales API
- **Descripción**: Documentación completa de endpoints
- **Versión**: 1.0
- **Autenticación**: Bearer Token (JWT)

### 2. Grupos de Endpoints

#### 🔄 Transacciones
- `POST /api/transactions` - Crear transacción
- `GET /api/transactions` - Listar transacciones
- `GET /api/transactions/{id}` - Obtener transacción
- `PUT /api/transactions/{id}` - Actualizar transacción
- `DELETE /api/transactions/{id}` - Eliminar transacción

#### 🏷️ Categorías
- `POST /api/categories` - Crear categoría
- `GET /api/categories` - Listar categorías
- `GET /api/categories/{id}` - Obtener categoría
- `PUT /api/categories/{id}` - Actualizar categoría
- `DELETE /api/categories/{id}` - Eliminar categoría

#### 💰 Presupuestos
- `POST /api/budgets` - Crear presupuesto
- `GET /api/budgets` - Listar presupuestos
- `GET /api/budgets/{id}` - Obtener presupuesto
- `PUT /api/budgets/{id}` - Actualizar presupuesto
- `DELETE /api/budgets/{id}` - Eliminar presupuesto

## 🔐 Autenticación

### Configurar Token JWT

1. Haz clic en el botón **"Authorize"** en la parte superior
2. Ingresa tu token JWT en el formato: `Bearer <tu-token>`
3. Haz clic en **"Authorize"**
4. Cierra el modal

### Ejemplo de Token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## 🧪 Probar Endpoints

### 1. Crear una Transacción

1. Ve a **POST /api/transactions**
2. Haz clic en **"Try it out"**
3. Completa el body con:

```json
{
  "amount": 1500.50,
  "categoryId": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Compra de supermercado",
  "date": "2024-01-15T10:30:00.000Z",
  "type": "expense",
  "currency": "ARS"
}
```

4. Haz clic en **"Execute"**

### 2. Listar Transacciones

1. Ve a **GET /api/transactions**
2. Haz clic en **"Try it out"**
3. Configura parámetros opcionales:
   - `page`: 1
   - `limit`: 10
   - `type`: expense
   - `dateFrom`: 2024-01-01T00:00:00.000Z
   - `dateTo`: 2024-01-31T23:59:59.999Z

4. Haz clic en **"Execute"**

## 📊 Esquemas de Datos

### CreateTransactionDto
```json
{
  "amount": "number (required, min: 0)",
  "categoryId": "string (required, UUID)",
  "description": "string (required, max: 255)",
  "date": "string (required, ISO date)",
  "type": "string (required, enum: income|expense)",
  "currency": "string (required, enum: ARS|USD)"
}
```

### UpdateTransactionDto
```json
{
  "amount": "number (optional, min: 0)",
  "categoryId": "string (optional, UUID)",
  "description": "string (optional, max: 255)",
  "date": "string (optional, ISO date)",
  "type": "string (optional, enum: income|expense)",
  "currency": "string (optional, enum: ARS|USD)"
}
```

### TransactionResponse
```json
{
  "id": "string (UUID)",
  "amount": "number",
  "categoryId": "string (UUID)",
  "description": "string",
  "date": "string (ISO date)",
  "type": "string (income|expense)",
  "currency": "string (ARS|USD)",
  "userId": "string (UUID)"
}
```

## 🔍 Códigos de Respuesta

### 200 OK
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 1500.50,
  "categoryId": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Compra de supermercado",
  "date": "2024-01-15T10:30:00.000Z",
  "type": "expense",
  "currency": "ARS",
  "userId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### 201 Created
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 1500.50,
  "categoryId": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Compra de supermercado",
  "date": "2024-01-15T10:30:00.000Z",
  "type": "expense",
  "currency": "ARS",
  "userId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["amount must be a positive number"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Transaction not found",
  "error": "Not Found"
}
```

## 🛠️ Personalización

### Agregar Nuevos Endpoints

1. **Decorar el controlador**:
```typescript
@ApiTags('Mi Módulo')
@ApiBearerAuth()
@Controller('mi-modulo')
export class MiController {
  // ...
}
```

2. **Decorar los métodos**:
```typescript
@Post()
@ApiOperation({ summary: 'Crear nuevo recurso' })
@ApiResponse({ 
  status: 201, 
  description: 'Recurso creado exitosamente',
  type: MiResponseDto 
})
@ApiResponse({ status: 400, description: 'Datos inválidos' })
async create(@Body() dto: CreateMiDto): Promise<MiEntity> {
  // ...
}
```

3. **Crear DTOs con decoradores**:
```typescript
export class CreateMiDto {
  @ApiProperty({
    description: 'Nombre del recurso',
    example: 'Mi Recurso',
    maxLength: 100,
  })
  name: string;
}
```

### Configuración Avanzada

```typescript
const config = new DocumentBuilder()
  .setTitle('Mi API')
  .setDescription('Descripción de mi API')
  .setVersion('1.0')
  .addTag('usuarios', 'Operaciones relacionadas con usuarios')
  .addTag('productos', 'Operaciones relacionadas con productos')
  .addBearerAuth()
  .addApiKey()
  .addBasicAuth()
  .addOAuth2()
  .addCookieAuth()
  .build();
```

## 📱 Integración con Frontend

### Generar Cliente TypeScript

```bash
# Instalar swagger-codegen
npm install -g swagger-codegen

# Generar cliente
swagger-codegen generate \
  -i http://localhost:3001/docs-json \
  -l typescript-fetch \
  -o ./generated-client
```

### Usar en React/Next.js

```typescript
import { Configuration, TransactionsApi } from './generated-client';

const config = new Configuration({
  basePath: 'http://localhost:3001/api',
  accessToken: () => localStorage.getItem('jwt-token') || '',
});

const api = new TransactionsApi(config);

// Usar la API
const transactions = await api.getTransactions();
```

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. Documentación no se carga
- Verifica que el servidor esté ejecutándose
- Confirma que la ruta `/docs` esté configurada
- Revisa los logs del servidor

#### 2. Endpoints no aparecen
- Verifica que los decoradores estén correctos
- Confirma que los controladores estén registrados
- Revisa que no haya errores de compilación

#### 3. Autenticación no funciona
- Verifica que el token JWT sea válido
- Confirma que el formato sea `Bearer <token>`
- Revisa que el JWT Secret esté configurado

## 📚 Recursos Adicionales

- [Documentación oficial de NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [Especificación OpenAPI 3.0](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [Decoradores de Swagger](https://docs.nestjs.com/openapi/decorators)

---

**Última actualización**: Enero 2024 