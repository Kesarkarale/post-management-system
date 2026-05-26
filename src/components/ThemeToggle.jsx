import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        border: "1px solid rgba(148,163,184,.16)",
        background: "rgba(15,23,42,.72)",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 12,
        cursor: "pointer",
        fontWeight: 900
      }}
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
