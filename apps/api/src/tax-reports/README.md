# Government Data API Integration

This API allows authorized government systems to update taxpayer data in the Tax ID Return system. The data is stored separately from user-submitted data and is used as a reference for pre-filling tax returns.

## Authentication

The API uses an API key for authentication. The key is sent in the request body (not in headers) for maximum compatibility with different government systems.

Required environment variables:

- `GOV_API_KEYS` - Comma-separated list of valid API keys

Example:

```
GOV_API_KEYS=gov-api-key-123,gov-api-key-456,gov-api-key-789
```

## API Endpoints

### Update Government Data for a Taxpayer

Updates or creates government data records for a specific taxpayer.

**URL**: `POST /government-data/taxpayer/:taxpayerId`

**Parameters**:

- `taxpayerId` (in path): The unique identifier of the taxpayer

**Request Body**:

```json
{
  "apiKey": "gov-api-key-123",
  "dataSource": "Tax Authority",
  "incomeSources": [
    {
      "sourceName": "Employer Corp",
      "sourceIdNumber": "EMP12345",
      "incomeType": "salary",
      "amount": 75000,
      "isActive": true,
      "taxYear": 2023
    }
  ],
  "assets": [
    {
      "assetType": "real_estate",
      "isActive": true,
      "taxYear": 2023,
      "govRealEstate": {
        "propertyId": "PROP123456",
        "address": "123 Main St, Anytown, AT 12345",
        "propertyValue": 450000,
        "purchaseYear": 2018
      }
    },
    {
      "assetType": "vehicle",
      "isActive": true,
      "taxYear": 2023,
      "govVehicle": {
        "registrationNumber": "ABC123",
        "purchaseYear": 2020,
        "purchasePrice": 35000
      }
    }
  ],
  "debts": [
    {
      "debtType": "housing_loan",
      "isActive": true,
      "taxYear": 2023,
      "govHousingLoan": {
        "lenderName": "National Bank",
        "lenderId": "NB12345",
        "loanNumber": "LOAN987654",
        "propertyAddress": "123 Main St, Anytown, AT 12345",
        "loanTermYears": 30,
        "annualPayments": 12000,
        "principalRepayment": 8000,
        "interestExpenses": 4000,
        "remainingBalance": 280000
      }
    },
    {
      "debtType": "other_debt",
      "isActive": true,
      "taxYear": 2023,
      "govOtherDebt": {
        "debtType": "student_loan",
        "debtIdentifier": "SL12345",
        "creditorName": "Student Loan Agency",
        "interestExpenses": 1200,
        "remainingBalance": 25000
      }
    }
  ],
  "benefits": [
    {
      "providerName": "Social Security Administration",
      "benefitType": "unemployment",
      "amount": 12000,
      "isActive": true,
      "taxYear": 2023
    }
  ]
}
```

**Response**:

```json
{
  "message": "Government data for taxpayer TP123456789 has been successfully updated",
  "updatedAt": "2023-05-15T10:30:00.000Z",
  "dataSource": "Tax Authority",
  "data": {
    "incomeSources": 1,
    "assets": 2,
    "debts": 2,
    "benefits": 1
  }
}
```

## Data Model

### Income Sources

Government-provided income data such as employment, investments, etc.

### Assets

Asset data from government records:

- Real Estate: Property records
- Vehicles: Vehicle registration data

### Debts

Debt information:

- Housing Loans: Mortgage and property-related loans
- Other Debts: Student loans, personal loans, etc.

### Benefits

Government benefits received by the taxpayer.

## Data Processing

When updating government data:

1. Existing data for the same tax year is deleted and replaced with new data
2. Each data category (income, assets, debts, benefits) is processed independently
3. For assets and debts, related child records (real estate, vehicle, housing loan, other debt) are created as needed

## Best Practices

1. Always include all data for a specific tax year in a single request
2. Include the data source in each request for audit purposes
3. For large datasets, consider breaking up requests by tax year
4. Ensure the taxpayer ID exists before sending data
