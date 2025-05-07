# Development Guide

This document provides a comprehensive guide for developers working on the Tax ID Return System.

## Prerequisites

Before you start development, ensure you have the following installed:

- **Node.js**: Version 18.x or later
- **pnpm**: Version 9.0.0 or later
- **Docker**: For running the database and other services
- **Git**: For version control

## Setting Up the Development Environment

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/tax-id-return-monorepo.git
cd tax-id-return-monorepo
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment files and configure them:

```bash
# For the API
cp apps/api/.env.example apps/api/.env

# For the web app
cp apps/web/.env.example apps/web/.env

# For the database
cp packages/database/.env.example packages/database/.env
```

Edit the `.env` files with your local configuration settings.

### 4. Start the Database

```bash
docker-compose up -d db
```

### 5. Initialize the Database

```bash
pnpm up:deps
pnpm prepare:db
```

## Development Workflow

### Running the Development Server

To start all services in development mode:

```bash
pnpm dev
```

To start specific apps:

```bash
# API only
pnpm dev --filter=api

# Web only
pnpm dev --filter=web
```

### Building the Applications

To build all applications:

```bash
pnpm build
```

To build specific apps:

```bash
# API only
pnpm build --filter=api

# Web only
pnpm build --filter=web
```

### Running Tests

To run all tests:

```bash
pnpm test
```

To run specific tests:

```bash
# API tests
pnpm test --filter=api

# Web tests
pnpm test --filter=web

# E2E tests
pnpm test --filter=web-e2e
```

## Database Management

### Prisma Commands

The project uses Prisma for database management. Here are common commands:

```bash
# Generate Prisma client
pnpm -F database exec prisma generate

# Push schema changes to the database
pnpm -F database exec prisma db push

# Run migrations
pnpm -F database exec prisma migrate dev

# Reset the database
pnpm -F database exec prisma migrate reset

# Seed the database
pnpm -F database exec prisma db seed
```

### Updating Database Schema

1. Make changes to the schema in `packages/database/prisma/schema.prisma`
2. Run migration generation:
   ```bash
   pnpm -F database exec prisma migrate dev --name <migration-name>
   ```
3. Update any affected models/services in the API

## Code Structure and Conventions

### Directory Structure

The monorepo is organized as follows:

```
tax-id-return-monorepo/
├── apps/                   # Application-specific code
│   ├── api/                # Backend API
│   ├── web/                # Frontend web application
│   └── web-e2e/            # End-to-end tests
├── packages/               # Shared packages
│   ├── database/           # Database schema and utilities
│   ├── typescript-config/  # Shared TypeScript configurations
│   ├── eslint-config/      # Shared ESLint configurations
│   ├── logger/             # Shared logging utilities
│   ├── upload/             # Shared file upload utilities
│   └── apollo/             # Apollo GraphQL client configuration
├── scripts/                # Helper scripts
└── docker-compose.yml      # Docker configuration
```

### Coding Standards

- **TypeScript**: Use TypeScript for all code
- **ESLint**: Follow ESLint rules defined in `packages/eslint-config`
- **Prettier**: Format code using Prettier
- **Testing**: Write tests for all new code

### Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `tax-return.service.ts`)
- **Classes**: Use PascalCase for class names (e.g., `TaxReturnService`)
- **Methods/Functions**: Use camelCase for methods and functions (e.g., `getTaxReturn`)
- **Variables**: Use camelCase for variables (e.g., `taxpayerId`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `MAX_RETURN_LIMIT`)
- **Interfaces/Types**: Use PascalCase prefixed with 'I' for interfaces (e.g., `ITaxReturn`) or without prefix for types (e.g., `TaxReturn`)
- **Enums**: Use PascalCase for enum names (e.g., `TaxReturnStatus`)

### API Development

#### Creating a New NestJS Module

1. Generate a new module:

   ```bash
   cd apps/api
   nest g module my-module
   ```

2. Generate controller, service, and resolver:

   ```bash
   nest g controller my-module
   nest g service my-module
   nest g resolver my-module
   ```

3. Define DTOs in a `dto` folder within your module
4. Define entities or types in a `models` folder
5. Implement business logic in the service
6. Expose REST endpoints in the controller
7. Expose GraphQL operations in the resolver

#### GraphQL Development

1. Define your GraphQL types using `@nestjs/graphql` decorators
2. Implement resolvers for queries and mutations
3. Use DTOs for input validation
4. Test with GraphQL Playground at `http://localhost:3000/graphql`

### Frontend Development

#### Component Structure

Organize React components as follows:

1. Create components in the `components` directory
2. For pages, use the Next.js app router structure in the `app` directory
3. Use TypeScript interfaces for component props
4. Use CSS modules or Tailwind CSS for styling

#### GraphQL Client

1. Define GraphQL operations in separate files
2. Generate TypeScript types using GraphQL Code Generator
3. Use Apollo Client hooks (`useQuery`, `useMutation`) for data fetching

## Version Control

### Git Workflow

1. **Branching Strategy**:

   - `main`: Production-ready code
   - `develop`: Integration branch for features
   - `feature/*`: Feature branches
   - `bugfix/*`: Bug fix branches
   - `release/*`: Release preparation branches
   - `hotfix/*`: Production hotfix branches

2. **Commit Messages**:
   Use conventional commits format:

   ```
   <type>(<scope>): <description>

   [optional body]

   [optional footer]
   ```

   Types include:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, etc.)
   - `refactor`: Code refactoring
   - `test`: Adding or modifying tests
   - `chore`: Maintenance tasks

3. **Pull Requests**:
   - Create a PR from your feature branch to `develop`
   - Ensure all tests pass
   - Get at least one code review
   - Squash commits when merging

## Deployment

### Development Deployment

For development deployments, use the Docker Compose setup:

```bash
docker-compose up -d
```

### Production Deployment

For production deployment:

1. Build all applications:

   ```bash
   pnpm build
   ```

2. Use Docker Compose or Kubernetes:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Troubleshooting

### Common Issues

#### Database Connection Issues

If you encounter database connection issues:

1. Check that the database container is running:

   ```bash
   docker ps
   ```

2. Verify your database environment variables:

   ```bash
   cat packages/database/.env
   ```

3. Try resetting the database:
   ```bash
   pnpm -F database exec prisma migrate reset
   ```

#### Build Errors

For build errors:

1. Clean the build cache:

   ```bash
   pnpm clean
   ```

2. Reinstall dependencies:

   ```bash
   pnpm install
   ```

3. Check TypeScript errors:
   ```bash
   pnpm typecheck
   ```

## Resources

### Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)

### Tools

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/motivation)
- [Docker Documentation](https://docs.docker.com/)

## Contributing

Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
