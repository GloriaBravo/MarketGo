import React from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <button onClick={toggleTheme}>
      Cambiar a {theme === "light" ? "modo oscuro 🌙" : "modo claro ☀️"}
    </button>
  );
};

export default ThemeToggle;
