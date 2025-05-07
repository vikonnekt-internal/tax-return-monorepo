import { GovAsset, Prisma } from "@prisma/client";

export const govAsset: GovAsset[] = [
  {
    id: 1,
    taxpayerId: "1234567890",
    assetType: "real_estate",
    isActive: true,
    taxYear: 2023,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 2,
    taxpayerId: "1234567890",
    assetType: "vehicle",
    isActive: true,
    taxYear: 2023,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 3,
    taxpayerId: "0987654321",
    assetType: "real_estate",
    isActive: true,
    taxYear: 2023,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  // New assets for Jökull Þórðarson
  {
    id: 4,
    taxpayerId: "1203894569",
    assetType: "real_estate",
    isActive: true,
    taxYear: 2024,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 5,
    taxpayerId: "1203894569",
    assetType: "vehicle",
    isActive: true,
    taxYear: 2024,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 6,
    taxpayerId: "1203894569",
    assetType: "vehicle",
    isActive: true,
    taxYear: 2024,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
];
