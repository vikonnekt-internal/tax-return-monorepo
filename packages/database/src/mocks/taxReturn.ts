import { TaxReturn } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const taxReturn: TaxReturn[] = [
  {
    id: 1,
    taxpayerId: "1234567890",
    taxYear: 2023,
    userId: 1,
    status: "submitted",
    submissionDate: new Date("2023-04-15T16:30:00Z"),
    totalIncome: new Prisma.Decimal(7200000.0),
    totalDeductions: new Prisma.Decimal(1450000.0),
    totalTaxableIncome: new Prisma.Decimal(5750000.0),
    totalTaxes: new Prisma.Decimal(1725000.0),
    totalRefund: new Prisma.Decimal(0.0),
    totalOwed: new Prisma.Decimal(150000.0),
    notes: "Annual tax return for 2023",
    dateCreated: new Date("2023-03-01T09:00:00Z"),
    dateModified: new Date("2023-04-15T16:30:00Z"),
  },
  {
    id: 2,
    taxpayerId: "0987654321",
    taxYear: 2023,
    userId: 1,
    status: "draft",
    submissionDate: null,
    totalIncome: new Prisma.Decimal(5500000.0),
    totalDeductions: new Prisma.Decimal(1200000.0),
    totalTaxableIncome: new Prisma.Decimal(4300000.0),
    totalTaxes: new Prisma.Decimal(1290000.0),
    totalRefund: new Prisma.Decimal(75000.0),
    totalOwed: new Prisma.Decimal(0.0),
    notes: "Draft return, still waiting for additional documentation",
    dateCreated: new Date("2023-03-10T11:15:00Z"),
    dateModified: new Date("2023-04-05T14:20:00Z"),
  },
];
