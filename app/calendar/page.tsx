"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Profil = "angajat_srl" | "pfa" | "srl" | "chirii" | "investitor";

interface Termen {
  luna: number;
  zi: number;
  declaratie: string;
  titlu: string;
  profile: Profil[];
  urgent?: boolean;
  badge?: string;
}

const termene2026: Termen[] = [
  // Lunar D112 (angajat/SRL)
  ...Array.from({ length: 12 }, (_, i) => ({
    luna: i + 1,
    zi: 25,
    declaratie: "D112",
    titlu: `Salarii ${["Dec 2025","Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Nov"][i]}`,
    profile: ["angajat_srl"] as Profil[],
  })),
  // D300 trimestrial (TVA trimestrial)
  { luna: 1, zi: 25, declaratie: "D300", titlu: "TVA Q4 2025 (trimestrial)", profile: ["srl"] },
  { luna: 4, zi: 25, declaratie: "D300", titlu: "TVA Q1 2026 (trimestrial)", profile: ["srl"] },
  { luna: 7, zi: 25, declaratie: "D300", titlu: "TVA Q2 2026 (trimestrial)", profile: ["srl"] },
  { luna: 10, zi: 25, declaratie: "D300", titlu: "TVA Q3 2026 (trimestrial)", profile: ["srl"] },
  // D101 impozit profit
  { luna: 3, zi: 25, declaratie: "D101", titlu: "Impozit pe profit 2025", profile: ["srl"] },
  // D212 cu bonificație
  { luna: 4, zi: 15, declaratie: "D212", titlu: "Declarația Unică 2025 (bonificație 3%)", profile: ["pfa", "chirii", "investitor"], urgent: true, badge: "BONIFICAȚIE 3%" },
  // D212 termen normal
  { luna: 5, zi: 25, declaratie: "D212", titlu: "Declarația Unică 2025 (termen normal)", profile: ["pfa", "chirii", "investitor"] },
  // D100 micro trimestrial
  { luna: 4, zi: 25, declaratie: "D100", titlu: "Impozit micro T1 2026", profile: ["srl"] },
  { luna: 7, zi: 25, declaratie: "D100", titlu: "Impozit micro T2 2026", profile: ["srl"] },
  { luna: 10, zi: 25, declaratie: "D100", titlu: "Impozit micro T3 2026", profile: ["srl"] },
  { luna: 1, zi: 25, declaratie: "D100", titlu: "Impozit micro T4 2025", profile: ["srl"] },
];

const LUNI = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

const PROFILE_LABELS: { id: Profil; label: string; icon: string }[] = [
  { id: "angajat_srl", label: "Angajat CIM / SRL cu salariați", icon: "💼" },
  { id: "pfa", label: "PFA / Activitate independentă", icon: "🧾" },
  { id: "srl", label: "SRL / Microîntreprindere", icon: "🏢" },
  { id: "chirii", label: "Proprietar cu chirii", icon: "🏠" },
  { id: "investitor", label: "Investitor (crypto/bursă/dividende)", icon: "📈" },
];

const TAG_COLORS: Record<string, string> = {
  D112: "#2563eb",
  D300: "#d97706",
  D212: "#dc2626",
  D101: "#7c3aed",
  D100: "#059669",
};

