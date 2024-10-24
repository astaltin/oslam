import type { Metadata } from "next";

import "@fontsource/geist-sans";
import "./globals.css";

export const metadata: Metadata = { title: "OSLAM Billing" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
