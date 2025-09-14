"use client";

import { createContext, useContext, useEffect, useState } from "react";

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = "default";

function setThemeCookie(theme) {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

const ThemeContext = createContext(undefined);

export function ActiveThemeProvider({ children, initialTheme }) {
  const [activeTheme, setActiveTheme] = useState(
    () => initialTheme || DEFAULT_THEME
  );

  useEffect(() => {
    setThemeCookie(activeTheme);

    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return (
      <div className="text-destructive font-semibold">
        useThemeConfig must be used within an{" "}
        <span className="font-bold">ActiveThemeProvider</span>
      </div>
    );
  }

  return context;
}
