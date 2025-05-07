# API Reference

This document provides a comprehensive reference for the API endpoints and GraphQL schema available in the Tax ID Return System.

## API Overview

The system implements both GraphQL and REST APIs:

- **GraphQL API**: The primary API interface, providing flexible data querying and manipulation
- **REST API**: Used for specific operations where REST is more appropriate

## Base URLs

- **GraphQL API**: `/graphql`
- **REST API**: `/api/v1`

## Authentication

Most API endpoints require authentication. The system uses JWT (JSON Web Token) for authentication.

### Authentication Headers

```
Authorization: Bearer <token>
```

## GraphQL API

### GraphQL Schema

The GraphQL schema is defined in the `apps/api/src/schema.gql` file, which is automatically generated from the GraphQL types and resolvers defined in the NestJS application.

### Main Query Types

```graphql
type Query {
  # User queries
  me: User
  user(id: Int!): User
  users(skip: Int, take: Int): [User!]!

  # Taxpayer queries
  taxpayer(id: String!): Taxpayer
  taxpayers(skip: Int, take: Int): [Taxpayer!]!

  # Tax return queries
  taxReturn(id: Int!): TaxReturn
  taxReturns(
    taxpayerId: String
    taxYear: Int
    skip: Int
    take: Int
  ): [TaxReturn!]!

  # Income source queries
  incomeSource(id: Int!): IncomeSource
  incomeSources(
    taxpayerId: String
    taxYear: Int
    skip: Int
    take: Int
  ): [IncomeSource!]!

  # Asset queries
  asset(id: Int!): Asset
  assets(
    taxpayerId: String
    taxYear: Int
    assetType: String
    skip: Int
    take: Int
  ): [Asset!]!
  realEstate(id: Int!): RealEstate
  vehicle(id: Int!): Vehicle

  # Debt queries
  debt(id: Int!): Debt
  debts(
    taxpayerId: String
    taxYear: Int
    debtType: String
    skip: Int
    take: Int
  ): [Debt!]!
  housingLoan(id: Int!): HousingLoan
  otherDebt(id: Int!): OtherDebt

  # Benefit queries
  benefit(id: Int!): Benefit
  benefits(taxpayerId: String, taxYear: Int, skip: Int, take: Int): [Benefit!]!

  # Government data queries
  govIncomeSources(taxpayerId: String!, taxYear: Int!): [GovIncomeSource!]!
  govAssets(taxpayerId: String!, taxYear: Int!): [GovAsset!]!
  govDebts(taxpayerId: String!, taxYear: Int!): [GovDebt!]!
  govBenefits(taxpayerId: String!, taxYear: Int!): [GovBenefit!]!
}
```

### Main Mutation Types

```graphql
type Mutation {
  # Authentication mutations
  signup(input: SignupInput!): AuthResponse!
  login(input: LoginInput!): AuthResponse!
  refreshToken(token: String!): AuthResponse!
  requestPasswordReset(email: String!): Boolean!
  resetPassword(token: String!, password: String!): Boolean!

  # User mutations
  updateUser(id: Int!, input: UpdateUserInput!): User!
  deleteUser(id: Int!): Boolean!

  # Taxpayer mutations
  createTaxpayer(input: CreateTaxpayerInput!): Taxpayer!
  updateTaxpayer(id: String!, input: UpdateTaxpayerInput!): Taxpayer!
  deleteTaxpayer(id: String!): Boolean!

  # Tax return mutations
  createTaxReturn(input: CreateTaxReturnInput!): TaxReturn!
  updateTaxReturn(id: Int!, input: UpdateTaxReturnInput!): TaxReturn!
  deleteTaxReturn(id: Int!): Boolean!
  submitTaxReturn(id: Int!): TaxReturn!

  # Income source mutations
  createIncomeSource(input: CreateIncomeSourceInput!): IncomeSource!
  updateIncomeSource(id: Int!, input: UpdateIncomeSourceInput!): IncomeSource!
  deleteIncomeSource(id: Int!): Boolean!

  # Asset mutations
  createAsset(input: CreateAssetInput!): Asset!
  updateAsset(id: Int!, input: UpdateAssetInput!): Asset!
  deleteAsset(id: Int!): Boolean!
  createRealEstate(input: CreateRealEstateInput!): RealEstate!
  updateRealEstate(id: Int!, input: UpdateRealEstateInput!): RealEstate!
  createVehicle(input: CreateVehicleInput!): Vehicle!
  updateVehicle(id: Int!, input: UpdateVehicleInput!): Vehicle!

  # Debt mutations
  createDebt(input: CreateDebtInput!): Debt!
  updateDebt(id: Int!, input: UpdateDebtInput!): Debt!
  deleteDebt(id: Int!): Boolean!
  createHousingLoan(input: CreateHousingLoanInput!): HousingLoan!
  updateHousingLoan(id: Int!, input: UpdateHousingLoanInput!): HousingLoan!
  createOtherDebt(input: CreateOtherDebtInput!): OtherDebt!
  updateOtherDebt(id: Int!, input: UpdateOtherDebtInput!): OtherDebt!

  # Benefit mutations
  createBenefit(input: CreateBenefitInput!): Benefit!
  updateBenefit(id: Int!, input: UpdateBenefitInput!): Benefit!
  deleteBenefit(id: Int!): Boolean!

  # Import government data mutations
  importGovData(taxpayerId: String!, taxYear: Int!): Boolean!
}
```

