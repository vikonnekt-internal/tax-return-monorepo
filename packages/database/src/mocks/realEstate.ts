import { RealEstate } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const realEstate: RealEstate[] = [
  {
    id: 1,
    assetId: 3,
    propertyId: "PROP-12345",
    address: "123 Main St, Reykjavik, 101",
    propertyValue: new Prisma.Decimal(45000000.0),
    purchaseYear: 2015,
  },
  {
    id: 2,
    assetId: 4,
    propertyId: "PROP-67890",
    address: "456 Oak Ave, Akureyri, 600",
    propertyValue: new Prisma.Decimal(38000000.0),
    purchaseYear: 2018,
  },
];
