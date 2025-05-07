#!/usr/bin/env node

/**
 * Test API Connection
 *
 * This script checks if the API is running and properly accessible.
 * Run it to diagnose connectivity issues before running tests.
 */

import axios from 'axios';

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:3000/graphql';
const REQUEST_TIMEOUT = 5000; // 5 seconds timeout

async function testConnection() {
  console.log(`\n🔍 Testing connection to API at ${API_URL}\n`);

  try {
    // Test basic HTTP connectivity
    const baseUrl = API_URL.split('/graphql')[0];
    const httpResponse = await axios.get(baseUrl, { timeout: REQUEST_TIMEOUT });
    console.log(
      `✅ HTTP connection successful (status: ${httpResponse.status})`,
    );
  } catch (error) {
    console.error(`❌ HTTP connection failed: ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      console.error(
        'Is the API server running? Try starting it with: pnpm run start:dev',
      );
    }
    process.exit(1);
  }

  // Test GraphQL connection
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

    if (response.data.errors) {
      console.error(
        '❌ GraphQL connection failed with errors:',
        response.data.errors,
      );
      process.exit(1);
    } else {
      console.log('✅ GraphQL connection successful');
    }
  } catch (error) {
    console.error(`❌ GraphQL connection failed: ${error.message}`);
    process.exit(1);
  }

  // Test authentication
  try {
    const loginMutation = `
      mutation Login($email: String!, $password: String!) {
        loginAdmin(email: $email, password: $password) {
          token { token }
        }
      }
    `;

    const loginResponse = await axios.post(
      API_URL,
      {
        query: loginMutation,
        variables: { email: 'admin@admin.com', password: 'Password1!' },
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: REQUEST_TIMEOUT,
      },
    );

    if (loginResponse.data.errors) {
      console.error('❌ Authentication failed:', loginResponse.data.errors);
      console.error(
        'Check if admin credentials are correct and the auth endpoint exists',
      );
      process.exit(1);
    } else {
      console.log('✅ Authentication successful');
      console.log(
        '\n✨ API connection test successful! The API is ready for testing.\n',
      );
    }
  } catch (error) {
    console.error(`❌ Authentication failed: ${error.message}`);
    process.exit(1);
  }
}

testConnection().catch((error) => {
  console.error('Unexpected error during connection test:', error);
  process.exit(1);
});
