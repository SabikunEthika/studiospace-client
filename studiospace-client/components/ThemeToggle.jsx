"use client";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const t = localStorage.getItem("theme") || "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };
  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
      {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}