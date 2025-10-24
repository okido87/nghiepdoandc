# 🔧 Development Guide

Hướng dẫn phát triển cho WebApp Quản Lý Giám Định Nghiệp Đoàn DC.

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** 18+ 
- **npm** hoặc **yarn**
- **Git**
- **VS Code** (recommended)

### 🛠️ Setup Môi Trường

```bash
# Clone repository
git clone <repository-url>
cd eaip-management

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Setup database
npm run db:push

# Start development server
npm run dev
```

### 🌐 Access Development
- **Application**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Database**: ./prisma/dev.db

## 🏗️ Architecture Overview

### 📁 Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── views/            # Page view components
│   ├── forms/            # Form components
│   └── charts/           # Chart components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities
│   ├── db.ts            # Database client
│   ├── utils.ts         # Helper functions
│   ├── validations.ts   # Zod schemas
│   └── constants.ts     # App constants
├── types/                # TypeScript types
└── styles/               # Additional styles
```

### 🎯 Technology Stack

#### 🎨 Frontend
- **Next.js 15** - React framework
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Recharts** - Charts

#### 🗄️ Backend
- **Next.js API Routes** - Backend API
- **Prisma ORM** - Database
- **SQLite** - Development database
- **NextAuth.js** - Authentication
- **Zod** - Validation

#### 🔄 State Management
- **Zustand** - Client state
- **TanStack Query** - Server state
- **React Hook Form** - Form state

## 🗄️ Database

### 📊 Schema Design
```prisma
// prisma/schema.prisma
model Order {
  id          String   @id @default(cuid())
  number      String   @unique
  name        String
  description String?
  status      OrderStatus @default(PENDING)
  companyId   String
  company     Company  @relation(fields: [companyId], references: [id])
  assignedTo  String?
  assignee    User?    @relation(fields: [assignedTo], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("orders")
}

model Company {
  id          String   @id @default(cuid())
  name        String   @unique
  email       String?
  phone       String?
  address     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  orders      Order[]
  
  @@map("companies")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  role      UserRole  @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  orders    Order[]
  
  @@map("users")
}
```

### 🔄 Database Operations
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

## 🎨 Component Development

### 🧩 Component Structure
```typescript
// components/ui/example.tsx
import { cn } from "@/lib/utils"

interface ExampleProps {
  children: React.ReactNode
  className?: string
}

export function Example({ children, className }: ExampleProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}
```

### 📋 Form Components
```typescript
// components/forms/order-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { orderSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField } from "@/components/ui/form"

export function OrderForm() {
  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = (data: OrderSchema) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  )
}
```

## 📡 API Development

### 🔗 API Route Structure
```typescript
// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orderSchema } from "@/lib/validations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const orders = await db.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        company: true,
        assignee: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = orderSchema.parse(body)

    const order = await db.order.create({
      data: validatedData,
      include: {
        company: true,
        assignee: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: order,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
```

## 🎯 State Management

### 🐻 Zustand Store
```typescript
// lib/store.ts
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface AppState {
  // State
  user: User | null
  theme: "light" | "dark"
  sidebarOpen: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setTheme: (theme: "light" | "dark") => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      user: null,
      theme: "light",
      sidebarOpen: true,
      
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ 
        sidebarOpen: !state.sidebarOpen 
      })),
    }),
    { name: "app-store" }
  )
)
```

### 🔄 TanStack Query
```typescript
// hooks/use-orders.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getOrders, createOrder } from "@/lib/api/orders"

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}
```

## 🎨 Styling Guidelines

### 🎯 Tailwind CSS Usage
```typescript
// Use consistent spacing
<div className="p-4">        // padding: 1rem
<div className="gap-4">      // gap: 1rem
<div className="space-y-4">  // margin-top: 1rem between children

// Use semantic colors
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">

// Use responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 🧩 Component Variants
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## 🧪 Testing

### 📋 Unit Tests
```typescript
// __tests__/components/button.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
```

### 🔄 Integration Tests
```typescript
// __tests__/api/orders.test.ts
import { GET, POST } from "@/app/api/orders/route"
import { db } from "@/lib/db"

describe("/api/orders", () => {
  it("GET returns orders", async () => {
    const request = new Request("http://localhost:3000/api/orders")
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

## 🚀 Performance

### ⚡ Optimization Tips
1. **Code Splitting**: Use dynamic imports
2. **Image Optimization**: Use Next.js Image component
3. **Caching**: Implement proper caching strategies
4. **Bundle Size**: Monitor and optimize bundle size

### 📊 Monitoring
```typescript
// lib/monitoring.ts
export function trackEvent(name: string, properties?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, properties)
  }
}

export function trackPageView(path: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
    })
  }
}
```

## 🔧 Development Tools

### 🛠️ Recommended VS Code Extensions
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - CSS autocomplete
- **Prisma** - Database tools
- **TypeScript Importer** - Auto imports

### 📋 Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## 🤝 Contributing

### 📋 Development Workflow
1. **Fork** repository
2. **Create** feature branch
3. **Make** changes
4. **Test** thoroughly
5. **Submit** pull request

### 📝 Code Standards
- Follow **TypeScript** best practices
- Use **ESLint** configuration
- Write **meaningful** commit messages
- Add **tests** for new features
- Update **documentation**

---

© 2024 EMS SOLUTION - Development Guide for Nghiệp Đoàn DC