import { Vehicle } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const vehicle: Vehicle[] = [
  {
    id: 1,
    assetId: 1,
    registrationNumber: "AB-123",
    purchaseYear: 2019,
    purchasePrice: new Prisma.Decimal(4500000.0),
  },
  {
    id: 2,
    assetId: 2,
    registrationNumber: "XY-789",
    purchaseYear: 2020,
    purchasePrice: new Prisma.Decimal(3800000.0),
  },
];
