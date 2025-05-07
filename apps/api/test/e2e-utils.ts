import axios from 'axios';

// Configuration
export const API_URL = process.env.API_URL || 'http://localhost:3000/graphql';
export const DEFAULT_TIMEOUT = 10000; // 10 seconds timeout

/**
 * Check if the API is available
 */
export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `{ __schema { queryType { name } } }`,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: DEFAULT_TIMEOUT,
      },
    );

    return !response.data.errors;
  } catch (error) {
    console.error(`API connection check failed: ${error.message}`);
    return false;
  }
};

/**
 * Helper function to make GraphQL requests
 */
export const graphqlRequest = async ({
  query,
  variables = {},
  token = null,
}: {
  query: string;
  variables?: Record<string, any>;
  token?: string | null;
}): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(
      API_URL,
      {
        query,
        variables,
      },
      {
        headers,
        timeout: DEFAULT_TIMEOUT,
      },
    );

    if (response.data.errors) {
      const error = new Error('GraphQL Error');
      (error as any).response = response;
      (error as any).errors = response.data.errors;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('GraphQL request failed:', error.message);
    if ((error as any).response?.data) {
      console.error(
        'Error details:',
        JSON.stringify((error as any).response.data, null, 2),
      );
    }
    throw error;
  }
};