### Main GraphQL Types

```graphql
type User {
  id: Int!
  firstName: String!
  lastName: String!
  email: String!
  phone: String
  role: String!
  isActive: Boolean!
  isVerified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  taxpayerId: String
  taxpayer: Taxpayer
  taxReturns: [TaxReturn!]
}

type Taxpayer {
  id: String!
  firstName: String!
  lastName: String!
  fullAddress: String!
  streetAddress: String!
  postalCode: String!
  city: String!
  email: String
  phoneNumber: String
  taxYear: Int!
  dateCreated: DateTime!
  dateModified: DateTime!
  incomeSources: [IncomeSource!]
  assets: [Asset!]
  debts: [Debt!]
  benefits: [Benefit!]
  taxReturns: [TaxReturn!]
  user: User
  govIncomeSources: [GovIncomeSource!]
  govAssets: [GovAsset!]
  govDebts: [GovDebt!]
  govBenefits: [GovBenefit!]
}

type TaxReturn {
  id: Int!
  taxpayerId: String!
  taxYear: Int!
  userId: Int
  status: String!
  submissionDate: DateTime
  totalIncome: Decimal
  totalDeductions: Decimal
  totalTaxableIncome: Decimal
  totalTaxes: Decimal
  totalRefund: Decimal
  totalOwed: Decimal
  notes: String
  dateCreated: DateTime!
  dateModified: DateTime!
  taxpayer: Taxpayer!
  user: User
  incomeSources: [IncomeSource!]
  assets: [Asset!]
  debts: [Debt!]
  benefits: [Benefit!]
}

# Additional types omitted for brevity...
```

## REST API Endpoints

### Authentication

```
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/reset-password-request
POST /api/v1/auth/reset-password
```

### Users

```
GET /api/v1/users
GET /api/v1/users/:id
PUT /api/v1/users/:id
DELETE /api/v1/users/:id
GET /api/v1/users/me
```

### Taxpayers

```
GET /api/v1/taxpayers
GET /api/v1/taxpayers/:id
POST /api/v1/taxpayers
PUT /api/v1/taxpayers/:id
DELETE /api/v1/taxpayers/:id
```

### Tax Returns

```
GET /api/v1/tax-returns
GET /api/v1/tax-returns/:id
POST /api/v1/tax-returns
PUT /api/v1/tax-returns/:id
DELETE /api/v1/tax-returns/:id
POST /api/v1/tax-returns/:id/submit
```

### Income Sources

```
GET /api/v1/income-sources
GET /api/v1/income-sources/:id
POST /api/v1/income-sources
PUT /api/v1/income-sources/:id
DELETE /api/v1/income-sources/:id
```

### Assets

```
GET /api/v1/assets
GET /api/v1/assets/:id
POST /api/v1/assets
PUT /api/v1/assets/:id
DELETE /api/v1/assets/:id
```

### Real Estate

```
GET /api/v1/real-estates
GET /api/v1/real-estates/:id
POST /api/v1/real-estates
PUT /api/v1/real-estates/:id
```

### Vehicles

```
GET /api/v1/vehicles
GET /api/v1/vehicles/:id
POST /api/v1/vehicles
PUT /api/v1/vehicles/:id
```

### Debts

```
GET /api/v1/debts
GET /api/v1/debts/:id
POST /api/v1/debts
PUT /api/v1/debts/:id
DELETE /api/v1/debts/:id
```

### Housing Loans

```
GET /api/v1/housing-loans
GET /api/v1/housing-loans/:id
POST /api/v1/housing-loans
PUT /api/v1/housing-loans/:id
```

### Other Debts

```
GET /api/v1/other-debts
GET /api/v1/other-debts/:id
POST /api/v1/other-debts
PUT /api/v1/other-debts/:id
```

### Benefits

```
GET /api/v1/benefits
GET /api/v1/benefits/:id
POST /api/v1/benefits
PUT /api/v1/benefits/:id
DELETE /api/v1/benefits/:id
```

### Government Data Import

```
POST /api/v1/gov-data/import/:taxpayerId/:taxYear
```

## Error Handling

The API follows a consistent error format for both GraphQL and REST endpoints:

### GraphQL Errors

```json
{
  "errors": [
    {
      "message": "Error message",
      "extensions": {
        "code": "ERROR_CODE",
        "statusCode": 400
      }
    }
  ]
}
```

### REST Errors

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Error message",
  "code": "ERROR_CODE"
}
```

## Common Status Codes

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Permission denied
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

## Rate Limiting

API requests are subject to rate limiting to prevent abuse:

- 100 requests per minute per IP address
- 1000 requests per hour per user
