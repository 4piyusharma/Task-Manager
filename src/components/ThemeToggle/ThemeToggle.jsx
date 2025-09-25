import React, { memo } from "react";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ Now this should work
import "./ThemeToggle.css";

const ThemeToggle = memo(() => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
export default ThemeToggle;
