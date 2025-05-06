// Default password: Password1!
import { User } from "@prisma/client";

export const user: User[] = [
  {
    id: 1,
    email: "admin@admin.com",
    firstName: "Admin",
    lastName: "Admin",
    password: "$2a$12$2vIgPf4.w.KznW25JuGp1OnDnd8djT6y1EhKWXJmHjdTe8wHSgCJm",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    resetToken: "resetToken",
    resetTokenExpiry: new Date("2040-12-17T14:53:06.390Z"),
    verificationToken: "verificationToken",
    verificationTokenDate: null,
    isVerified: true,
    phone: "+25461484512",
  },
];
