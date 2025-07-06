# 🔐 Configuración de Autenticación JWT

Esta guía explica cómo configurar y usar la autenticación JWT con Supabase en el backend de la aplicación de finanzas personales.

## 📋 Requisitos

- Cuenta de Supabase activa
- Proyecto de Supabase configurado
- Base de datos PostgreSQL configurada

## 🛠️ Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/finanzas_db"

# Supabase Configuration
SUPABASE_JWT_SECRET="your-supabase-jwt-secret-here"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"

# Application Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"

# JWT Configuration
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="1h"

# Logging
LOG_LEVEL="debug"
```

### 2. Obtener Credenciales de Supabase

#### JWT Secret
1. Ve al [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** > **API**
4. Copia el **JWT Secret** (ancho de clave: 64 caracteres)

#### Project URL y Anon Key
1. En la misma página de **Settings** > **API**
2. Copia la **Project URL**
3. Copia la **anon public** key

## 🔧 Cómo Funciona la Autenticación

### Arquitectura de Autenticación

```
Frontend (Supabase Auth) → JWT Token → Backend (NestJS) → Validación → Acceso
```

### Componentes Principales

#### 1. Estrategia JWT (`jwt.strategy.ts`)
- Valida tokens JWT de Supabase
- Extrae el `userId` del payload del token
- Retorna información del usuario autenticado

#### 2. AuthGuard (`jwt-auth.guard.ts`)
- Protege las rutas que requieren autenticación
- Se aplica automáticamente a todos los controladores

#### 3. Decorador CurrentUser (`current-user.decorator.ts`)
- Extrae la información del usuario del request
- Disponible en todos los métodos de los controladores

## 📝 Estructura del Token JWT de Supabase

El token JWT de Supabase contiene:

```json
{
  "sub": "user-uuid",           // ID del usuario
  "email": "user@example.com",  // Email del usuario
  "aud": "authenticated",       // Audiencia
  "exp": 1234567890,           // Fecha de expiración
  "iat": 1234567890,           // Fecha de emisión
  "role": "authenticated"      // Rol del usuario
}
```

## 🚀 Uso en Controladores

### Ejemplo de Controlador Protegido

```typescript
@Controller('transactions')
@UseGuards(JwtAuthGuard) // Protege todas las rutas
export class TransactionsController {
  
  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: CurrentUserType, // Obtiene el usuario autenticado
  ): Promise<Transaction> {
    const request: CreateTransactionRequest = {
      ...createTransactionDto,
      userId: user.userId, // Usa el ID del usuario autenticado
    };

    return this.createTransactionUseCase.execute(request);
  }
}
```

### Información del Usuario Disponible

```typescript
interface CurrentUser {
  userId: string;    // ID único del usuario
  email: string;     // Email del usuario
  role?: string;     // Rol del usuario (opcional)
}
```

## 🧪 Testing con Postman/Thunder Client

### 1. Obtener Token JWT

Desde el frontend o Supabase Dashboard, obtén un token JWT válido.

### 2. Configurar Request

```http
POST http://localhost:3001/api/transactions
Content-Type: application/json
Authorization: Bearer <tu-token-jwt>

{
  "amount": 1500.50,
  "categoryId": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Compra de supermercado",
  "date": "2024-01-15T10:30:00.000Z",
  "type": "expense",
  "currency": "ARS"
}
```

### 3. Ejemplos de Endpoints

#### Crear Transacción
```bash
curl -X POST http://localhost:3001/api/transactions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1500.50,
    "categoryId": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Compra de supermercado",
    "date": "2024-01-15T10:30:00.000Z",
    "type": "expense",
    "currency": "ARS"
  }'
```

#### Obtener Transacciones
```bash
curl -X GET "http://localhost:3001/api/transactions?page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```

## 🔒 Seguridad

### Características de Seguridad Implementadas

- ✅ **Validación automática** de tokens JWT de Supabase
- ✅ **Extracción automática** del userId del token
- ✅ **Protección de rutas** en todos los controladores
- ✅ **Aislamiento de datos** por usuario
- ✅ **Manejo de errores** para tokens inválidos
- ✅ **CORS configurado** para el frontend
- ✅ **Rate limiting** (configurable)

### Mejores Prácticas

1. **Nunca almacenes tokens** en localStorage (usa httpOnly cookies)
2. **Renueva tokens** antes de que expiren
3. **Valida tokens** en el frontend antes de enviarlos
4. **Usa HTTPS** en producción
5. **Mantén actualizadas** las dependencias

## 🚨 Manejo de Errores

### Errores Comunes

#### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**Causas:**
- Token no proporcionado
- Token expirado
- Token inválido
- Token malformado

#### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

**Causas:**
- Usuario sin permisos para el recurso
- Token válido pero sin acceso

### Solución de Problemas

#### Token Expirado
```bash
# Renovar token desde el frontend
const { data: { session } } = await supabase.auth.getSession()
const newToken = session?.access_token
```

#### Token Inválido
```bash
# Verificar formato del token
# Debe ser: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 Recursos Adicionales

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [NestJS JWT Strategy](https://docs.nestjs.com/security/authentication)
- [Swagger Documentation](./swagger-setup.md)
- [API Endpoints](./api-endpoints.md)

## 🤝 Soporte

Si tienes problemas con la autenticación:

1. Verifica que las variables de entorno estén correctas
2. Confirma que el JWT Secret de Supabase sea válido
3. Revisa los logs del servidor para errores específicos
4. Abre un issue en el repositorio con detalles del problema

---