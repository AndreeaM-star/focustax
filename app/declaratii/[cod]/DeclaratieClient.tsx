"use client";

import { useState } from "react";
import Link from "next/link";
import type { DeclaratieData } from "./data";
import styles from "./page.module.css";

export default function DeclaratieClient({ data }: { data: DeclaratieData }) {
  const [deschis, setDeschis] = useState<string | null>(null);

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
    </main>
  );
}
