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
  // Jökull Þórðarson's real estate
  {
    id: 3,
    assetId: 4,
    propertyId: "210-9876",
    address: "Bláfjallagata 12, 105 Reykjavík",
    propertyValue: new Prisma.Decimal(52000000),
    purchaseYear: 2021,
  },
];
