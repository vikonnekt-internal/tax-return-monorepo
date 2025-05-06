import { Benefit } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const benefit: Benefit[] = [
  {
    id: 1,
    taxpayerId: "1234567890",
    taxReturnId: 1,
    providerName: "Acme Corporation",
    benefitType: "health_insurance",
    amount: new Prisma.Decimal(350000.0),
    taxYear: 2023,
    dateCreated: new Date("2023-03-01T10:45:00Z"),
    dateModified: new Date("2023-03-01T10:45:00Z"),
  },
  {
    id: 2,
    taxpayerId: "1234567890",
    taxReturnId: 1,
    providerName: "Acme Corporation",
    benefitType: "pension_contribution",
    amount: new Prisma.Decimal(650000.0),
    taxYear: 2023,
    dateCreated: new Date("2023-03-01T11:00:00Z"),
    dateModified: new Date("2023-03-01T11:00:00Z"),
  },
  {
    id: 3,
    taxpayerId: "0987654321",
    taxReturnId: 2,
    providerName: "Umbrella Inc",
    benefitType: "health_insurance",
    amount: new Prisma.Decimal(320000.0),
    taxYear: 2023,
    dateCreated: new Date("2023-03-10T13:00:00Z"),
    dateModified: new Date("2023-03-10T13:00:00Z"),
  },
  {
    id: 4,
    taxpayerId: "0987654321",
    taxReturnId: 2,
    providerName: "Umbrella Inc",
    benefitType: "company_car",
    amount: new Prisma.Decimal(550000.0),
    taxYear: 2023,
    dateCreated: new Date("2023-03-10T13:15:00Z"),
    dateModified: new Date("2023-03-10T13:15:00Z"),
  },
];
