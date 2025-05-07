import { GovRealEstate, Prisma } from "@prisma/client";

export const govRealEstate: GovRealEstate[] = [
  {
    id: 1,
    assetId: 1,
    propertyId: "RE12345",
    address: "123 Government Street, Reykjavik",
    propertyValue: new Prisma.Decimal(45000000),
    purchaseYear: 2010,
  },
  {
    id: 2,
    assetId: 3,
    propertyId: "RE54321",
    address: "456 Summer Avenue, Akureyri",
    propertyValue: new Prisma.Decimal(38000000),
    purchaseYear: 2015,
  },
];
