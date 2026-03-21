"use client";

import { useState } from "react";
import Link from "next/link";
import type { DeclaratieData } from "./data";
import styles from "./page.module.css";

const LUNI = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function luniActive(periodicitate: string): number[] {
  if (periodicitate.toLowerCase().includes("lunar")) return [1,2,3,4,5,6,7,8,9,10,11,12];
  if (periodicitate.toLowerCase().includes("trimestrial")) return [1,4,7,10];
  if (periodicitate.toLowerCase() === "anual") return [5];
  if (periodicitate.toLowerCase().includes("anual")) return [5];
  return [];
}

const CINE_DEPUNE: Record<string, string[]> = {
  d300: ["SRL cu TVA", "PFA cu TVA", "II cu TVA"],
  d301: ["Cumpărători intracomunitari neînregistrați TVA"],
  d390: ["SRL cu TVA", "PFA cu TVA"],
  d394: ["SRL cu TVA", "PFA cu TVA"],
  d101: ["SRL", "SA", "Alte persoane juridice"],
  d012: ["Plătitori impozit pe profit"],
  d100: ["SRL", "SA", "Plătitori accize"],
  d200: ["Persoane fizice cu venituri din 2023 și anterior"],
  d212: ["PFA", "II", "IF", "Chirii", "Investiții", "Alte venituri"],
  d220: ["PFA", "II", "Activități independente noi"],
  d230: ["Persoane fizice cu impozit pe venit"],
  d112: ["Angajatori", "SRL cu salariați", "PFA cu salariați"],
  d204: ["PFA", "II", "IF"],
  d216: ["PFA", "II", "IF", "Persoane cu activități independente"],
  d120: ["Antrepozitari autorizați", "Importatori accize"],
  d130: ["Producători țiței"],
};

const DECLARATII_CONEXE: Record<string, { cod: string; nume: string; href: string }[]> = {
  d300: [
    { cod: "D390", nume: "Declarație recapitulativă VIES", href: "/declaratii/d390" },
    { cod: "D394", nume: "Declarație informativă livrări", href: "/declaratii/d394" },
  ],
  d212: [
    { cod: "D220", nume: "Declarație venit estimat", href: "/declaratii/d220" },
    { cod: "D230", nume: "3,5% din impozit", href: "/declaratii/d230" },
  ],
  d101: [
    { cod: "D100", nume: "Obligații de plată", href: "/declaratii/d100" },
    { cod: "D012", nume: "Notificare sistem anticipate", href: "/declaratii/d012" },
  ],
  d112: [
    { cod: "D100", nume: "Obligații de plată", href: "/declaratii/d100" },
  ],
  d220: [
    { cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" },
  ],
  d230: [
    { cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" },
  ],
  d390: [
    { cod: "D300", nume: "Decont TVA", href: "/declaratii/d300" },
  ],
  d394: [
    { cod: "D300", nume: "Decont TVA", href: "/declaratii/d300" },
  ],
  d204: [
    { cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" },
  ],
  d216: [
    { cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" },
  ],
};

export default function DeclaratieClient({ data }: { data: DeclaratieData }) {
  const [deschis, setDeschis] = useState<string | null>(null);

  const cod = data.cod.toLowerCase();
  const luni = luniActive(data.periodicitate);
  const cine = CINE_DEPUNE[cod] ?? [];
  const conexe = DECLARATII_CONEXE[cod] ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/declaratii" className={styles.breadcrumbLink}>Declarații</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span>{data.cod}</span>
      </div>

      <div className={styles.header}>
        <span
          className={styles.badge}
          style={{
            color: data.badgeCuloare,
            background: data.badgeBg,
            borderColor: data.badgeBorder,
          }}
        >
          {data.categorie}
        </span>
        <h1 className={styles.title}>{data.titlu}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem}>📅 Periodicitate: {data.periodicitate}</span>
          <span className={styles.metaItem}>⏰ Termen: {data.termen}</span>
          <span className={styles.metaItem}>🏛️ Depunere: {data.depunere}</span>
        </div>
      </div>

      {/* Calendar vizual */}
      {luni.length > 0 && (
        <div className={styles.calendarSection}>
          <h2 className={styles.sectionTitle}>Calendar depunere</h2>
          <div className={styles.calendar}>
            {LUNI.map((l, i) => {
              const activ = luni.includes(i + 1);
              return (
                <div
                  key={l}
                  className={`${styles.calendarLuna} ${activ ? styles.calendarActiv : ""}`}
                  style={activ ? { background: data.badgeBg, borderColor: data.badgeBorder, color: data.accentCuloare } : undefined}
                >
                  {l}
                </div>
              );
            })}
          </div>
          <p className={styles.calendarHint}>
            {luni.length === 12
              ? "Se depune lunar — în fiecare lună, până la termenul specificat."
              : luni.length === 4
              ? "Se depune trimestrial — în primele luni ale fiecărui trimestru."
              : "Se depune anual — de regulă până pe 25 mai."}
          </p>
        </div>
      )}

      {/* Cine depune */}
      {cine.length > 0 && (
        <div className={styles.cineSection}>
          <h2 className={styles.sectionTitle}>Cine depune</h2>
          <div className={styles.cineBadges}>
            {cine.map((c) => (
              <span
                key={c}
                className={styles.cineBadge}
                style={{ borderColor: data.badgeBorder, color: data.accentCuloare, background: data.badgeBg }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.legislatie}>
        <h2 className={styles.sectionTitle}>Informații oficiale</h2>
        <div
          className={styles.legislatieBox}
          style={{
            background: data.legislatieBg,
            borderColor: data.legislatieBorder,
            borderLeftColor: data.legislatieAccent,
          }}
        >
          {data.legislatie.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className={styles.legislatieFooter} style={{ borderTopColor: data.legislatieBorder }}>
            <span>⏱ Durată estimată: <strong>{data.durata}</strong></span>
            <span>📋 Categoria: {data.categorie}</span>
          </div>
        </div>
      </div>

      <div className={styles.capitole}>
        <h2 className={styles.sectionTitle}>Capitolele formularului</h2>
        {data.capitole.map((cap) => (
          <div key={cap.id} className={styles.capitol}>
            <button
              className={`${styles.capitolHeader} ${deschis === cap.id ? styles.activ : ""}`}
              onClick={() => setDeschis(deschis === cap.id ? null : cap.id)}
              style={deschis === cap.id ? { background: data.legislatieBg } : undefined}
            >
              <span className={styles.capitolId} style={{ color: data.accentCuloare }}>{cap.id}</span>
              <span className={styles.capitolTitlu}>{cap.titlu}</span>
              <span className={styles.chevron}>{deschis === cap.id ? "▲" : "▼"}</span>
            </button>
            {deschis === cap.id && (
              <ul className={styles.capitolContinut}>
                {cap.continut.map((item, i) => (
                  <li key={i} className={styles.capitolItem}>
                    <span className={styles.bullet} style={{ color: data.accentCuloare }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Declarații conexe */}
      {conexe.length > 0 && (
        <div className={styles.conexeSection}>
          <h2 className={styles.sectionTitle}>Declarații conexe</h2>
          <div className={styles.conexeGrid}>
            {conexe.map((d) => (
              <Link key={d.cod} href={d.href} className={styles.conexeCard}>
                <span className={styles.conexeCod} style={{ color: data.accentCuloare }}>{d.cod}</span>
                <span className={styles.conexeNume}>{d.nume}</span>
                <span className={styles.conexeArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
