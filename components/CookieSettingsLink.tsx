"use client";

import { deschideSetariCookie } from "./CookieBanner";

export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={deschideSetariCookie} style={{ font: "inherit", color: "inherit", padding: 0, textAlign: "left" }}>
      Setări cookie
    </button>
  );
}
