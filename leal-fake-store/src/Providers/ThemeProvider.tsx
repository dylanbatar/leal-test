import { useEffect, useState } from "react";
import { ThemeContext } from "../Context/themeContext";
import { ThemeInterface } from "../Interfaces/ThemeInterface";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("current-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

export const ThemeProvider = ({ initialTheme, children }: ThemeInterface) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  const checkTheme = (existing: string) => {
    const root = window.document.documentElement;
    const isDark = existing === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(existing);

    localStorage.setItem("current-theme", existing);
  };

  if (initialTheme) {
    checkTheme(initialTheme);
  }

  useEffect(() => {
    checkTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
