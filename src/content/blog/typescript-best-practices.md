---
title: "TypeScript: Best Practices for Scalable Projects"
description: "Complete guide to TypeScript best practices I've learned working on large-scale enterprise projects."
publishDate: 2024-01-20
tags: ["typescript", "javascript", "best-practices", "enterprise"]
featured: false
draft: true
category: "tutorial"
image: "/blog/typescript-practices.png"
imageAlt: "TypeScript code on screen with best practices"
---

# TypeScript: Best Practices for Scalable Projects

After years working with TypeScript on enterprise projects, I've compiled the best practices that truly make a difference in code scalability and maintainability.

## 1. Configuración Estricta desde el Inicio

### tsconfig.json optimizado

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Estas opciones pueden parecer restrictivas, pero te ahorrarán **horas de debugging** en producción.

## 2. Tipos Utility Personalizados

### Crear tipos reutilizables

```typescript
// Tipos base para APIs
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
};

// Tipos para formularios
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

// Utility para hacer propiedades opcionales
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

## 3. Branded Types para Mayor Seguridad

```typescript
// Evita errores de asignación
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function getUser(id: UserId) {
  // Implementation
}

// Esto causará un error en tiempo de compilación ✅
const productId = "prod-123" as ProductId;
getUser(productId); // Error: ProductId no es asignable a UserId
```

## 4. Discriminated Unions para Estados

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'success':
      // TypeScript sabe que 'data' existe aquí
      console.log(state.data);
      break;
    case 'error':
      // TypeScript sabe que 'error' existe aquí
      console.log(state.error);
      break;
  }
}
```

## 5. Template Literal Types para APIs

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint =
  | `/api/users/${string}`
  | `/api/products/${string}`
  | '/api/auth/login'
  | '/api/auth/logout';

type ApiCall<M extends HttpMethod, E extends ApiEndpoint> = {
  method: M;
  endpoint: E;
  body?: M extends 'GET' ? never : unknown;
};

// Uso type-safe
const loginCall: ApiCall<'POST', '/api/auth/login'> = {
  method: 'POST',
  endpoint: '/api/auth/login',
  body: { email: '', password: '' } // ✅ Permitido
};

const getUserCall: ApiCall<'GET', '/api/users/123'> = {
  method: 'GET',
  endpoint: '/api/users/123',
  // body: {} // ❌ Error: body no permitido en GET
};
```

## 6. Manejo de Errores Tipado

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User, 'NOT_FOUND' | 'NETWORK_ERROR'>> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      return { success: false, error: 'NOT_FOUND' };
    }

    const user = await response.json();
    return { success: true, data: user };
  } catch {
    return { success: false, error: 'NETWORK_ERROR' };
  }
}

// Uso
const result = await fetchUser('123');
if (result.success) {
  console.log(result.data.name); // ✅ TypeScript sabe que data existe
} else {
  console.log(result.error); // ✅ 'NOT_FOUND' | 'NETWORK_ERROR'
}
```

## 7. Validación Runtime con Zod

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).max(150)
});

type User = z.infer<typeof UserSchema>;

function createUser(userData: unknown): Result<User, string> {
  const validation = UserSchema.safeParse(userData);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.message
    };
  }

  return {
    success: true,
    data: validation.data
  };
}
```

## 8. Organización de Tipos

### Estructura de carpetas recomendada

```
src/
├── types/
│   ├── api.ts        # Tipos de API
│   ├── entities.ts   # Entidades del dominio
│   ├── forms.ts      # Tipos de formularios
│   └── utils.ts      # Utility types
├── utils/
│   └── type-guards.ts # Type guards reutilizables
```

### Type Guards reutilizables

```typescript
// utils/type-guards.ts
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function hasProperty<T, K extends string>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return obj !== null && typeof obj === 'object' && prop in obj;
}

// Uso
const users = [user1, null, user2, undefined].filter(isDefined);
// users es ahora User[] sin nulls ni undefined
```

## Conclusiones

Estas prácticas han demostrado ser invaluables en proyectos reales:

1. **Configuración estricta** - Previene bugs antes de que lleguen a producción
2. **Tipos utility** - Reduce código repetitivo y mejora la consistencia
3. **Branded types** - Previene errores de asignación sutiles
4. **Discriminated unions** - Hace el manejo de estados más seguro
5. **Template literals** - Proporciona type safety para strings dinámicos
6. **Manejo de errores tipado** - Hace explícitos los casos de error
7. **Validación runtime** - Conecta el mundo tipado con datos externos
8. **Organización clara** - Facilita el mantenimiento a largo plazo

El esfuerzo inicial de implementar estas prácticas se paga con creces en **menos bugs**, **mejor DX** y **código más mantenible**.

¿Qué prácticas de TypeScript has encontrado más útiles en tus proyectos?