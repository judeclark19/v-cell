"use client";

import Home from "./Home";

import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/GlobalStyles";

export default function Page() {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <Home />
    </StyledComponentsRegistry>
  );
}
