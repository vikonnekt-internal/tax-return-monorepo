# Architecture

This document outlines the architecture of the Tax ID Return System.

## System Architecture Overview

The Tax ID Return System follows a modern microservices architecture pattern with a monorepo structure. This approach allows for better separation of concerns, maintainability, and scalability.

```
┌──────────────────┐     ┌───────────────────┐     ┌─────────────────┐
│                  │     │                   │     │                 │
│  Web Application │────▶│  API Service      │────▶│  Database       │
│  (Next.js)       │     │  (NestJS)         │     │  (PostgreSQL)   │
│                  │     │                   │     │                 │
└──────────────────┘     └───────────────────┘     └─────────────────┘
        ▲                        │
        │                        │
        │                        ▼
┌──────────────────┐     ┌───────────────────┐
│                  │     │                   │
│  E2E Testing     │     │  Shared Packages  │
│  (Cypress)       │     │                   │
│                  │     │                   │
└──────────────────┘     └───────────────────┘
```

## Component Architecture

### Frontend Architecture (Next.js)

The frontend is built with Next.js, following a component-based architecture:

```
┌─ Web Application ─────────────────────────┐
│                                           │
│  ┌─ Pages/Routes ─────────────────────┐   │
│  │                                    │   │
│  │  ┌─ Components ─────────────────┐  │   │
│  │  │                              │  │   │
│  │  │  ┌─ UI Components ────────┐  │  │   │
│  │  │  │                        │  │  │   │
│  │  │  │  - Buttons             │  │  │   │
│  │  │  │  - Forms               │  │  │   │
│  │  │  │  - Cards               │  │  │   │
│  │  │  │  - Tables              │  │  │   │
│  │  │  │                        │  │  │   │
│  │  │  └────────────────────────┘  │  │   │
│  │  │                              │  │   │
│  │  │  ┌─ Feature Components ───┐  │  │   │
│  │  │  │                        │  │  │   │
│  │  │  │  - TaxReturnForm       │  │  │   │
│  │  │  │  - IncomeList          │  │  │   │
│  │  │  │  - AssetManager        │  │  │   │
│  │  │  │  - DebtTracker         │  │  │   │
│  │  │  │                        │  │  │   │
│  │  │  └────────────────────────┘  │  │   │
│  │  │                              │  │   │
│  │  └──────────────────────────────┘  │   │
│  │                                    │   │
│  │  ┌─ State Management ────────────┐  │   │
│  │  │                               │  │   │
│  │  │  - Apollo Client (GraphQL)    │  │   │
│  │  │  - React Context              │  │   │
│  │  │  - Local State                │  │   │
│  │  │                               │  │   │
│  │  └───────────────────────────────┘  │   │
│  │                                    │   │
│  └────────────────────────────────────┘   │
│                                           │
└───────────────────────────────────────────┘
```

### Backend Architecture (NestJS)

The backend uses NestJS, which provides a modular architecture:

```
┌─ API Service ────────────────────────────────┐
│                                              │
│  ┌─ Modules ───────────────────────────────┐ │
│  │                                         │ │
│  │  ┌─ Users ───────┐  ┌─ Auth ──────────┐ │ │
│  │  │               │  │                 │ │ │
│  │  │ - Controller  │  │ - Controller    │ │ │
│  │  │ - Service     │  │ - Service       │ │ │
│  │  │ - Resolver    │  │ - Guards        │ │ │
│  │  │ - DTO         │  │ - Strategies    │ │ │
│  │  │               │  │                 │ │ │
│  │  └───────────────┘  └─────────────────┘ │ │
│  │                                         │ │
│  │  ┌─ Taxpayers ────┐  ┌─ TaxReturns ───┐ │ │
│  │  │               │  │                 │ │ │
│  │  │ - Controller  │  │ - Controller    │ │ │
│  │  │ - Service     │  │ - Service       │ │ │
│  │  │ - Resolver    │  │ - Resolver      │ │ │
│  │  │ - DTO         │  │ - DTO           │ │ │
│  │  │               │  │                 │ │ │
│  │  └───────────────┘  └─────────────────┘ │ │
│  │                                         │ │
│  │  ┌─ Assets ───────┐  ┌─ Debts ────────┐ │ │
│  │  │               │  │                 │ │ │
│  │  │ - Controller  │  │ - Controller    │ │ │
│  │  │ - Service     │  │ - Service       │ │ │
│  │  │ - Resolver    │  │ - Resolver      │ │ │
│  │  │ - DTO         │  │ - DTO           │ │ │
│  │  │               │  │                 │ │ │
│  │  └───────────────┘  └─────────────────┘ │ │
│  │                                         │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─ Core ────────────────────────────────┐   │
│  │                                       │   │
│  │  - Database (Prisma)                  │   │
│  │  - GraphQL (Apollo)                   │   │
│  │  - Authentication                     │   │
│  │  - Authorization                      │   │
│  │  - Logging                            │   │
│  │  - Error Handling                     │   │
│  │                                       │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

## Database Architecture

The system uses PostgreSQL with Prisma ORM. The database schema is designed to support the tax return system with various entities:

- **User**: Stores user authentication and profile information
- **Taxpayer**: Contains taxpayer details
- **TaxReturn**: Represents tax return submissions
- **IncomeSource**: Tracks different sources of income
- **Asset**: Parent entity for different types of assets
  - **RealEstate**: Stores real estate property details
  - **Vehicle**: Contains vehicle information
- **Debt**: Parent entity for different types of debts
  - **HousingLoan**: Stores mortgage and housing loan information
  - **OtherDebt**: Contains other types of debt information
- **Benefit**: Tracks various benefits received

## Communication Patterns

### API Communication

- **GraphQL**: Primary API interface for flexible data querying
- **REST**: Used for specific endpoints where appropriate

### Authentication Flow

```
┌───────────┐     ┌───────────┐     ┌───────────┐
│           │     │           │     │           │
│  Client   │────▶│  Auth API │────▶│  Database │
│           │     │           │     │           │
└───────────┘     └───────────┘     └───────────┘
      │                 │
      │                 ▼
      │           ┌───────────┐
      │           │           │
      └──────────▶│   JWT     │
                  │           │
                  └───────────┘
```

## Deployment Architecture

The system is containerized using Docker, with separate containers for each service:

```
┌─ Docker Environment ─────────────────────────────┐
│                                                  │
│  ┌─ Web Container ─┐  ┌─ API Container ─┐        │
│  │                 │  │                 │        │
│  │    Next.js      │  │     NestJS      │        │
│  │                 │  │                 │        │
│  └─────────────────┘  └─────────────────┘        │
│                                                  │
│  ┌─ Database Container ─┐                        │
│  │                      │                        │
│  │     PostgreSQL       │                        │
│  │                      │                        │
│  └──────────────────────┘                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Shared Packages

The monorepo includes several shared packages:

- **database**: Prisma client and database utilities
- **typescript-config**: Shared TypeScript configurations
- **eslint-config**: Shared ESLint configurations
- **logger**: Shared logging utilities
- **upload**: Shared file upload utilities
- **apollo**: GraphQL client configuration

These packages ensure consistency across the codebase and promote code reuse.
