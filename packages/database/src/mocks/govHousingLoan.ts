import { GovHousingLoan, Prisma } from "@prisma/client";

export const govHousingLoan: GovHousingLoan[] = [
  {
    id: 1,
    debtId: 1,
    lenderName: "National Housing Fund",
    lenderId: "NHF12345",
    loanNumber: "HL987654",
    propertyAddress: "123 Government Street, Reykjavik",
    loanTermYears: 25,
    annualPayments: new Prisma.Decimal(1200000),
    principalRepayment: new Prisma.Decimal(800000),
    interestExpenses: new Prisma.Decimal(400000),
    remainingBalance: new Prisma.Decimal(29000000),
  },
  {
    id: 2,
    debtId: 3,
    lenderName: "Icelandic Bank",
    lenderId: "IB98765",
    loanNumber: "HL123456",
    propertyAddress: "456 Summer Avenue, Akureyri",
    loanTermYears: 30,
    annualPayments: new Prisma.Decimal(1400000),
    principalRepayment: new Prisma.Decimal(900000),
    interestExpenses: new Prisma.Decimal(500000),
    remainingBalance: new Prisma.Decimal(32000000),
  },
];
