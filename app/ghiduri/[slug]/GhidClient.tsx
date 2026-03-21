"use client";

import { useState } from "react";
import Link from "next/link";
import type { GhidData, ChartBar } from "./data";
import styles from "./ghid.module.css";

function BarChart({ bare, titlu, unitate }: { bare: ChartBar[]; titlu: string; unitate?: string }) {
  const max = Math.max(...bare.map((b) => b.value));
  return (
    <div className={styles.chart}>
      <p className={styles.chartTitlu}>{titlu}</p>
      <div className={styles.chartBars}>
        {bare.map((b) => (
          <div key={b.label} className={styles.chartBarGroup}>
            <div className={styles.chartBarWrap}>
              <div
                className={styles.chartBar}
                style={{
                  height: `${Math.round((b.value / max) * 140)}px`,
                  background: b.color,
                }}
              />
            </div>
            <div className={styles.chartLabel}>{b.label}</div>
            <div className={styles.chartVal}>
              {b.value.toLocaleString("ro-RO")}
              {unitate ? ` ${unitate}` : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GhidClient({ data }: { data: GhidData }) {
  const [deschis, setDeschis] = useState<number | null>(0);

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/ghiduri" className={styles.breadcrumbLink}>Ghiduri</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span>{data.titlu}</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <span
          className={styles.badge}
          style={{ color: data.culoare, background: data.badgeBg, borderColor: data.culoare + "40" }}
        >
          {data.categorie}
        </span>
        <h1 className={styles.title}>{data.titlu}</h1>
        <p className={styles.desc}>{data.desc}</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>

          {/* Ce vei afla */}
          <section className={styles.ceAfla}>
            <h2 className={styles.sectionTitle}>Ce vei afla din acest ghid</h2>
            <ul className={styles.ceAflaList}>
              {data.ceFaciAfla.map((item, i) => (
                <li key={i} className={styles.ceAflaItem}>
                  <span className={styles.ceAflaCheck} style={{ color: data.culoare }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Secțiuni accordion */}
          <section className={styles.sectiuni}>
            <h2 className={styles.sectionTitle}>Conținut detaliat</h2>
            {data.sectiuni.map((sec, i) => (
              <div key={i} className={styles.sectiune}>
                <button
                  className={`${styles.sectiuneHeader} ${deschis === i ? styles.activ : ""}`}
                  onClick={() => setDeschis(deschis === i ? null : i)}
                  style={deschis === i ? { borderLeftColor: data.culoare } : undefined}
                >
                  <span className={styles.sectiuneNr} style={{ color: data.culoare }}>0{i + 1}</span>
                  <span className={styles.sectiuneTitlu}>{sec.titlu}</span>
                  <span className={styles.chevron}>{deschis === i ? "▲" : "▼"}</span>
                </button>
                {deschis === i && (
                  <div className={styles.sectiuneContinut}>
                    {sec.continut.map((p, j) => (
                      <p key={j} className={styles.sectiuneP}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Timeline */}
          {data.timeline && data.timeline.length > 0 && (
            <section className={styles.timelineSection}>
              <h2 className={styles.sectionTitle}>Pași de urmat</h2>
              <div className={styles.timeline}>
                {data.timeline.map((step) => (
                  <div key={step.pas} className={styles.timelineStep}>
                    <div className={styles.timelineLeft}>
                      <div className={styles.timelineDot} style={{ background: data.culoare }}>
                        {step.pas}
                      </div>
                      {step.pas < data.timeline!.length && (
                        <div className={styles.timelineLine} style={{ background: data.culoare + "30" }} />
                      )}
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <span className={styles.timelineTitlu}>{step.titlu}</span>
                        <span className={styles.timelineDurata} style={{ color: data.culoare }}>
                          {step.durata}
                        </span>
                      </div>
                      <p className={styles.timelineDetaliu}>{step.detaliu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Chart */}
          {data.chart && (
            <section className={styles.chartSection}>
              <h2 className={styles.sectionTitle}>Vizualizare</h2>
              <div className={styles.chartCard}>
                <BarChart
                  bare={data.chart.bare}
                  titlu={data.chart.titlu}
                  unitate={data.chart.unitate}
                />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Declarații aferente */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Declarații aferente</h3>
            <div className={styles.sideCardList}>
              {data.declaratiiAferente.map((d) => (
                <Link key={d.cod} href={d.href} className={styles.decLink}>
                  <span className={styles.decCod} style={{ color: data.culoare }}>{d.cod}</span>
                  <span className={styles.decNume}>{d.nume}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Atenție! */}
          {data.atentie.length > 0 && (
            <div className={styles.sideCard} style={{ borderColor: "#fde68a" }}>
              <h3 className={styles.sideCardTitle} style={{ color: "#d97706" }}>⚠ Atenție!</h3>
              <ul className={styles.atentieList}>
                {data.atentie.map((a, i) => (
                  <li key={i} className={styles.atentieItem}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Back link */}
          <Link href="/ghiduri" className={styles.backLink}>
            ← Înapoi la Ghiduri
          </Link>
        </aside>
      </div>
    </main>
  );
}
