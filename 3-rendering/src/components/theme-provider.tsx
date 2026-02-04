import React, { createContext, useContext } from "react";

interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: "#3700ff",
    secondary: "#6c757d",
  },
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext value={defaultTheme}>{children}</ThemeContext>;
};

export const useTheme = () => useContext(ThemeContext);
