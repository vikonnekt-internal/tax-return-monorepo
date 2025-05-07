#!/usr/bin/env node

/**
 * Run E2E Tests with pre-flight checks
 *
 * This script checks if the API is running before attempting to run the tests.
 * It ensures a better testing experience by providing clear feedback on test prerequisites.
 */

const { execSync, spawn } = require('child_process');
const axios = require('axios');

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:3000/graphql';
const REQUEST_TIMEOUT = 5000; // 5 seconds timeout
const MAX_RETRY = 3;

/**
 * Check if the API is available
 */
async function isApiAvailable() {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `{ __schema { queryType { name } } }`,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: REQUEST_TIMEOUT,
      },
    );

    return !response.data.errors;
  } catch (error) {
    return false;
  }
}

/**
 * Start the API server if it's not running
 */
function startApiServer() {
  console.log('🚀 API server is not running. Starting it...');

  // Start the API in a separate detached process
  const apiProcess = spawn('pnpm', ['run', 'start:dev'], {
    stdio: 'inherit',
    detached: true,
  });

  // Don't wait for this process
  apiProcess.unref();

  console.log('⏳ Waiting for API server to be ready...');
  return apiProcess;
}

/**
 * Wait for the API to be available with retries
 */
async function waitForApi(retries = MAX_RETRY) {
  for (let i = 0; i < retries; i++) {
    console.log(`Checking API availability (attempt ${i + 1}/${retries})...`);
    const available = await isApiAvailable();
    if (available) {
      console.log('✅ API is available!');
      return true;
    }

    // Wait 3 seconds before retrying
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  return false;
}

/**
 * Run the E2E tests
 */
function runTests(testFile) {
  const testCommand = testFile
    ? `pnpm run test:e2e:tax-return`
    : `pnpm run test:e2e`;

  console.log(`\n🧪 Running E2E tests: ${testCommand}`);

  try {
    execSync(testCommand, { stdio: 'inherit' });
    console.log('\n✅ E2E tests completed successfully!');
    return 0;
  } catch (error) {
    console.error('\n❌ E2E tests failed.');
    return 1;
  }
}

// Main execution
async function main() {
  console.log('🔍 Checking if API server is running...');

  // Get the test file argument, if provided
  const args = process.argv.slice(2);
  const testTaxReturnOnly =
    args.includes('--tax-return') || args.includes('-t');

  // Check API availability
  let available = await isApiAvailable();
  let startedApiServer = false;

  if (!available) {
    // Start the API server
    startApiServer();
    startedApiServer = true;

    // Wait for API to be available
    available = await waitForApi();
  }

  if (!available) {
    console.error(
      '❌ API is not available. Please start the API server and try again.',
    );
    process.exit(1);
  }

  // Run the tests
  const exitCode = runTests(testTaxReturnOnly);

  // Exit with the test result code
  process.exit(exitCode);
}

// Run the main function
main().catch((error) => {
  console.error('Error running tests:', error);
  process.exit(1);
});
