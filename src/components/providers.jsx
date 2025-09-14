"use client";

import React from "react";
import { ActiveThemeProvider } from "@/components/active-theme";

export default function Providers({ activeThemeValue, children }) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        {children}
      </ActiveThemeProvider>
    </>
  );
}
