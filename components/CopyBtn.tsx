"use client";

import { useState } from "react";

export default function CopyBtn({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={className}
      title="Copiază rezultatul"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "7px 14px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        background: copied ? "#f0fdf4" : "#fafafa",
        color: copied ? "#16a34a" : "#6b7280",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
    >
      {copied ? "✓ Copiat!" : "⎘ Copiază"}
    </button>
  );
}
