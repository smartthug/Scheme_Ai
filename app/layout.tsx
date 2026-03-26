import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scheme Helper AI — Find Government Schemes",
  description:
    "Simple step-by-step help to find government schemes you may qualify for.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
