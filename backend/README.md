# 🏦 Backend - Finanzas Personales API

API RESTful para la aplicación de finanzas personales con autenticación JWT, gestión de transacciones, categorías y presupuestos.

## 📋 Índice

- [🚀 Características](#-características)
- [📋 Requisitos Previos](#-requisitos-previos)
- [🛠️ Instalación](#️-instalación)
- [🔧 Configuración](#-configuración)
- [📚 Documentación](#-documentación)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🔐 Autenticación](#-autenticación)
- [📊 API Reference](#-api-reference)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🧪 Testing](#-testing)
- [📦 Despliegue](#-despliegue)
- [🔍 Monitoreo y Logs](#-monitoreo-y-logs)
- [🤝 Contribución](#-contribución)
- [📝 Licencia](#-licencia)
- [🆘 Soporte](#-soporte)
- [🗺️ Roadmap](#️-roadmap)
- [🚀 Próximos Pasos](#️-próximos-pasos)

## 🚀 Características

- **Arquitectura**: NestJS con Clean Architecture y Domain-Driven Design (DDD)
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT con Supabase
- **Documentación**: Swagger/OpenAPI automática
- **Validación**: Class-validator con pipes globales
- **Paginación**: Sistema de paginación robusto
- **Filtros**: Filtros avanzados para transacciones
- **Multi-moneda**: Soporte para ARS y USD

## 📋 Requisitos Previos

- **Node.js**: v18 o superior
- **Bun**: v1.0 o superior (recomendado) o npm/yarn
- **PostgreSQL**: v12 o superior
- **Supabase**: Cuenta y proyecto configurado

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd app-finanzas/backend
```

### 2. Instalar dependencias
```bash
bun install
# o
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
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

### 4. Configurar la base de datos
```bash
# Generar cliente Prisma
bun run prisma generate

# Ejecutar migraciones
bun run prisma migrate dev

# (Opcional) Sembrar datos de prueba
bun run prisma db seed
```

### 5. Iniciar el servidor
```bash
# Desarrollo
bun run start:dev

# Producción
bun run start:prod
```

## 🔧 Configuración

### Variables de Entorno Completas

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

### Obtener Credenciales de Supabase

#### JWT Secret
1. Ve al [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** > **API**
4. Copia el **JWT Secret** (ancho de clave: 64 caracteres)

#### Project URL y Anon Key
1. En la misma página de **Settings** > **API**
2. Copia la **Project URL**
3. Copia la **anon public** key

## 📚 Documentación

Una vez iniciado el servidor, accede a la documentación interactiva:

- **Swagger UI**: http://localhost:3001/docs
- **API Base URL**: http://localhost:3001/api
- **Especificación OpenAPI**: http://localhost:3001/docs-json

### Documentación Especializada

- [🔐 Configuración de Autenticación](./docs/auth-setup.md) - Guía completa de JWT con Supabase
- [📚 Documentación Swagger](./docs/swagger-setup.md) - Uso de la API interactiva
- [🚀 Próximos Pasos](./docs/next-steps.md) - Roadmap de desarrollo y funcionalidades faltantes

## 🏗️ Estructura del Proyecto

```
src/
├── modules/                    # Módulos de funcionalidad
│   ├── transactions/          # Gestión de transacciones
│   │   ├── application/       # Casos de uso
│   │   ├── controller/        # Controladores HTTP
│   │   ├── domain/           # Entidades y repositorios
│   │   └── infrastructure/   # Implementaciones de repositorios
│   ├── categories/           # Gestión de categorías
│   └── budgets/              # Gestión de presupuestos
├── shared/                   # Código compartido
│   ├── domain/              # Interfaces y DTOs compartidos
│   └── infrastructure/      # Servicios compartidos
└── main.ts                  # Punto de entrada
```

## 🔐 Autenticación

La API utiliza autenticación JWT con Supabase. Todos los endpoints requieren un token Bearer válido.

### Configuración de Autenticación

1. **Obtener JWT Secret** desde Supabase Dashboard > Settings > API
2. **Configurar en .env**: `SUPABASE_JWT_SECRET="tu-jwt-secret"`
3. **Usar en requests**: `Authorization: Bearer <token>`

### Arquitectura de Autenticación

```
Frontend (Supabase Auth) → JWT Token → Backend (NestJS) → Validación → Acceso
```

Para más detalles, consulta: [docs/auth-setup.md](./docs/auth-setup.md)

## 📊 API Reference

### Transacciones

#### Crear Transacción
```http
POST /api/transactions
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "amount": 1500.50,
  "categoryId": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Compra de supermercado",
  "date": "2024-01-15T10:30:00.000Z",
  "type": "expense",
  "currency": "ARS"
}
```

#### Listar Transacciones
```http
GET /api/transactions?page=1&limit=10&type=expense&dateFrom=2024-01-01T00:00:00.000Z&dateTo=2024-01-31T23:59:59.999Z
Authorization: Bearer <jwt-token>
```

#### Obtener Transacción
```http
GET /api/transactions/{id}
Authorization: Bearer <jwt-token>
```

#### Actualizar Transacción
```http
PUT /api/transactions/{id}
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "amount": 2000.00,
  "description": "Compra actualizada"
}
```

#### Eliminar Transacción
```http
DELETE /api/transactions/{id}
Authorization: Bearer <jwt-token>
```

### Categorías

#### Crear Categoría
```http
POST /api/categories
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Alimentación",
  "type": "expense",
  "color": "#FF6B6B",
  "icon": "🍕"
}
```

#### Listar Categorías
```http
GET /api/categories?page=1&limit=10
Authorization: Bearer <jwt-token>
```

#### Obtener Categoría
```http
GET /api/categories/{id}
Authorization: Bearer <jwt-token>
```

#### Actualizar Categoría
```http
PUT /api/categories/{id}
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Alimentación Actualizada",
  "color": "#4ECDC4"
}
```

#### Eliminar Categoría
```http
DELETE /api/categories/{id}
Authorization: Bearer <jwt-token>
```

### Presupuestos

#### Crear Presupuesto
```http
POST /api/budgets
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "categoryId": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 5000,
  "month": "2024-01",
  "currency": "ARS"
}
```

#### Listar Presupuestos
```http
GET /api/budgets?page=1&limit=10
Authorization: Bearer <jwt-token>
```

#### Obtener Presupuesto
```http
GET /api/budgets/{id}
Authorization: Bearer <jwt-token>
```

#### Actualizar Presupuesto
```http
PUT /api/budgets/{id}
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "amount": 6000,
  "month": "2024-02"
}
```

#### Eliminar Presupuesto
```http
DELETE /api/budgets/{id}
Authorization: Bearer <jwt-token>
```

### Códigos de Respuesta

| Código | Descripción | Ejemplo |
|--------|-------------|---------|
| 200 | OK - Operación exitosa | `{"id": "...", "amount": 1500.50}` |
| 201 | Created - Recurso creado | `{"id": "...", "amount": 1500.50}` |
| 400 | Bad Request - Datos inválidos | `{"message": ["amount must be positive"]}` |
| 401 | Unauthorized - Token inválido | `{"message": "Unauthorized"}` |
| 404 | Not Found - Recurso no encontrado | `{"message": "Transaction not found"}` |
| 500 | Internal Server Error - Error del servidor | `{"message": "Internal server error"}` |

## 🔧 Scripts Disponibles

```bash
# Desarrollo
bun run start:dev          # Servidor con hot reload
bun run start:debug        # Servidor con debug

# Producción
bun run build             # Compilar TypeScript
bun run start:prod        # Servidor de producción

# Base de datos
bun run prisma:generate   # Generar cliente Prisma
bun run prisma:migrate    # Ejecutar migraciones
bun run prisma:studio     # Abrir Prisma Studio

# Testing
bun run test              # Ejecutar tests
bun run test:watch        # Tests en modo watch
bun run test:cov          # Tests con cobertura

# Linting y formateo
bun run lint              # Linting con ESLint
bun run format            # Formateo con Prettier
```

## 🧪 Testing

### Ejecutar Tests
```bash
# Ejecutar todos los tests
bun run test

# Tests en modo watch
bun run test:watch

# Tests con cobertura
bun run test:cov

# Tests E2E
bun run test:e2e
```

### Testing con cURL

```bash
# Obtener token JWT (desde frontend o Supabase)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Crear transacción
curl -X POST http://localhost:3001/api/transactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1500.50,
    "categoryId": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Compra de supermercado",
    "date": "2024-01-15T10:30:00.000Z",
    "type": "expense",
    "currency": "ARS"
  }'

# Listar transacciones
curl -X GET "http://localhost:3001/api/transactions?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Testing con Postman/Thunder Client

1. **Configurar Authorization**:
   - Type: `Bearer Token`
   - Token: `<tu-jwt-token>`

2. **Headers**:
   - `Content-Type: application/json`

3. **Body** (para POST/PUT):
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

## 📦 Despliegue

### Variables de entorno para producción
```env
NODE_ENV=production
PORT=3001
DATABASE_URL="postgresql://..."
SUPABASE_JWT_SECRET="..."
FRONTEND_URL="https://tu-dominio.com"
```

### Docker (opcional)
```bash
# Construir imagen
docker build -t finanzas-backend .

# Ejecutar contenedor
docker run -p 3001:3001 finanzas-backend
```

## 🔍 Monitoreo y Logs

La aplicación incluye:
- **Logs estructurados** con diferentes niveles
- **Health checks** en `/api/health`
- **Métricas básicas** de rendimiento

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

- **Documentación**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/app-finanzas/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/app-finanzas/discussions)

## 🗺️ Roadmap

- [ ] Implementar cache con Redis
- [ ] Agregar notificaciones push
- [ ] Exportar reportes en PDF
- [ ] Integración con APIs de bancos
- [ ] Análisis de gastos con IA
- [ ] Multi-tenancy para empresas

## 🚀 Próximos Pasos

Para ver el roadmap completo de desarrollo y las funcionalidades que faltan implementar, consulta:

**[📋 Próximos Pasos - Roadmap de Desarrollo](./docs/next-steps.md)**

Este documento incluye:
- **🔥 Alta Prioridad**: Testing, logging, seguridad, health checks
- **⚡ Media Prioridad**: Cache, reportes, exportación, Docker
- **📈 Baja Prioridad**: GraphQL, webhooks, IA, métricas
- **🔮 Funcionalidades Futuras**: Notificaciones, integración bancaria, análisis predictivo

### Próximas Implementaciones Inmediatas

1. **Testing Completo** (2-3 días)
   - Tests unitarios para casos de uso
   - Tests de integración para endpoints
   - Tests E2E para flujos completos

2. **Logging Estructurado** (1 día)
   - Winston para logs estructurados
   - Interceptor de logging en NestJS
   - Logs de auditoría

3. **Health Checks** (0.5 días)
   - Endpoints de monitoreo
   - Estado de base de datos
   - Métricas básicas

4. **Rate Limiting** (0.5 días)
   - Protección contra DDoS
   - Límites por usuario/IP
   - Headers de rate limit

5. **Seguridad Básica** (1 día)
   - Helmet.js para headers de seguridad
   - CORS mejorado
   - Validación avanzada

## 🔗 Enlaces Útiles

- [Swagger UI](http://localhost:3001/docs) - Documentación interactiva
- [Prisma Studio](http://localhost:5555) - Editor de base de datos (si está ejecutándose)
- [Supabase Dashboard](https://supabase.com/dashboard) - Gestión de autenticación

---

**Desarrollado con ❤️ usando NestJS, Prisma y TypeScript**
