"use client";

import React from "react";
import { ActiveThemeProvider } from "@/components/active-theme";
import { AuthProvider } from "@/context/auth-context";

export default function Providers({ activeThemeValue, children }) {
  return (
    <>
      <AuthProvider>
        <ActiveThemeProvider initialTheme={activeThemeValue}>
          {children}
        </ActiveThemeProvider>
      </AuthProvider>
    </>
  );
}
