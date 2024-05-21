import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const { children } = props;
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
