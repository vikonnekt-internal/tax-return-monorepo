# Data Models

This document provides a detailed overview of the data models used in the Tax ID Return System.

## Database Overview

The system uses PostgreSQL as the relational database and Prisma as the ORM (Object-Relational Mapping) tool. The database schema is defined in the Prisma schema file located at `packages/database/prisma/schema.prisma`.

## Core Models

### User

The User model represents the application users who can log in and manage their tax information.

```prisma
model User {
  id                    Int       @id @default(autoincrement())
  firstName             String
  lastName              String
  email                 String    @unique
  password              String
  phone                 String?
  resetToken            String?   @db.Text
  resetTokenExpiry      DateTime?
  verificationToken     String?
  verificationTokenDate DateTime?
  role                  String    @default("user")
  isActive              Boolean   @default(true)
  isVerified            Boolean   @default(false)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @default(now()) @updatedAt
  taxpayerId            String?   @unique
  taxpayer              Taxpayer? @relation(fields: [taxpayerId], references: [id])

  // Relations
  taxReturns TaxReturn[]
}
```

### Taxpayer

The Taxpayer model represents individuals who file tax returns. This model contains personal information and serves as a central entity that links to various aspects of a person's tax information.

```prisma
model Taxpayer {
  id            String   @id @map("taxpayer_id") // Icelandic kennitala
  firstName     String
  lastName      String
  fullAddress   String
  streetAddress String
  postalCode    String
  city          String
  email         String?
  phoneNumber   String?
  taxYear       Int
  dateCreated   DateTime @default(now())
  dateModified  DateTime @default(now()) @updatedAt

  // Relations
  incomeSources IncomeSource[]
  assets        Asset[]
  debts         Debt[]
  benefits      Benefit[]
  taxReturns    TaxReturn[]
  user          User?

  // Government data relations
  govIncomeSources GovIncomeSource[]
  govAssets        GovAsset[]
  govDebts         GovDebt[]
  govBenefits      GovBenefit[]

  @@index([taxYear])
}
```

### TaxReturn

The TaxReturn model represents a tax return submission for a specific tax year.

```prisma
model TaxReturn {
  id                 Int       @id @default(autoincrement())
  taxpayerId         String    @map("taxpayer_id")
  taxYear            Int
  userId             Int? // Optional: if a User is linked to this return
  status             String    @default("draft") // e.g., "draft", "submitted", "processed", "rejected"
  submissionDate     DateTime?
  totalIncome        Decimal?  @db.Decimal(15, 2)
  totalDeductions    Decimal?  @db.Decimal(15, 2)
  totalTaxableIncome Decimal?  @db.Decimal(15, 2)
  totalTaxes         Decimal?  @db.Decimal(15, 2)
  totalRefund        Decimal?  @db.Decimal(15, 2)
  totalOwed          Decimal?  @db.Decimal(15, 2)
  notes              String?   @db.Text
  dateCreated        DateTime  @default(now())
  dateModified       DateTime  @default(now()) @updatedAt

  // Relations
  taxpayer      Taxpayer       @relation(fields: [taxpayerId], references: [id])
  user          User?          @relation(fields: [userId], references: [id])
  incomeSources IncomeSource[]
  assets        Asset[]
  debts         Debt[]
  benefits      Benefit[]

  @@unique([taxpayerId, taxYear])
  @@index([taxpayerId])
  @@index([taxYear])
  @@index([userId])
  @@index([status])
}
```

### IncomeSource

The IncomeSource model represents a source of income for a taxpayer.

```prisma
model IncomeSource {
  id             Int      @id @default(autoincrement())
  taxpayerId     String   @map("taxpayer_id")
  taxReturnId    Int?
  sourceName     String
  sourceIdNumber String?
  incomeType     String
  amount         Decimal  @db.Decimal(15, 2)
  taxYear        Int
  dateCreated    DateTime @default(now())
  dateModified   DateTime @default(now()) @updatedAt

  // Relations
  taxpayer  Taxpayer   @relation(fields: [taxpayerId], references: [id])
  taxReturn TaxReturn? @relation(fields: [taxReturnId], references: [id])

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([incomeType])
  @@index([taxReturnId])
}
```

