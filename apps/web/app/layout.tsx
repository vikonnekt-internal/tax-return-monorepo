import "./globals.css";
import type { Metadata } from "next";
import { Box } from "./components";

export const metadata: Metadata = {
  title: "Island UI Demo",
  description: "Demo application using Island UI in a Turborepo monorepo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Box background="white" minHeight="100vh">
          {children}
        </Box>
      </body>
    </html>
  );
}
