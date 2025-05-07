import { GovVehicle, Prisma } from "@prisma/client";

export const govVehicle: GovVehicle[] = [
  {
    id: 1,
    assetId: 2,
    registrationNumber: "AB123",
    purchaseYear: 2019,
    purchasePrice: new Prisma.Decimal(3500000),
  },
  // Jökull Þórðarson's vehicles
  {
    id: 2,
    assetId: 5,
    registrationNumber: "KB-521",
    purchaseYear: 2021,
    purchasePrice: new Prisma.Decimal(3100000),
  },
  {
    id: 3,
    assetId: 6,
    registrationNumber: "JU-329",
    purchaseYear: 2012,
    purchasePrice: new Prisma.Decimal(430000),
  },
];
