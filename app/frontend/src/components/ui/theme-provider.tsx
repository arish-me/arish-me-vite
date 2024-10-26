import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

const initialState = {
  theme: "system",
  setTheme: () => null,
};

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "theme", ...props }) {
  console.log("ThemeProvider rendered"); // Check if this logs

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {console.log("ThemeProviderContext.Provider rendered")}
      {children}
    </ThemeProviderContext.Provider>
  );
}
