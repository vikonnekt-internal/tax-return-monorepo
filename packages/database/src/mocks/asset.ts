import { Asset } from "@prisma/client";

export const asset: Asset[] = [
  {
    id: 1,
    taxpayerId: "1234567890",
    taxReturnId: 1,
    assetType: "vehicle",
    taxYear: 2023,
    dateCreated: new Date("2023-03-01T09:45:00Z"),
    dateModified: new Date("2023-03-01T09:45:00Z"),
  },
  {
    id: 2,
    taxpayerId: "0987654321",
    taxReturnId: 2,
    assetType: "vehicle",
    taxYear: 2023,
    dateCreated: new Date("2023-03-10T12:15:00Z"),
    dateModified: new Date("2023-03-10T12:15:00Z"),
  },
  {
    id: 3,
    taxpayerId: "1234567890",
    taxReturnId: 1,
    assetType: "real_estate",
    taxYear: 2023,
    dateCreated: new Date("2023-03-02T10:30:00Z"),
    dateModified: new Date("2023-03-02T10:30:00Z"),
  },
  {
    id: 4,
    taxpayerId: "0987654321",
    taxReturnId: 2,
    assetType: "real_estate",
    taxYear: 2023,
    dateCreated: new Date("2023-03-12T11:15:00Z"),
    dateModified: new Date("2023-03-12T11:15:00Z"),
  },
];
