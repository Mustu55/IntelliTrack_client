import React, { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext(void 0);
const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem("intellitrack_theme");
    return saved === "light" ? "light" : "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("intellitrack_theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setThemeState((prev) => prev === "light" ? "dark" : "light");
  };
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };
  return /* @__PURE__ */ React.createElement(ThemeContext.Provider, { value: { theme, toggleTheme, setTheme } }, children);
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
export {
  ThemeProvider,
  useTheme
};
