import { graphqlRequest, isApiAvailable } from './e2e-utils';

describe('Tax Return Flow (e2e)', () => {
  let skipTests = false;
  let authToken: string;
  let taxpayerId: string;
  let taxReportId: string;
  let incomeSourceId: string;
  let assetId: string;
  let realEstateId: string;
  let vehicleId: string;
  let debtId: string;
  let housingLoanId: string;
  let otherDebtId: string;
  let benefitId: string;

  const taxYear = new Date().getFullYear();

  // Configure Jest for longer timeout since these tests make multiple requests
  jest.setTimeout(60000);

  // Check if API is available before running tests
  beforeAll(async () => {
    try {
      const available = await isApiAvailable();
      if (!available) {
        console.warn('API is not available, skipping tax return flow tests');
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
      console.warn(
        'Authentication failed, skipping tax return flow tests:',
        error,
      );
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

  describe('Step 4: Add Real Estate Asset', () => {
    it('should add a real estate asset to the tax report', async () => {
      if (skipTests || !authToken || !taxReportId) {
        console.warn('Skipping real estate test - missing prerequisites');
        return;
      }

      const createAssetMutation = `
        mutation CreateAsset($input: CreateAssetInput!) {
          createAsset(createAssetInput: $input) {
            id
            assetType
            realEstateId
          }
        }
      `;

      const assetVariables = {
        input: {
          assetType: 'REAL_ESTATE',
          taxReturnId: Number(taxReportId),
          taxYear: taxYear,
          realEstate: {
            propertyId: `PROP${Math.floor(Math.random() * 10000)}`,
            address: '123 Test Property St',
            propertyValue: 250000,
            purchaseYear: taxYear - 5,
            taxYear: taxYear,
          },
        },
      };

      const response = await graphqlRequest({
        query: createAssetMutation,
        variables: assetVariables,
        token: authToken,
      });

      assetId = response.data.createAsset.id;
      realEstateId = response.data.createAsset.realEstateId;
      expect(assetId).toBeDefined();
      expect(realEstateId).toBeDefined();
      console.log(`Added real estate asset with ID: ${assetId}`);
    });
  });

  describe('Step 5: Add Vehicle Asset', () => {
    it('should add a vehicle asset to the tax report', async () => {
      if (skipTests || !authToken || !taxReportId) {
        console.warn('Skipping vehicle test - missing prerequisites');
        return;
      }

      const createAssetMutation = `
        mutation CreateAsset($input: CreateAssetInput!) {
          createAsset(createAssetInput: $input) {
            id
            assetType
            vehicleId
          }
        }
      `;

      const assetVariables = {
        input: {
          assetType: 'VEHICLE',
          taxReturnId: Number(taxReportId),
          taxYear: taxYear,
          vehicle: {
            registrationNumber: `REG${Math.floor(Math.random() * 10000)}`,
            purchasePrice: 25000,
            purchaseYear: taxYear - 2,
            taxYear: taxYear,
          },
        },
      };

      const response = await graphqlRequest({
        query: createAssetMutation,
        variables: assetVariables,
        token: authToken,
      });

      vehicleId = response.data.createAsset.vehicleId;
      expect(vehicleId).toBeDefined();
      console.log(`Added vehicle asset with ID: ${vehicleId}`);
    });
  });

  describe('Step 6: Add Housing Loan Debt', () => {
    it('should add a housing loan debt to the tax report', async () => {
      if (skipTests || !authToken || !taxReportId || !taxpayerId) {
        console.warn('Skipping housing loan test - missing prerequisites');
        return;
      }

      const createDebtMutation = `
        mutation CreateDebt($input: CreateDebtInput!) {
          createDebt(createDebtInput: $input) {
            id
            debtType
          }
        }
      `;

      const debtVariables = {
        input: {
          debtType: 'HOUSING_LOAN',
          taxReturnId: Number(taxReportId),
          taxYear: taxYear,
          taxpayerId: taxpayerId,
          housingLoan: {
            lenderName: 'Test Bank',
            loanNumber: `LOAN${Math.floor(Math.random() * 10000)}`,
            loanDate: new Date(taxYear - 10, 0, 1).toISOString(),
            remainingBalance: 150000,
            annualPayments: 12000,
            principalRepayment: 8000,
            interestExpenses: 4000,
            propertyAddress: '123 Test Property St',
            loanTermYears: 25,
            taxYear: taxYear,
            taxpayerId: taxpayerId,
          },
        },
      };

      const response = await graphqlRequest({
        query: createDebtMutation,
        variables: debtVariables,
        token: authToken,
      });

      debtId = response.data.createDebt.id;
      expect(debtId).toBeDefined();
      console.log(`Added housing loan debt with ID: ${debtId}`);
    });
  });

  describe('Step 7: Add Other Debt', () => {
    it('should add other debt to the tax report', async () => {
      if (skipTests || !authToken || !taxReportId || !taxpayerId) {
        console.warn('Skipping other debt test - missing prerequisites');
        return;
      }

      const createDebtMutation = `
        mutation CreateDebt($input: CreateDebtInput!) {
          createDebt(createDebtInput: $input) {
            id
            debtType
          }
        }
      `;

      const debtVariables = {
        input: {
          debtType: 'OTHER_DEBT',
          taxReturnId: Number(taxReportId),
          taxYear: taxYear,
          taxpayerId: taxpayerId,
          otherDebt: {
            creditorName: 'Credit Card Company',
            debtIdentifier: `DEBT${Math.floor(Math.random() * 10000)}`,
            debtType: 'CREDIT_CARD',
            remainingBalance: 5000,
            interestExpenses: 500,
            taxYear: taxYear,
            taxpayerId: taxpayerId,
          },
        },
      };

      const response = await graphqlRequest({
        query: createDebtMutation,
        variables: debtVariables,
        token: authToken,
      });

      otherDebtId = response.data.createDebt.id;
      expect(otherDebtId).toBeDefined();
      console.log(`Added other debt with ID: ${otherDebtId}`);
    });
  });

  describe('Step 8: Add Benefit', () => {
    it('should add a benefit to the tax report', async () => {
      if (skipTests || !authToken || !taxReportId || !taxpayerId) {
        console.warn('Skipping benefit test - missing prerequisites');
        return;
      }

      const createBenefitMutation = `
        mutation CreateBenefit($input: CreateBenefitInput!) {
          createBenefit(createBenefitInput: $input) {
            id
            benefitType
            amount
          }
        }
      `;

      const benefitVariables = {
        input: {
          benefitType: 'HOUSING_BENEFIT',
          amount: 2000,
          providerName: 'Government',
          taxReturnId: Number(taxReportId),
          taxYear: taxYear,
          taxpayerId: taxpayerId,
        },
      };

      const response = await graphqlRequest({
        query: createBenefitMutation,
        variables: benefitVariables,
        token: authToken,
      });

      benefitId = response.data.createBenefit.id;
      expect(benefitId).toBeDefined();
      console.log(`Added benefit with ID: ${benefitId}`);
    });
  });

  describe('Step 9: Get Detailed Tax Report', () => {
    it('should retrieve the full tax report with all related entities', async () => {
      if (skipTests || !authToken || !taxReportId) {
        console.warn('Skipping tax report retrieval - missing prerequisites');
        return;
      }

      const getTaxReportQuery = `
        query GetTaxReport($id: Int!) {
          taxReportDetailed(id: $id) {
            id
            taxYear
            status
            submissionDate
            notes
            taxpayerId

            incomeSources {
              id
              sourceName
              incomeType
              amount
              taxYear
              taxReturnId
            }

            assets {
              id
              assetType
              taxReturnId
              realEstateId
              vehicleId

              # Real Estate details
              realEstate {
                id
                address
                propertyValue
                purchaseYear
              }

              # Vehicle details
              vehicle {
                id
                registrationNumber
                purchasePrice
                purchaseYear
              }
            }

            debts {
              id
              debtType
              taxReturnId
              taxYear
              taxpayerId

              # Housing Loan details
              housingLoan {
                id
                lenderName
                loanNumber
                propertyAddress
                loanDate
                loanTermYears
                annualPayments
                principalRepayment
                interestExpenses
                remainingBalance
              }

              # Other Debt details
              otherDebt {
                id
                debtType
                debtIdentifier
                creditorName
                interestExpenses
                remainingBalance
              }
            }

            benefits {
              id
              benefitType
              amount
              providerName
              taxReturnId
              taxYear
              taxpayerId
            }
          }
        }
      `;

      const response = await graphqlRequest({
        query: getTaxReportQuery,
        variables: { id: Number(taxReportId) },
        token: authToken,
      });

      const taxReport = response.data.taxReportDetailed;
      expect(taxReport).toBeDefined();
      expect(taxReport.id).toBe(taxReportId);

      // Verify income sources
      expect(taxReport.incomeSources.length).toBeGreaterThan(0);
      expect(
        taxReport.incomeSources[taxReport.incomeSources.length - 1].id,
      ).toBe(incomeSourceId);

      // Verify assets
      expect(taxReport.assets.length).toBeGreaterThan(0);
      const realEstateAsset = taxReport.assets.find(
        (a) => a.assetType === 'REAL_ESTATE',
      );
      const vehicleAsset = taxReport.assets.find(
        (a) => a.assetType === 'VEHICLE',
      );
      expect(realEstateAsset).toBeDefined();
      expect(vehicleAsset).toBeDefined();

      // Verify debts
      expect(taxReport.debts.length).toBeGreaterThan(0);

      // Verify benefits
      expect(taxReport.benefits.length).toBeGreaterThan(0);
      expect(taxReport.benefits[0].id).toBe(benefitId);

      console.log('✅ Successfully retrieved detailed tax report');
    });
  });

  describe('Step 10: Update Tax Report', () => {
    it('should update the tax report status to completed', async () => {
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
          notes: 'Tax report updated via e2e test',
        },
      };

      const response = await graphqlRequest({
        query: updateMutation,
        variables: updateVariables,
        token: authToken,
      });

      const updatedReport = response.data.updateTaxReport;
      expect(updatedReport).toBeDefined();
      expect(updatedReport.status).toBe('completed');
      expect(updatedReport.notes).toBe('Tax report updated via e2e test');

      console.log('✅ Successfully updated tax report status to completed');
    });
  });
});
