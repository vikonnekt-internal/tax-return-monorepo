// Increase timeout for E2E tests
jest.setTimeout(60000);

// Global teardown logic if needed
afterAll(async () => {
  // Allow time for any pending async operations to complete
  await new Promise((resolve) => setTimeout(resolve, 500));
});
