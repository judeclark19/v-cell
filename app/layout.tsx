import { Metadata } from "next";
import { metadata as pageMetadata } from "@/lib/metadata";
import { cookies } from "next/headers";

export const metadata: Metadata = pageMetadata;

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "poker";
  console.log(theme);
  return (
    <html>
      <body className={theme}>{children}</body>
    </html>
  );
}
