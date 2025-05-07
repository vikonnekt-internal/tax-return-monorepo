# Application Structure

This document provides a comprehensive overview of the Tax ID Return System's application structure.

## Monorepo Structure

The project is organized as a monorepo using Turborepo, with the following top-level directories:

```
tax-id-return-monorepo/
├── apps/                   # Application-specific code
│   ├── api/                # Backend NestJS application
│   ├── web/                # Frontend Next.js application
│   ├── web-e2e/            # End-to-end tests for the web application
│   └── docs/               # Documentation application
├── packages/               # Shared packages and libraries
│   ├── database/           # Prisma schema and database utilities
│   ├── typescript-config/  # Shared TypeScript configurations
│   ├── eslint-config/      # Shared ESLint configurations
│   ├── logger/             # Shared logging utilities
│   ├── upload/             # Shared file upload utilities
│   └── apollo/             # GraphQL client configuration
├── docs/                   # Project documentation
├── scripts/                # Helper scripts for development
├── templates/              # Template files for code generation
├── tests/                  # Shared test utilities and fixtures
├── .github/                # GitHub workflows and templates
├── .vscode/                # VSCode configurations
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # PNPM workspace configuration
├── package.json            # Root package.json
└── docker-compose.yml      # Docker Compose configuration
```

## Frontend Application Structure (apps/web)

The web application follows Next.js's app router structure:

```
apps/web/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── auth/               # Authentication pages
│   │   ├── signin/         # Sign-in page
│   │   ├── signup/         # Sign-up page
│   │   └── reset-password/ # Password reset page
│   ├── information/        # General information pages
│   ├── tax/                # Tax-related pages
│   │   ├── return/         # Tax return pages
│   │   ├── income/         # Income management pages
│   │   ├── assets/         # Asset management pages
│   │   └── debts/          # Debt management pages
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── component/              # Shared React components
│   ├── ui/                 # UI components
│   └── feature/            # Feature-specific components
├── module/                 # Feature modules
├── icons/                  # Icon components
├── public/                 # Static assets
├── styles/                 # Global styles
└── types/                  # TypeScript type definitions
```

## Backend Application Structure (apps/api)

The API follows NestJS's modular structure:

```
apps/api/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Root controller
│   ├── app.service.ts             # Root service
│   ├── schema.gql                 # Generated GraphQL schema
│   ├── auth/                      # Authentication module
│   │   ├── auth.module.ts         # Auth module definition
│   │   ├── auth.service.ts        # Auth service implementation
│   │   ├── auth.controller.ts     # Auth REST endpoints
│   │   ├── auth.resolver.ts       # Auth GraphQL resolver
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── guards/                # Authentication guards
│   │   └── strategies/            # Authentication strategies
│   ├── users/                     # Users module
│   ├── taxpayers/                 # Taxpayers module
│   ├── tax-reports/               # Tax reports module
│   ├── income-sources/            # Income sources module
│   ├── assets/                    # Assets module
│   ├── real-estates/              # Real estates module
│   ├── vehicles/                  # Vehicles module
│   ├── debts/                     # Debts module
│   ├── housing-loans/             # Housing loans module
│   ├── other-debts/               # Other debts module
│   ├── benefits/                  # Benefits module
│   ├── common/                    # Shared utilities
│   │   ├── decorators/            # Custom decorators
│   │   ├── filters/               # Exception filters
│   │   ├── guards/                # Guards
│   │   ├── interceptors/          # Interceptors
│   │   ├── middleware/            # Middleware
│   │   └── pipes/                 # Validation pipes
│   └── env-config/                # Environment configuration
├── test/                          # Tests
├── scripts/                       # Helper scripts
└── dist/                          # Compiled output
```

## Database Package Structure (packages/database)

The database package contains the Prisma schema and utilities:

```
packages/database/
├── prisma/
│   └── schema.prisma           # Prisma schema definition
├── src/
│   ├── index.ts                # Entry point
│   └── client.ts               # Prisma client singleton
├── seed.ts                     # Database seeding script
└── db/                         # Database utilities
```

## Main Prisma Models

The database schema includes the following main models:

- **User**: User account information
- **Taxpayer**: Taxpayer profile information
- **TaxReturn**: Tax return submissions
- **IncomeSource**: Income sources for taxpayers
- **Asset**: Parent model for assets
  - **RealEstate**: Real estate properties
  - **Vehicle**: Vehicle assets
- **Debt**: Parent model for debts
  - **HousingLoan**: Housing loans and mortgages
  - **OtherDebt**: Other types of debt
- **Benefit**: Benefits received by taxpayers
- **Government Data Models**: Models for government-provided data
  - **GovIncomeSource**: Income sources from government records
  - **GovAsset**: Assets from government records
  - **GovDebt**: Debts from government records
  - **GovBenefit**: Benefits from government records

## Shared Package Structures

### TypeScript Configuration (packages/typescript-config)

```
packages/typescript-config/
├── base.json              # Base TypeScript configuration
├── nextjs.json            # Next.js-specific configuration
└── nestjs.json            # NestJS-specific configuration
```

### ESLint Configuration (packages/eslint-config)

```
packages/eslint-config/
├── base.js               # Base ESLint configuration
├── nextjs.js             # Next.js-specific configuration
└── nestjs.js             # NestJS-specific configuration
```

### Logger Package (packages/logger)

```
packages/logger/
├── src/
│   ├── index.ts          # Entry point
│   ├── logger.service.ts # Logger service
│   └── logger.module.ts  # Logger module
└── dist/                 # Compiled output
```

### Upload Package (packages/upload)

```
packages/upload/
├── src/
│   ├── index.ts          # Entry point
│   ├── upload.service.ts # Upload service
│   └── upload.module.ts  # Upload module
└── dist/                 # Compiled output
```

### Apollo Package (packages/apollo)

```
packages/apollo/
├── src/
│   ├── index.ts          # Entry point
│   └── client.ts         # Apollo client configuration
└── dist/                 # Compiled output
```

## Configuration Files

### Turborepo Configuration (turbo.json)

This file defines the tasks and dependencies for the monorepo build process.

### PNPM Workspace Configuration (pnpm-workspace.yaml)

This file defines the workspace packages for the PNPM package manager.

### Docker Compose Configuration (docker-compose.yml)

This file defines the services and configuration for running the application with Docker Compose.
