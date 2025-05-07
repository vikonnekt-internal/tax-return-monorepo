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
  // Jökull Þórðarson's other debts
  {
    id: 2,
    debtId: 5,
    debtType: "credit_card",
    debtIdentifier: "4469 88XX XXXX 4567",
    creditorName: "Credit Card Company",
    interestExpenses: new Prisma.Decimal(39200),
    remainingBalance: new Prisma.Decimal(217000),
  },
  {
    id: 3,
    debtId: 6,
    debtType: "personal_loan",
    debtIdentifier: "Additional Loan",
    creditorName: "Unknown Lender",
    interestExpenses: new Prisma.Decimal(86000),
    remainingBalance: new Prisma.Decimal(980000),
  },
  {
    id: 4,
    debtId: 7,
    debtType: "personal_loan",
    debtIdentifier: "0142-26-732645",
    creditorName: "Varðan",
    interestExpenses: new Prisma.Decimal(14500),
    remainingBalance: new Prisma.Decimal(62000),
  },
  {
    id: 5,
    debtId: 8,
    debtType: "tax_debt",
    debtIdentifier: "Kilometer Fee",
    creditorName: "Tax Authority",
    interestExpenses: new Prisma.Decimal(0),
    remainingBalance: new Prisma.Decimal(2370),
  },
  {
    id: 6,
    debtId: 9,
    debtType: "tax_debt",
    debtIdentifier: "National and Municipal Taxes",
    creditorName: "Tax Authority",
    interestExpenses: new Prisma.Decimal(224),
    remainingBalance: new Prisma.Decimal(0),
  },
];
