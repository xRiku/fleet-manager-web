import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fleet Manager",
  description: "Modern fleet management for the digital age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
