import { Debt } from "@prisma/client";

export const debt: Debt[] = [
  {
    id: 1,
    taxpayerId: "1234567890", // Should match an existing taxpayer ID
    taxReturnId: 1, // Should match an existing taxReturn ID
    debtType: "housing_loan", // For housingLoan with debtId 1
    taxYear: 2023,
    dateCreated: new Date("2023-03-01T10:00:00Z"),
    dateModified: new Date("2023-03-01T10:00:00Z"),
  },
  {
    id: 2,
    taxpayerId: "0987654321", // Should match an existing taxpayer ID
    taxReturnId: 2, // Should match an existing taxReturn ID
    debtType: "housing_loan", // For housingLoan with debtId 2
    taxYear: 2023,
    dateCreated: new Date("2023-03-02T11:30:00Z"),
    dateModified: new Date("2023-03-02T11:30:00Z"),
  },
  {
    id: 3,
    taxpayerId: "1234567890", // Should match an existing taxpayer ID
    taxReturnId: 1, // Should match an existing taxReturn ID
    debtType: "other_debt", // For otherDebt with debtId 3
    taxYear: 2023,
    dateCreated: new Date("2023-03-10T09:15:00Z"),
    dateModified: new Date("2023-03-10T09:15:00Z"),
  },
];
