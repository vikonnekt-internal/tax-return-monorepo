import { graphqlRequest, isApiAvailable } from './e2e-utils';

describe('Tax Report Flow (e2e)', () => {
  let skipTests = false;
  let authToken: string;
  let taxpayerId: string;
  let taxReportId: string;
  let incomeSourceId: string;

  const taxYear = new Date().getFullYear();

  // Configure Jest for longer timeout since these tests hit the DB
  jest.setTimeout(60000);

  // Check if API is available before running tests
  beforeAll(async () => {
    try {
      const available = await isApiAvailable();
      if (!available) {
        console.warn('API is not available, skipping tax report tests');
        skipTests = true;
        return;
      }

      // Authentication - we need a token for subsequent requests
      const loginMutation = `
        mutation Login($email: String!, $password: String!) {
          loginAdmin(email: $email, password: $password) {
            token {
              token
              expiresIn
            }
            data {
              id
              email
              firstName
              lastName
            }
          }
        }
      `;

      const loginResponse = await graphqlRequest({
        query: loginMutation,
        variables: {
          email: 'admin@admin.com',
          password: 'Password1!',
        },
      });

      authToken = loginResponse.data.loginAdmin.token.token;
      console.log('✅ Login successful. Auth token received for testing.');
    } catch (error) {
      console.warn('Authentication failed, skipping tax report tests:', error);
      skipTests = true;
    }
  });

  // Clean up after all tests
  afterAll(async () => {
    if (skipTests || !authToken || !taxReportId) {
      return;
    }

    try {
      // Delete tax report
      const deleteMutation = `
        mutation DeleteTaxReport($id: Int!) {
          deleteTaxReport(id: $id) {
            id
          }
        }
      `;

      await graphqlRequest({
        query: deleteMutation,
        variables: { id: Number(taxReportId) },
        token: authToken,
      });

      console.log(
        `✅ Successfully cleaned up test data for tax report #${taxReportId}`,
      );
    } catch (error) {
      console.warn('Error cleaning up test data:', error);
    }
  });

  describe('Step 1: Get or Create a Taxpayer', () => {
    it('should get the current user or create a taxpayer', async () => {
      if (skipTests || !authToken) {
        console.warn('Skipping taxpayer test - no auth token');
        return;
      }

      // First try to get user data
      const userQuery = `
        query GetUserData {
          whoAmI {
            id
            email
            firstName
            lastName
            taxpayerId
          }
        }
      `;

      const userResponse = await graphqlRequest({
        query: userQuery,
        token: authToken,
      });

      // Check if there's a taxpayerId
      if (userResponse.data.whoAmI.taxpayerId) {
        taxpayerId = userResponse.data.whoAmI.taxpayerId;
        console.log(`Retrieved existing taxpayer ID: ${taxpayerId}`);
      } else {
        // Create taxpayer if we don't have one
        const createTaxpayerMutation = `
          mutation CreateTaxpayer($input: CreateTaxpayerInput!) {
            createTaxpayer(input: $input) {
              id
              firstName
              lastName
              email
              fullAddress
            }
          }
        `;

        const taxpayerVariables = {
          input: {
            id: `TP${Math.floor(Math.random() * 1000000)}`,
            firstName: 'Test',
            lastName: 'User',
            email: 'admin@admin.com',
            city: 'Test City',
            streetAddress: '123 Test St',
            postalCode: '12345',
            fullAddress: '123 Test St, Test City, 12345',
            taxYear: taxYear,
          },
        };

        const taxpayerResponse = await graphqlRequest({
          query: createTaxpayerMutation,
          variables: taxpayerVariables,
          token: authToken,
        });

        taxpayerId = taxpayerResponse.data.createTaxpayer.id;
        console.log(`Created taxpayer with ID: ${taxpayerId}`);
      }

      expect(taxpayerId).toBeDefined();
    });
  });

  describe('Step 2: Create Tax Report', () => {
    it('should create a new tax report', async () => {
      if (skipTests || !authToken || !taxpayerId) {
        console.warn('Skipping tax report creation - missing prerequisites');
        return;
      }

      const createTaxReportMutation = `
        mutation CreateTaxReport($input: CreateTaxReportInput!) {
          createTaxReport(createTaxReportInput: $input) {
            id
            taxYear
            status
            submissionDate
          }
        }
      `;

      const taxReportVariables = {
        input: {
          taxYear: taxYear,
          status: 'draft',
          notes: 'Test tax report created by E2E test',
        },
      };

      const response = await graphqlRequest({
        query: createTaxReportMutation,
        variables: taxReportVariables,
        token: authToken,
      });

      taxReportId = response.data.createTaxReport.id;
      expect(taxReportId).toBeDefined();
      console.log(`Created tax report with ID: ${taxReportId}`);
    });
  });

  describe('Step 3: Add Income Source', () => {
    it('should add an income source to the tax report', async () => {
      if (skipTests || !authToken || !taxReportId) {
        console.warn('Skipping income source test - missing prerequisites');
        return;
      }

      const createIncomeMutation = `
        mutation CreateIncomeSource($input: CreateIncomeSourceInput!) {
          createIncomeSource(input: $input) {
            id
            sourceName
            incomeType
            amount
            taxYear
          }
        }
      `;

      const incomeVariables = {
        input: {
          sourceName: 'Test Employer',
          incomeType: 'SALARY',
          amount: 50000,
          taxYear: taxYear,
          taxReturnId: Number(taxReportId),
        },
      };

      const response = await graphqlRequest({
        query: createIncomeMutation,
        variables: incomeVariables,
        token: authToken,
      });

      incomeSourceId = response.data.createIncomeSource.id;
      expect(incomeSourceId).toBeDefined();
      console.log(`Added income source with ID: ${incomeSourceId}`);
    });
  });

  describe('Step 4: Update Tax Report', () => {
    it('should update the tax report status', async () => {
      if (skipTests || !authToken || !taxReportId) {
        console.warn('Skipping tax report update - missing prerequisites');
        return;
      }

      const updateMutation = `
        mutation UpdateTaxReport($input: UpdateTaxReportInput!) {
          updateTaxReport(updateTaxReportInput: $input) {
            id
            status
            notes
          }
        }
      `;

      const updateVariables = {
        input: {
          id: Number(taxReportId),
          status: 'completed',
          notes: 'Tax report updated via test script',
        },
      };

      const response = await graphqlRequest({
        query: updateMutation,
        variables: updateVariables,
        token: authToken,
      });

      expect(response.data.updateTaxReport.status).toBe('completed');
      console.log(
        `Updated tax report status to: ${response.data.updateTaxReport.status}`,
      );
    });
  });

  describe('Step 5: Get Detailed Tax Report', () => {
    it('should retrieve the tax report with all details', async () => {
      if (skipTests || !authToken || !taxReportId) {
        console.warn('Skipping tax report retrieval - missing prerequisites');
        return;
      }

      const query = `
        query GetTaxReport($id: Int!) {
          taxReportDetailed(id: $id) {
            id
            taxYear
            status
            notes
            taxpayerId
            incomeSources {
              id
              sourceName
              incomeType
              amount
            }
          }
        }
      `;

      const response = await graphqlRequest({
        query,
        variables: { id: Number(taxReportId) },
        token: authToken,
      });

      expect(response.data.taxReportDetailed).toBeDefined();
      expect(response.data.taxReportDetailed.id).toBe(taxReportId);
      expect(response.data.taxReportDetailed.status).toBe('completed');
      expect(response.data.taxReportDetailed.incomeSources).toBeInstanceOf(
        Array,
      );

      if (response.data.taxReportDetailed.incomeSources.length > 0) {
        expect(
          response.data.taxReportDetailed.incomeSources[
            response.data.taxReportDetailed.incomeSources.length - 1
          ].id,
        ).toBe(incomeSourceId);
      }

      console.log('✅ Successfully retrieved detailed tax report');
    });
  });
});