## Asset Management Models

### Asset (Parent Model)

The Asset model serves as a parent model for different types of assets.

```prisma
model Asset {
  id           Int      @id @default(autoincrement())
  taxpayerId   String   @map("taxpayer_id")
  taxReturnId  Int?
  assetType    String // "real_estate" or "vehicle"
  taxYear      Int
  dateCreated  DateTime @default(now())
  dateModified DateTime @default(now()) @updatedAt

  // Relations
  taxpayer  Taxpayer   @relation(fields: [taxpayerId], references: [id])
  taxReturn TaxReturn? @relation(fields: [taxReturnId], references: [id])

  // Child asset relations (one-to-one)
  realEstate RealEstate?
  vehicle    Vehicle?

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([assetType])
  @@index([taxReturnId])
}
```

### RealEstate

The RealEstate model represents a real estate property owned by a taxpayer.

```prisma
model RealEstate {
  id            Int     @id @default(autoincrement())
  assetId       Int     @unique // Link to parent Asset
  propertyId    String  @unique
  address       String
  propertyValue Decimal @db.Decimal(15, 2)
  purchaseYear  Int?

  // Relation to parent Asset
  asset Asset @relation(fields: [assetId], references: [id], onDelete: Cascade)
}
```

### Vehicle

The Vehicle model represents a vehicle owned by a taxpayer.

```prisma
model Vehicle {
  id                 Int     @id @default(autoincrement())
  assetId            Int     @unique // Link to parent Asset
  registrationNumber String
  purchaseYear       Int?
  purchasePrice      Decimal @db.Decimal(15, 2)

  // Relation to parent Asset
  asset Asset @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@index([registrationNumber])
}
```

## Debt Models

### Debt (Parent Model)

The Debt model serves as a parent model for different types of debts.

```prisma
model Debt {
  id           Int      @id @default(autoincrement())
  taxpayerId   String   @map("taxpayer_id")
  taxReturnId  Int?
  debtType     String // "housing_loan" or "other_debt"
  taxYear      Int
  dateCreated  DateTime @default(now())
  dateModified DateTime @default(now()) @updatedAt

  // Relations
  taxpayer  Taxpayer   @relation(fields: [taxpayerId], references: [id])
  taxReturn TaxReturn? @relation(fields: [taxReturnId], references: [id])

  // Child debt relations (one-to-one)
  housingLoan HousingLoan?
  otherDebt   OtherDebt?

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([debtType])
  @@index([taxReturnId])
}
```

### HousingLoan

The HousingLoan model represents a housing loan or mortgage.

```prisma
model HousingLoan {
  id                 Int      @id @default(autoincrement())
  debtId             Int      @unique // Link to parent Debt
  lenderName         String
  loanNumber         String?
  originalAmount     Decimal  @db.Decimal(15, 2)
  remainingBalance   Decimal  @db.Decimal(15, 2)
  interestRate       Decimal? @db.Decimal(5, 2)
  indexationBalance  Decimal? @db.Decimal(15, 2)
  monthlyPayment     Decimal? @db.Decimal(15, 2)
  originationDate    DateTime?

  // Relation to parent Debt
  debt Debt @relation(fields: [debtId], references: [id], onDelete: Cascade)
}
```

### OtherDebt

The OtherDebt model represents other types of debt (non-housing loans).

```prisma
model OtherDebt {
  id               Int      @id @default(autoincrement())
  debtId           Int      @unique // Link to parent Debt
  lenderName       String
  debtDescription  String?
  originalAmount   Decimal  @db.Decimal(15, 2)
  remainingBalance Decimal  @db.Decimal(15, 2)
  interestRate     Decimal? @db.Decimal(5, 2)
  monthlyPayment   Decimal? @db.Decimal(15, 2)
  originationDate  DateTime?

  // Relation to parent Debt
  debt Debt @relation(fields: [debtId], references: [id], onDelete: Cascade)
}
```

### Benefit

The Benefit model represents benefits received by a taxpayer.

