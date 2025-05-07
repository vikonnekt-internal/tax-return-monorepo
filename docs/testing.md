# Testing

This document outlines the testing strategies and practices implemented in the Tax ID Return System.

## Testing Overview

The Tax ID Return System uses a comprehensive testing strategy that includes several levels of testing to ensure the quality and reliability of the application. The testing approach is based on the testing pyramid, with a focus on:

1. **Unit Tests**: Testing individual functions and components in isolation
2. **Integration Tests**: Testing the interaction between components
3. **End-to-End Tests**: Testing the entire application from the user's perspective

## Testing Technologies

The following technologies are used for testing:

### Backend Testing

- **Jest**: JavaScript testing framework
- **SuperTest**: HTTP testing library for testing API endpoints
- **Prisma Test Environment**: For database testing

### Frontend Testing

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing library for React components
- **Mock Service Worker (MSW)**: API mocking library

### End-to-End Testing

- **Cypress**: End-to-end testing framework
- **Playwright**: Alternative end-to-end testing framework (for specific cross-browser scenarios)

## Test Structure

### Backend Tests

Backend tests are located in the `apps/api/src` directory, alongside the code they test. Each module has its own `*.spec.ts` files for testing:

```
apps/api/src/
├── users/
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── users.service.spec.ts
│   └── users.controller.spec.ts
├── taxpayers/
│   ├── taxpayers.service.ts
│   ├── taxpayers.controller.ts
│   ├── taxpayers.service.spec.ts
│   └── taxpayers.controller.spec.ts
└── ...
```

There are also integration tests in the `apps/api/test` directory:

```
apps/api/test/
├── app.e2e-spec.ts
├── users.e2e-spec.ts
├── taxpayers.e2e-spec.ts
└── ...
```

### Frontend Tests

Frontend tests are located in `apps/web` directory, alongside the components they test:

```
apps/web/
├── component/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Input.tsx
│   │   └── Input.test.tsx
│   └── feature/
│       ├── TaxReturnForm.tsx
│       └── TaxReturnForm.test.tsx
└── ...
```

### End-to-End Tests

End-to-end tests are located in the `apps/web-e2e` directory:

```
apps/web-e2e/
├── cypress/
│   ├── e2e/
│   │   ├── auth.cy.ts
│   │   ├── tax-return.cy.ts
│   │   └── ...
│   ├── fixtures/
│   │   ├── users.json
│   │   └── tax-returns.json
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
└── ...
```

## Writing Tests

### Unit Tests

#### Backend Unit Tests

Example of a service unit test:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { mockPrismaService, mockUser } from "../../test/mocks";

describe("UsersService", () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findById", () => {
    it("should return a user by id", async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

      const result = await service.findById(1);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should return null if user is not found", async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  // More test cases...
});
```

Example of a controller unit test:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { mockUser, mockUsersService } from "../../test/mocks";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getUser", () => {
    it("should return a user by id", async () => {
      mockUsersService.findById.mockResolvedValue(mockUser);

      const result = await controller.getUser("1");

      expect(result).toEqual(mockUser);
      expect(service.findById).toHaveBeenCalledWith(1);
    });

    // More test cases...
  });
});
```

#### Frontend Unit Tests

Example of a React component test:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders a button with the correct text', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the primary style when variant is primary', () => {
    render(<Button variant="primary">Primary Button</Button>);

    const button = screen.getByRole('button', { name: /primary button/i });

    expect(button).toHaveClass('bg-blue-500');
  });

  // More test cases...
});
```

### Integration Tests

#### Backend Integration Tests

Example of an API integration test:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { mockUser } from "./mocks";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();

    // Authenticate and get JWT token
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    jwtToken = response.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /users/:id", () => {
    it("should return a user by id", async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .get("/users/1")
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it("should return 404 if user not found", async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get("/users/999")
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(response.status).toBe(404);
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app.getHttpServer()).get("/users/1");

      expect(response.status).toBe(401);
    });
  });

  // More test cases...
});
```

### End-to-End Tests

Example of a Cypress end-to-end test:

```typescript
describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow a user to log in", () => {
    // Click the login button
    cy.get("[data-testid=login-button]").click();

    // Fill in the login form
    cy.get("[data-testid=email-input]").type("test@example.com");
    cy.get("[data-testid=password-input]").type("password123");
    cy.get("[data-testid=login-submit]").click();

    // Verify that the user is logged in
    cy.get("[data-testid=user-menu]").should("be.visible");
    cy.get("[data-testid=user-email]").should("contain", "test@example.com");
  });

  it("should show an error for invalid credentials", () => {
    // Click the login button
    cy.get("[data-testid=login-button]").click();

    // Fill in the login form with invalid credentials
    cy.get("[data-testid=email-input]").type("test@example.com");
    cy.get("[data-testid=password-input]").type("wrongpassword");
    cy.get("[data-testid=login-submit]").click();

    // Verify that an error message is shown
    cy.get("[data-testid=login-error]").should("be.visible");
    cy.get("[data-testid=login-error]").should(
      "contain",
      "Invalid credentials"
    );
  });

  // More test cases...
});
```

## Test Data Management

### Test Databases

The application uses separate databases for testing:

- **Unit Tests**: In-memory database or mocked Prisma client
- **Integration Tests**: Test-specific PostgreSQL database
- **End-to-End Tests**: Test-specific PostgreSQL database

### Test Fixtures

Test fixtures are used to provide consistent test data:

