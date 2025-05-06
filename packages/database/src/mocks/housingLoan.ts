import { HousingLoan } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const housingLoan: HousingLoan[] = [
  {
    id: 1,
    debtId: 1,
    lenderName: "Icelandic Housing Fund",
    lenderId: "IHF-001",
    loanNumber: "LOAN-12345",
    propertyAddress: "123 Main St, Reykjavik, 101",
    loanDate: new Date("2015-06-15T00:00:00Z"),
    loanTermYears: 25,
    annualPayments: new Prisma.Decimal(1200000.0),
    principalRepayment: new Prisma.Decimal(800000.0),
    interestExpenses: new Prisma.Decimal(400000.0),
    remainingBalance: new Prisma.Decimal(28000000.0),
  },
  {
    id: 2,
    debtId: 2,
    lenderName: "National Bank of Iceland",
    lenderId: "NBI-123",
    loanNumber: "LOAN-67890",
    propertyAddress: "456 Oak Ave, Akureyri, 600",
    loanDate: new Date("2018-09-10T00:00:00Z"),
    loanTermYears: 30,
    annualPayments: new Prisma.Decimal(1050000.0),
    principalRepayment: new Prisma.Decimal(650000.0),
    interestExpenses: new Prisma.Decimal(400000.0),
    remainingBalance: new Prisma.Decimal(32000000.0),
  },
];
