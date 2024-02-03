import type { Metadata } from "next";
import { Questrial } from "next/font/google";

import "./globals.css";

export const questrial = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V-Cell",
  description: "Game concept by Jim Fox - Web app by Jude Clark"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={questrial.className}>{children}</body>
    </html>
  );
}
