import { GovOtherDebt, Prisma } from "@prisma/client";

export const govOtherDebt: GovOtherDebt[] = [
  {
    id: 1,
    debtId: 2,
    debtType: "student_loan",
    debtIdentifier: "SL54321",
    creditorName: "Student Loan Fund",
    interestExpenses: new Prisma.Decimal(150000),
    remainingBalance: new Prisma.Decimal(3500000),
  },
];
