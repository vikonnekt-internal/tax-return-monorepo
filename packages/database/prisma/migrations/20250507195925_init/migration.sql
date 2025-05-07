-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "verificationToken" TEXT,
    "verificationTokenDate" TIMESTAMP(3),
    "role" TEXT NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taxpayerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxReturn" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "userId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "submissionDate" TIMESTAMP(3),
    "totalIncome" DECIMAL(15,2),
    "totalDeductions" DECIMAL(15,2),
    "totalTaxableIncome" DECIMAL(15,2),
    "totalTaxes" DECIMAL(15,2),
    "totalRefund" DECIMAL(15,2),
    "totalOwed" DECIMAL(15,2),
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxpayer" (
    "taxpayer_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Taxpayer_pkey" PRIMARY KEY ("taxpayer_id")
);

-- CreateTable
CREATE TABLE "IncomeSource" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "taxReturnId" INTEGER,
    "sourceName" TEXT NOT NULL,
    "sourceIdNumber" TEXT,
    "incomeType" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncomeSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "taxReturnId" INTEGER,
    "assetType" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstate" (
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "propertyId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "propertyValue" DECIMAL(15,2) NOT NULL,
    "purchaseYear" INTEGER,

    CONSTRAINT "RealEstate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "purchaseYear" INTEGER,
    "purchasePrice" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debt" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "taxReturnId" INTEGER,
    "debtType" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousingLoan" (
    "id" SERIAL NOT NULL,
    "debtId" INTEGER NOT NULL,
    "lenderName" TEXT NOT NULL,
    "lenderId" TEXT,
    "loanNumber" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "loanDate" TIMESTAMP(3) NOT NULL,
    "loanTermYears" INTEGER,
    "annualPayments" DECIMAL(15,2) NOT NULL,
    "principalRepayment" DECIMAL(15,2) NOT NULL,
    "interestExpenses" DECIMAL(15,2) NOT NULL,
    "remainingBalance" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "HousingLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherDebt" (
    "id" SERIAL NOT NULL,
    "debtId" INTEGER NOT NULL,
    "debtType" TEXT NOT NULL,
    "debtIdentifier" TEXT,
    "creditorName" TEXT NOT NULL,
    "interestExpenses" DECIMAL(15,2) NOT NULL,
    "remainingBalance" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "OtherDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "taxReturnId" INTEGER,
    "providerName" TEXT NOT NULL,
    "benefitType" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovIncomeSource" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceIdNumber" TEXT,
    "incomeType" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovIncomeSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovAsset" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovRealEstate" (
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "propertyId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "propertyValue" DECIMAL(15,2) NOT NULL,
    "purchaseYear" INTEGER,

    CONSTRAINT "GovRealEstate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovVehicle" (
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "purchaseYear" INTEGER,
    "purchasePrice" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "GovVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovDebt" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "debtType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovHousingLoan" (
    "id" SERIAL NOT NULL,
    "debtId" INTEGER NOT NULL,
    "lenderName" TEXT NOT NULL,
    "lenderId" TEXT,
    "loanNumber" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "loanTermYears" INTEGER,
    "annualPayments" DECIMAL(15,2) NOT NULL,
    "principalRepayment" DECIMAL(15,2) NOT NULL,
    "interestExpenses" DECIMAL(15,2) NOT NULL,
    "remainingBalance" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "GovHousingLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovOtherDebt" (
    "id" SERIAL NOT NULL,
    "debtId" INTEGER NOT NULL,
    "debtType" TEXT NOT NULL,
    "debtIdentifier" TEXT,
    "creditorName" TEXT NOT NULL,
    "interestExpenses" DECIMAL(15,2) NOT NULL,
    "remainingBalance" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "GovOtherDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovBenefit" (
    "id" SERIAL NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "benefitType" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "taxYear" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_taxpayerId_key" ON "User"("taxpayerId");

-- CreateIndex
CREATE INDEX "TaxReturn_taxpayer_id_idx" ON "TaxReturn"("taxpayer_id");

-- CreateIndex
CREATE INDEX "TaxReturn_taxYear_idx" ON "TaxReturn"("taxYear");

-- CreateIndex
CREATE INDEX "TaxReturn_userId_idx" ON "TaxReturn"("userId");

-- CreateIndex
CREATE INDEX "TaxReturn_status_idx" ON "TaxReturn"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TaxReturn_taxpayer_id_taxYear_key" ON "TaxReturn"("taxpayer_id", "taxYear");

-- CreateIndex
CREATE INDEX "Taxpayer_taxYear_idx" ON "Taxpayer"("taxYear");

-- CreateIndex
CREATE INDEX "IncomeSource_taxpayer_id_idx" ON "IncomeSource"("taxpayer_id");

-- CreateIndex
CREATE INDEX "IncomeSource_taxYear_idx" ON "IncomeSource"("taxYear");

-- CreateIndex
CREATE INDEX "IncomeSource_incomeType_idx" ON "IncomeSource"("incomeType");

-- CreateIndex
CREATE INDEX "IncomeSource_taxReturnId_idx" ON "IncomeSource"("taxReturnId");

-- CreateIndex
CREATE INDEX "Asset_taxpayer_id_idx" ON "Asset"("taxpayer_id");

-- CreateIndex
CREATE INDEX "Asset_taxYear_idx" ON "Asset"("taxYear");

-- CreateIndex
CREATE INDEX "Asset_assetType_idx" ON "Asset"("assetType");

-- CreateIndex
CREATE INDEX "Asset_taxReturnId_idx" ON "Asset"("taxReturnId");

-- CreateIndex
CREATE UNIQUE INDEX "RealEstate_assetId_key" ON "RealEstate"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "RealEstate_propertyId_key" ON "RealEstate"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_assetId_key" ON "Vehicle"("assetId");

-- CreateIndex
CREATE INDEX "Vehicle_registrationNumber_idx" ON "Vehicle"("registrationNumber");

-- CreateIndex
CREATE INDEX "Debt_taxpayer_id_idx" ON "Debt"("taxpayer_id");

-- CreateIndex
CREATE INDEX "Debt_taxYear_idx" ON "Debt"("taxYear");

-- CreateIndex
CREATE INDEX "Debt_debtType_idx" ON "Debt"("debtType");

-- CreateIndex
CREATE INDEX "Debt_taxReturnId_idx" ON "Debt"("taxReturnId");

-- CreateIndex
CREATE UNIQUE INDEX "HousingLoan_debtId_key" ON "HousingLoan"("debtId");

-- CreateIndex
CREATE INDEX "HousingLoan_loanNumber_idx" ON "HousingLoan"("loanNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OtherDebt_debtId_key" ON "OtherDebt"("debtId");

-- CreateIndex
CREATE INDEX "OtherDebt_debtType_idx" ON "OtherDebt"("debtType");

-- CreateIndex
CREATE INDEX "Benefit_taxpayer_id_idx" ON "Benefit"("taxpayer_id");

-- CreateIndex
CREATE INDEX "Benefit_taxYear_idx" ON "Benefit"("taxYear");

-- CreateIndex
CREATE INDEX "Benefit_taxReturnId_idx" ON "Benefit"("taxReturnId");

-- CreateIndex
CREATE INDEX "GovIncomeSource_taxpayer_id_idx" ON "GovIncomeSource"("taxpayer_id");

-- CreateIndex
CREATE INDEX "GovIncomeSource_incomeType_idx" ON "GovIncomeSource"("incomeType");

-- CreateIndex
CREATE INDEX "GovIncomeSource_isActive_idx" ON "GovIncomeSource"("isActive");

-- CreateIndex
CREATE INDEX "GovIncomeSource_taxYear_idx" ON "GovIncomeSource"("taxYear");

-- CreateIndex
CREATE INDEX "GovAsset_taxpayer_id_idx" ON "GovAsset"("taxpayer_id");

-- CreateIndex
CREATE INDEX "GovAsset_assetType_idx" ON "GovAsset"("assetType");

-- CreateIndex
CREATE INDEX "GovAsset_isActive_idx" ON "GovAsset"("isActive");

-- CreateIndex
CREATE INDEX "GovAsset_taxYear_idx" ON "GovAsset"("taxYear");

-- CreateIndex
CREATE UNIQUE INDEX "GovRealEstate_assetId_key" ON "GovRealEstate"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "GovVehicle_assetId_key" ON "GovVehicle"("assetId");

-- CreateIndex
CREATE INDEX "GovDebt_taxpayer_id_idx" ON "GovDebt"("taxpayer_id");

-- CreateIndex
CREATE INDEX "GovDebt_debtType_idx" ON "GovDebt"("debtType");

-- CreateIndex
CREATE INDEX "GovDebt_isActive_idx" ON "GovDebt"("isActive");

-- CreateIndex
CREATE INDEX "GovDebt_taxYear_idx" ON "GovDebt"("taxYear");

-- CreateIndex
CREATE UNIQUE INDEX "GovHousingLoan_debtId_key" ON "GovHousingLoan"("debtId");

-- CreateIndex
CREATE UNIQUE INDEX "GovOtherDebt_debtId_key" ON "GovOtherDebt"("debtId");

-- CreateIndex
CREATE INDEX "GovBenefit_taxpayer_id_idx" ON "GovBenefit"("taxpayer_id");

-- CreateIndex
CREATE INDEX "GovBenefit_benefitType_idx" ON "GovBenefit"("benefitType");

-- CreateIndex
CREATE INDEX "GovBenefit_isActive_idx" ON "GovBenefit"("isActive");

-- CreateIndex
CREATE INDEX "GovBenefit_taxYear_idx" ON "GovBenefit"("taxYear");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_taxpayerId_fkey" FOREIGN KEY ("taxpayerId") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxReturn" ADD CONSTRAINT "TaxReturn_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxReturn" ADD CONSTRAINT "TaxReturn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeSource" ADD CONSTRAINT "IncomeSource_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeSource" ADD CONSTRAINT "IncomeSource_taxReturnId_fkey" FOREIGN KEY ("taxReturnId") REFERENCES "TaxReturn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_taxReturnId_fkey" FOREIGN KEY ("taxReturnId") REFERENCES "TaxReturn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealEstate" ADD CONSTRAINT "RealEstate_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_taxReturnId_fkey" FOREIGN KEY ("taxReturnId") REFERENCES "TaxReturn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingLoan" ADD CONSTRAINT "HousingLoan_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "Debt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherDebt" ADD CONSTRAINT "OtherDebt_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "Debt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_taxReturnId_fkey" FOREIGN KEY ("taxReturnId") REFERENCES "TaxReturn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovIncomeSource" ADD CONSTRAINT "GovIncomeSource_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovAsset" ADD CONSTRAINT "GovAsset_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovRealEstate" ADD CONSTRAINT "GovRealEstate_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "GovAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovVehicle" ADD CONSTRAINT "GovVehicle_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "GovAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovDebt" ADD CONSTRAINT "GovDebt_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovHousingLoan" ADD CONSTRAINT "GovHousingLoan_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "GovDebt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovOtherDebt" ADD CONSTRAINT "GovOtherDebt_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "GovDebt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovBenefit" ADD CONSTRAINT "GovBenefit_taxpayer_id_fkey" FOREIGN KEY ("taxpayer_id") REFERENCES "Taxpayer"("taxpayer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