function makeGCalLink(t: Termen, an = 2026) {
  const luna2 = String(t.luna).padStart(2, "0");
  const zi2 = String(t.zi).padStart(2, "0");
  const dateStr = `${an}${luna2}${zi2}`;
  const nextDay = new Date(an, t.luna - 1, t.zi + 1);
  const endStr = `${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, "0")}${String(nextDay.getDate()).padStart(2, "0")}`;
  const text = encodeURIComponent(`${t.declaratie} — ${t.titlu}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dateStr}/${endStr}&details=focustax.ro`;
}

export default function CalendarPage() {
  const [profiluri, setProfiluri] = useState<Set<Profil>>(new Set());
  const lunaAzi = new Date().getMonth() + 1;

  function toggle(p: Profil) {
    setProfiluri(prev => {
      const n = new Set(prev);
      if (n.has(p)) n.delete(p); else n.add(p);
      return n;
    });
  }

  const profilActiv = profiluri.size > 0;

  function termeneFiltered(luna: number): Termen[] {
    if (!profilActiv) return termene2026.filter(t => t.luna === luna);
    return termene2026.filter(t =>
      t.luna === luna && t.profile.some(p => profiluri.has(p))
    );
  }

  function getUrgenta(luna: number) {
    if (luna === lunaAzi) return "current";
    if (luna === lunaAzi + 1 || (lunaAzi === 12 && luna === 1)) return "next";
    return "other";
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8, color: "#1e293b" }}>
          Calendar Fiscal 2026
        </h1>
        <p style={{ color: "#64748b", marginBottom: "2rem", maxWidth: 600 }}>
          Selectează profilul tău pentru a vedea termenele relevante. Click pe orice termen pentru a-l adăuga în Google Calendar.
        </p>

        {/* Profil selector */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: "20px",
          marginBottom: "2rem",
        }}>
          <p style={{ fontWeight: 600, marginBottom: 12, fontSize: "0.9rem", color: "#374151" }}>
            Selectează profilul tău (poți alege mai multe):
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {PROFILE_LABELS.map(p => (
              <label key={p.id} style={{
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer",
                background: profiluri.has(p.id) ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${profiluri.has(p.id) ? "rgba(99,102,241,0.5)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 10, padding: "8px 14px",
                fontSize: "0.875rem", fontWeight: profiluri.has(p.id) ? 600 : 400,
                color: profiluri.has(p.id) ? "#4338ca" : "#374151",
                transition: "all 0.2s",
              }}>
                <input
                  type="checkbox"
                  checked={profiluri.has(p.id)}
                  onChange={() => toggle(p.id)}
                  style={{ display: "none" }}
                />
                {p.icon} {p.label}
              </label>
            ))}
          </div>
        </div>

        {/* Grid luni */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}>
          {LUNI.map((numeLuna, i) => {
            const luna = i + 1;
            const termLuna = termeneFiltered(luna);
            const urg = getUrgenta(luna);
            return (
              <div key={luna} style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${urg === "current" ? "rgba(99,102,241,0.6)" : urg === "next" ? "rgba(217,119,6,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 14,
                padding: "16px",
                minHeight: 120,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>{numeLuna}</span>
                  {urg === "current" && (
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "#6366f1", color: "#fff", padding: "2px 8px", borderRadius: 9999 }}>LUNA CURENTĂ</span>
                  )}
                </div>
                {termLuna.length === 0 ? (
                  <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontStyle: "italic" }}>Nicio declarație{profilActiv ? " pentru profilul selectat" : ""}</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {termLuna.map((t, j) => (
                      <a
                        key={j}
                        href={makeGCalLink(t)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          background: `${TAG_COLORS[t.declaratie] ?? "#6b7280"}15`,
                          border: `1px solid ${TAG_COLORS[t.declaratie] ?? "#6b7280"}30`,
                          borderRadius: 8, padding: "6px 10px",
                          textDecoration: "none",
                          transition: "opacity 0.15s",
                        }}
                        title="Adaugă în Google Calendar"
                      >
                        <span style={{
                          fontSize: "0.7rem", fontWeight: 700,
                          color: TAG_COLORS[t.declaratie] ?? "#6b7280",
                          minWidth: 36,
                        }}>{t.declaratie}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.78rem", color: "#374151", fontWeight: 500 }}>
                            {t.titlu}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>
                            termen {t.zi} {numeLuna.toLowerCase()}
                            {t.badge && (
                              <span style={{ marginLeft: 6, background: "#dc262615", color: "#dc2626", border: "1px solid #dc262630", borderRadius: 4, padding: "0 4px", fontSize: "0.65rem", fontWeight: 700 }}>
                                {t.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <span style={{ fontSize: "0.75rem" }}>📅</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#9ca3af", textAlign: "center" }}>
          Calcul orientativ. Verificați termenele exacte pe anaf.ro. Click pe orice declarație pentru a adăuga în Google Calendar.
        </p>
      </main>
      <Footer />
    </>
  );
}