```typescript
// apps/api/test/mocks.ts
export const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "hashed_password",
  role: "user",
  isActive: true,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  taxpayerId: "1234567890",
};

export const mockTaxpayer = {
  id: "1234567890",
  firstName: "John",
  lastName: "Doe",
  fullAddress: "123 Main St, City, Country",
  streetAddress: "123 Main St",
  postalCode: "12345",
  city: "City",
  email: "john.doe@example.com",
  phoneNumber: "1234567890",
  taxYear: 2023,
  dateCreated: new Date(),
  dateModified: new Date(),
};

// More mock data...
```

### Seed Data

For integration and end-to-end tests, the database is seeded with test data:

```typescript
// apps/api/test/setup.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedTestDatabase() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create test user
  const user = await prisma.user.create({
    data: {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: hashedPassword,
      role: "user",
      isActive: true,
      isVerified: true,
    },
  });

  // Create test taxpayer
  const taxpayer = await prisma.taxpayer.create({
    data: {
      id: "1234567890",
      firstName: "Test",
      lastName: "Taxpayer",
      fullAddress: "123 Test St, Test City, Test Country",
      streetAddress: "123 Test St",
      postalCode: "12345",
      city: "Test City",
      email: "test@example.com",
      phoneNumber: "1234567890",
      taxYear: 2023,
    },
  });

  // Create test tax return
  await prisma.taxReturn.create({
    data: {
      taxpayerId: taxpayer.id,
      taxYear: 2023,
      userId: user.id,
      status: "draft",
    },
  });

  // More seed data...
}

export default seedTestDatabase;
```

## CI/CD Integration

Tests are run as part of the CI/CD pipeline to ensure code quality before deployment.

### GitHub Actions Configuration

```yaml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "pnpm"

      - name: Install dependencies
        run: |
          npm install -g pnpm
          pnpm install

      - name: Lint
        run: pnpm lint

      - name: Set up test database
        run: |
          pnpm -F database exec prisma generate
          DATABASE_URL=postgresql://postgres:postgres@localhost:5432/test_db pnpm -F database exec prisma db push --force-reset
          DATABASE_URL=postgresql://postgres:postgres@localhost:5432/test_db node -r ts-node/register packages/database/seed.ts

      - name: Run unit tests
        run: pnpm test

      - name: Run integration tests
        run: pnpm test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
```

## Test Coverage

The project aims to maintain high test coverage for both backend and frontend code. Test coverage reports are generated during the CI process:

```bash
# Generate test coverage report
pnpm test -- --coverage
```

### Coverage Thresholds

The following coverage thresholds are enforced:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## Performance Testing

Performance testing is conducted to ensure the application meets performance requirements:

### Load Testing

Load testing is performed using [k6](https://k6.io/) to simulate multiple users accessing the system:

```javascript
// load-test.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
    { duration: "3m", target: 50 }, // Stay at 50 users for 3 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 500ms
    http_req_failed: ["rate<0.01"], // Less than 1% of requests should fail
  },
};

export default function () {
  const res = http.get("https://api.yourdomain.com/health");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

### Stress Testing

Stress testing is performed to identify the breaking point of the application:

```javascript
// stress-test.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 100 }, // Ramp up to 100 users
    { duration: "5m", target: 100 }, // Stay at 100 users
    { duration: "2m", target: 200 }, // Ramp up to 200 users
    { duration: "5m", target: 200 }, // Stay at 200 users
    { duration: "2m", target: 300 }, // Ramp up to 300 users
    { duration: "5m", target: 300 }, // Stay at 300 users
    { duration: "2m", target: 0 }, // Ramp down to 0 users
  ],
};

export default function () {
  http.get("https://api.yourdomain.com/taxpayers");
  sleep(1);
}
```

## Accessibility Testing

Accessibility testing is performed to ensure the application is accessible to all users:

### Automated Accessibility Testing

Automated accessibility testing is performed using [axe-core](https://github.com/dequelabs/axe-core):

```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import TaxReturnForm from './TaxReturnForm';

describe('TaxReturnForm accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<TaxReturnForm />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
```

### Manual Accessibility Testing

Manual accessibility testing is performed using:

- Keyboard navigation testing
- Screen reader testing
- Color contrast checking

## Security Testing

Security testing is performed to identify and fix security vulnerabilities:

### Static Application Security Testing (SAST)

Static code analysis for security vulnerabilities using tools like [SonarQube](https://www.sonarqube.org/) or [Snyk](https://snyk.io/).

### Dependency Scanning

Regular scanning of dependencies for known vulnerabilities:

```bash
# Using npm audit
npm audit

# Using Snyk
snyk test
```

### Dynamic Application Security Testing (DAST)

Dynamic testing of the running application for security vulnerabilities using tools like [OWASP ZAP](https://www.zaproxy.org/).

## Test Documentation

Test documentation is maintained to provide guidance on testing practices:

- **Test Strategy**: Overall approach to testing
- **Test Plan**: Detailed plan for testing activities
- **Test Cases**: Specific scenarios to test
- **Test Reports**: Results of test execution

## Best Practices

- **Isolated Tests**: Each test should be independent and not rely on the state from other tests
- **Fast Tests**: Tests should run quickly to provide quick feedback
- **Deterministic Tests**: Tests should produce the same results regardless of when or where they are run
- **Clear Intent**: Tests should clearly indicate what they are testing
- **Test Doubles**: Use mocks, stubs, and spies appropriately
- **Test Coverage**: Aim for high test coverage, but focus on critical paths first
- **Code Quality**: Apply the same code quality standards to test code as to production code
