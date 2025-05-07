import { GovDebt, Prisma } from "@prisma/client";

export const govDebt: GovDebt[] = [
  {
    id: 1,
    taxpayerId: "1234567890",
    debtType: "housing_loan",
    isActive: true,
    taxYear: 2023,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 2,
    taxpayerId: "1234567890",
    debtType: "other_debt",
    isActive: true,
    taxYear: 2023,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 3,
    taxpayerId: "0987654321",
    debtType: "housing_loan",
    isActive: true,
    taxYear: 2023,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
];