```prisma
model Benefit {
  id           Int      @id @default(autoincrement())
  taxpayerId   String   @map("taxpayer_id")
  taxReturnId  Int?
  benefitType  String
  benefitName  String
  amount       Decimal  @db.Decimal(15, 2)
  taxYear      Int
  dateCreated  DateTime @default(now())
  dateModified DateTime @default(now()) @updatedAt

  // Relations
  taxpayer  Taxpayer   @relation(fields: [taxpayerId], references: [id])
  taxReturn TaxReturn? @relation(fields: [taxReturnId], references: [id])

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([benefitType])
  @@index([taxReturnId])
}
```

## Government Data Models

These models represent data provided by government sources, which can be used to pre-fill tax returns.

### GovIncomeSource

```prisma
model GovIncomeSource {
  id             Int      @id @default(autoincrement())
  taxpayerId     String   @map("taxpayer_id")
  sourceName     String
  sourceIdNumber String?
  incomeType     String
  amount         Decimal  @db.Decimal(15, 2)
  taxYear        Int
  dateImported   DateTime @default(now())

  // Relations
  taxpayer Taxpayer @relation(fields: [taxpayerId], references: [id])

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([incomeType])
}
```

### GovAsset

```prisma
model GovAsset {
  id           Int      @id @default(autoincrement())
  taxpayerId   String   @map("taxpayer_id")
  assetType    String // "real_estate" or "vehicle"
  taxYear      Int
  dateImported DateTime @default(now())

  // Relations
  taxpayer Taxpayer @relation(fields: [taxpayerId], references: [id])

  // Child asset relations (one-to-one)
  realEstate GovRealEstate?
  vehicle    GovVehicle?

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([assetType])
}
```

### GovDebt

```prisma
model GovDebt {
  id           Int      @id @default(autoincrement())
  taxpayerId   String   @map("taxpayer_id")
  debtType     String // "housing_loan" or "other_debt"
  taxYear      Int
  dateImported DateTime @default(now())

  // Relations
  taxpayer Taxpayer @relation(fields: [taxpayerId], references: [id])

  // Child debt relations (one-to-one)
  housingLoan GovHousingLoan?
  otherDebt   GovOtherDebt?

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([debtType])
}
```

### GovBenefit

```prisma
model GovBenefit {
  id           Int      @id @default(autoincrement())
  taxpayerId   String   @map("taxpayer_id")
  benefitType  String
  benefitName  String
  amount       Decimal  @db.Decimal(15, 2)
  taxYear      Int
  dateImported DateTime @default(now())

  // Relations
  taxpayer Taxpayer @relation(fields: [taxpayerId], references: [id])

  @@index([taxpayerId])
  @@index([taxYear])
  @@index([benefitType])
}
```

## Relationships

### One-to-One Relationships

- A User can have one Taxpayer profile (optional)
- An Asset can have one RealEstate OR one Vehicle
- A Debt can have one HousingLoan OR one OtherDebt
- A GovAsset can have one GovRealEstate OR one GovVehicle
- A GovDebt can have one GovHousingLoan OR one GovOtherDebt

### One-to-Many Relationships

- A Taxpayer can have multiple IncomeSource, Asset, Debt, Benefit, TaxReturn entries
- A TaxReturn can have multiple IncomeSource, Asset, Debt, Benefit entries
- A User can have multiple TaxReturn entries

### Many-to-One Relationships

- Multiple IncomeSource, Asset, Debt, Benefit entries belong to one Taxpayer
- Multiple IncomeSource, Asset, Debt, Benefit entries can belong to one TaxReturn
- Multiple TaxReturn entries can belong to one User

## Indexing Strategy

The database uses indexes to optimize query performance:

- Primary keys on all tables (`@id`)
- Unique constraints where appropriate (`@unique`)
- Foreign key indexes for relationship fields
- Composite indexes for frequently queried combinations
- Indexes on frequently filtered fields (e.g., `taxYear`, `status`)

## Cascade Behavior

The system uses cascading deletes for certain relationships:

- When a parent Asset is deleted, its child RealEstate or Vehicle is also deleted
- When a parent Debt is deleted, its child HousingLoan or OtherDebt is also deleted
