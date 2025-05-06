import { Taxpayer } from "@prisma/client";

export const taxpayer: Taxpayer[] = [
  {
    id: "1234567890", // Icelandic kennitala
    firstName: "John",
    lastName: "Doe",
    fullAddress: "123 Main St, Reykjavik, 101",
    streetAddress: "123 Main St",
    postalCode: "101",
    city: "Reykjavik",
    email: "john.doe@example.com",
    phoneNumber: "+3541234567",
    taxYear: 2023,
    dateCreated: new Date("2023-01-15T10:00:00Z"),
    dateModified: new Date("2023-01-15T10:00:00Z"),
  },
  {
    id: "0987654321",
    firstName: "Jane",
    lastName: "Smith",
    fullAddress: "456 Oak Ave, Akureyri, 600",
    streetAddress: "456 Oak Ave",
    postalCode: "600",
    city: "Akureyri",
    email: "jane.smith@example.com",
    phoneNumber: "+3547654321",
    taxYear: 2023,
    dateCreated: new Date("2023-02-20T14:30:00Z"),
    dateModified: new Date("2023-02-20T14:30:00Z"),
  },
];
