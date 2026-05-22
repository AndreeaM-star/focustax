"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

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
  const azi = new Date();
  const lunaAzi = azi.getMonth() + 1;
  const anAzi = azi.getFullYear();

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

  function getLunaStatus(luna: number) {
    if (anAzi < 2026) return luna === 1 ? "current" : "future";
    if (anAzi > 2026) return "past";
    if (luna === lunaAzi) return "current";
    if (luna < lunaAzi) return "past";
    if (luna === lunaAzi + 1 || (lunaAzi === 12 && luna === 1)) return "next";
    return "future";
  }

  function isTermenUrgent(t: Termen) {
    if (anAzi !== 2026) return false;
    const d = new Date(2026, t.luna - 1, t.zi);
    const diff = (d.getTime() - azi.getTime()) / 86400000;
    return diff >= 0 && diff <= 7;
  }

  const lunaCardClass = (status: string) => {
    if (status === "current") return `${styles.monthCard} ${styles.monthCardCurrent}`;
    if (status === "next") return `${styles.monthCard} ${styles.monthCardNext}`;
    if (status === "past") return `${styles.monthCard} ${styles.monthCardPast}`;
    return styles.monthCard;
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Calendar <span className={styles.titleAccent}>Fiscal 2026</span>
          </h1>
          <p className={styles.subtitle}>
            Selectează profilul tău pentru a vedea termenele relevante. Click pe orice termen pentru a-l adăuga în Google Calendar.
          </p>
        </div>

        {/* Profile selector */}
        <div className={styles.profileCard}>
          <p className={styles.profileLabel}>Selectează profilul tău (poți alege mai multe):</p>
          <div className={styles.profileGrid}>
            {PROFILE_LABELS.map(p => (
              <label key={p.id} className={`${styles.profileChip} ${profiluri.has(p.id) ? styles.profileChipActive : ""}`}>
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

        {/* Months grid */}
        <div className={styles.monthsGrid}>
          {LUNI.map((numeLuna, i) => {
            const luna = i + 1;
            const termLuna = termeneFiltered(luna);
            const status = getLunaStatus(luna);
            return (
              <div key={luna} className={lunaCardClass(status)}>
                <div className={styles.monthHeader}>
                  <span className={styles.monthName}>{numeLuna}</span>
                  {status === "current" && (
                    <span className={styles.monthBadgeCurrent}>Luna curentă</span>
                  )}
                </div>
                {termLuna.length === 0 ? (
                  <p className={styles.monthEmpty}>
                    Nicio declarație{profilActiv ? " pentru profilul selectat" : ""}
                  </p>
                ) : (
                  <div>
                    {termLuna.map((t, j) => {
                      const urgent = isTermenUrgent(t) || t.urgent;
                      return (
                        <a
                          key={j}
                          href={makeGCalLink(t)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.termLink} ${urgent ? styles.termLinkUrgent : ""}`}
                          title="Adaugă în Google Calendar"
                        >
                          <span className={styles.termCode} style={{ color: TAG_COLORS[t.declaratie] ?? "#6b7280" }}>
                            {t.declaratie}
                          </span>
                          <div className={styles.termInfo}>
                            <div className={styles.termName}>{t.titlu}</div>
                            <div className={styles.termDate}>
                              termen {t.zi} {numeLuna.toLowerCase()}
                            </div>
                          </div>
                          {t.badge && (
                            <span className={styles.termBadge}>{t.badge}</span>
                          )}
                          <span className={styles.calIcon}>📅</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className={styles.footerNote}>
          Calcul orientativ. Verificați termenele exacte pe anaf.ro. Click pe orice declarație pentru a adăuga în Google Calendar.
        </p>
      </main>
      <Footer />
    </>
  );
}
