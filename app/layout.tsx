"use client";

import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/GlobalStyles";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
