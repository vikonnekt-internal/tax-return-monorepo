import { OtherDebt } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const otherDebt: OtherDebt[] = [
  {
    id: 1,
    debtId: 1,
    debtType: "student_loan",
    debtIdentifier: "SL-123456",
    creditorName: "Icelandic Student Loan Fund",
    interestExpenses: new Prisma.Decimal(250000.0),
    remainingBalance: new Prisma.Decimal(3500000.0),
  },
  {
    id: 2,
    debtId: 2,
    debtType: "credit_card",
    debtIdentifier: "CC-78901",
    creditorName: "Iceland Credit Union",
    interestExpenses: new Prisma.Decimal(120000.0),
    remainingBalance: new Prisma.Decimal(950000.0),
  },
  {
    id: 3,
    debtId: 3,
    debtType: "personal_loan",
    debtIdentifier: "PL-56789",
    creditorName: "Northern Bank",
    interestExpenses: new Prisma.Decimal(180000.0),
    remainingBalance: new Prisma.Decimal(1500000.0),
  },
];
