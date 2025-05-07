import { GovVehicle, Prisma } from "@prisma/client";

export const govVehicle: GovVehicle[] = [
  {
    id: 1,
    assetId: 2,
    registrationNumber: "AB123",
    purchaseYear: 2019,
    purchasePrice: new Prisma.Decimal(3500000),
  },
];
