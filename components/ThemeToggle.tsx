"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

/** Comută între temă luminoasă și întunecată; alegerea se păstrează în browser */
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const explicit = document.documentElement.dataset.theme;
    setDark(explicit ? explicit === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("ft-theme", next ? "dark" : "light"); } catch { /* stocare indisponibilă */ }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Comută la tema luminoasă" : "Comută la tema întunecată"}
      title={dark ? "Temă luminoasă" : "Temă întunecată"}
      style={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: 8, color: "var(--ink-2)" }}
    >
      <Icon name={dark ? "sun" : "moon"} size={18} />
    </button>
  );
}
