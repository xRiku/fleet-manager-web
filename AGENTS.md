# AGENTS.md

Guide for AI agents working on this Next.js Fleet Manager web app.

## Build/Lint Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run lint       # Run ESLint
```

**Note:** No test runner configured yet. Add tests with your preferred framework (Vitest/Jest).

## Tech Stack

- Next.js 15 + React 19 + TypeScript 5
- Tailwind CSS 4
- shadcn/ui (New York style)
- Drizzle ORM + PostgreSQL
- Better Auth
- Zustand (state management)
- Zod (validation)
- React Hook Form
- Lucide + Phosphor icons

## Code Style Guidelines

### File Naming
- Components: `kebab-case.tsx` (e.g., `login-form.tsx`)
- Utilities: `camelCase.ts`
- Types: `PascalCase` (inside files)
- Directories: `kebab-case`

### Component Patterns
- Use `function` keyword (not `const`) for components
- Use `"use client"` for client components
- Props interface: `type Props = { ... }`
- Export default for page/screen components
- Named exports for UI components

```tsx
// Good
function Button({ className, ...props }: ButtonProps) {
  return <button className={cn("...", className)} {...props} />
}
export { Button }

// Default exports for pages
export default function LoginPage() { ... }
```

### Imports
- Use `@/*` alias for all src imports
- Order: React/Next → External libs → Internal (@/*) → Relative
- Group imports by source

```tsx
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useModalStore } from "@/stores/modal-store"
```

### Types
- Use `type` (not `interface`)
- PascalCase for type names
- Export types when shared
- Use `z.infer<typeof schema>` for form types

```ts
type Vehicle = { ... }
export type RequestVehicleSchema = z.infer<typeof requestVehicleSchema>
```

### Enums
- PascalCase enum name
- UPPER_SNAKE for values

```ts
export enum Status {
  APPROVED = "approved",
  REJECTED = "rejected",
}
```

### Server Actions
- Place in `src/actions/actions.ts`
- Use `"use server"` directive
- Use `revalidatePath()` after mutations
- Throw errors for failure cases

```ts
"use server"
export async function createVehicle(data: NewVehicle) {
  await db.insert(vehicles).values(data)
  revalidatePath("/vehicles")
}
```

### Styling (Tailwind)
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui patterns
- Custom colors defined in globals.css

### Error Handling
- Use try/catch in async functions
- Throw `Error` with descriptive messages
- Handle auth errors with redirect to `/login`

### State Management
- Zustand stores in `src/stores/*.tsx`
- Separate States and Actions types
- Use `create<States & Actions>()`

### Database (Drizzle)
- Schema in `src/db/schema.ts`
- Use `uuid().primaryKey().defaultRandom()`
- Relations defined below tables
- Export Select/Insert types: `type Garage = typeof garages.$inferSelect`

### Project Structure
```
src/
  actions/        # Server actions
  app/            # Next.js app router
  components/
    ui/           # shadcn/ui components
    buttons/      # Button components
    cards/        # Card components
    dialogs/      # Dialog components
    tables/       # Table components
    charts/       # Chart components
  db/             # Database schema
  hooks/          # Custom hooks
  lib/            # Utilities (auth, utils, validations)
  stores/         # Zustand stores
  types.ts        # Shared types
  middleware.ts   # Auth middleware
```

### Key Rules
- Use `server-only` import for server-only code
- Validate env vars with `@t3-oss/env-nextjs`
- Use `AuthSchema` from `@/lib/validations` for auth
- Session retrieval: `auth.api.getSession({ headers: await headers() })`
- Prefer Lucide icons (configured default); Phosphor for specific needs
