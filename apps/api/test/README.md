# API End-to-End Tests

This directory contains end-to-end tests for the API, ensuring that the entire application works correctly from the client's perspective.

## Test Structure

- `e2e-utils.ts` - Utility functions for making GraphQL requests and checking API availability
- `tax-return-flow.e2e-spec.ts` - Tests the complete tax return submission flow
- `tax-report.e2e-spec.ts` - Tests tax report creation and management
- `graphql.e2e-spec.ts` - Basic GraphQL endpoint tests
- `test-connection.js` - Script to verify API connectivity

## Running the Tests

### Prerequisites

- API server must be running on `http://localhost:3000` (or the URL specified in `API_URL` environment variable)
- Database must be properly configured and accessible
- Admin user with credentials `admin@admin.com` and `Password1!` must exist

### Manual Test Execution

To run all E2E tests:

```bash
pnpm run test:e2e
```

To run only the tax return flow tests:

```bash
pnpm run test:e2e:tax-return
```

To check if the API is accessible:

```bash
pnpm run test:connection
```

### Automated Test Execution (Recommended)

We provide a helper script that automatically checks if the API is running, starts it if needed, and then runs the tests:

```bash
# Run all E2E tests with automatic API check/start
pnpm run test:e2e:run

# Run only tax return flow tests with automatic API check/start
pnpm run test:e2e:tax-return:run
```

## Test Design

Each test follows these principles:

1. **Isolation** - Tests clean up after themselves and don't depend on existing data
2. **Precondition checks** - Tests verify if prerequisites are met before running
3. **Auto-skipping** - Tests automatically skip if prerequisites aren't available
4. **Detailed logging** - Tests provide clear progress information and error details

## Adding New Tests

To add a new E2E test:

1. Create a new file following the pattern `your-feature.e2e-spec.ts`
2. Import utilities from `e2e-utils.ts`
3. Use the existing test flow as a template
4. Add a new script to `package.json` for running your test in isolation

Example structure for a new test:

```typescript
import { graphqlRequest, isApiAvailable } from './e2e-utils';

describe('Your Feature (e2e)', () => {
  let skipTests = false;
  let authToken: string;

  // Configure Jest for longer timeout
  jest.setTimeout(60000);

  // Setup and check API availability
  beforeAll(async () => {
    // Check API and authenticate
  });

  // Test your feature steps
  describe('Step 1: First Step', () => {
    it('should do something', async () => {
      // Test logic
    });
  });

  // More test steps...
});
```
