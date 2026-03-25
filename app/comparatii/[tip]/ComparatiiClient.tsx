"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import type { TipComparatie } from "./data";
import styles from "./comparatii.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export default function ComparatiiClient({ date }: { date: TipComparatie }) {
  const [zona, setZona] = useState<"europa" | "global">("europa");

  const tariAfisate =
    zona === "global" ? date.tari : date.tari.filter((t) => t.zona !== "extra-europa");

  const sorted = [...tariAfisate].sort((a, b) => b.cotaStandard - a.cotaStandard);
  const romania = sorted.find((t) => t.esteRomania);
  const pozitieRo = sorted.findIndex((t) => t.esteRomania) + 1;
  const top5mic = [...tariAfisate].sort((a, b) => a.cotaStandard - b.cotaStandard).slice(0, 5);
  const top5mare = [...tariAfisate].sort((a, b) => b.cotaStandard - a.cotaStandard).slice(0, 5);

  const esTVA = date.id === "tva";
  const sistemHeader = esTVA ? "Cote reduse" : "Sistem";
  const sistemLabel: Record<string, string> = {
    flat: "Cotă unică",
    progresiv: "Progresiv",
    distributie: "Pe profit distribuit",
    proporțional: "Proporțional",
  };
  const formatSistem = (t: (typeof sorted)[0]) => {
    if (esTVA) {
      return t.coteReduse && t.coteReduse.length > 0
        ? t.coteReduse.map((c) => `${c}%`).join(" / ")
        : "—";
    }
    return sistemLabel[t.sistem] ?? t.sistem;
  };

  const chartData = {
    labels: sorted.map((t) => t.nume),
    datasets: [
      {
        label: date.unitateMasura,
        data: sorted.map((t) => t.cotaStandard),
        backgroundColor: sorted.map((t) =>
          t.esteRomania ? date.culoare : date.culoareSecundara.replace("0.18)", "0.5)")
        ),
        borderColor: sorted.map((t) =>
          t.esteRomania ? date.culoare : date.culoareSecundara.replace("0.18)", "0.8)")
        ),
        borderWidth: sorted.map((t) => (t.esteRomania ? 2 : 1)),
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end" as const,
        align: "end" as const,
        formatter: (value: number) => `${value}%`,
        color: (ctx: { dataIndex: number }) => {
          const t = sorted[ctx.dataIndex];
          return t.esteRomania ? date.culoare.replace("0.85", "1") : "#374151";
        },
        font: (ctx: { dataIndex: number }) => {
          const t = sorted[ctx.dataIndex];
          return { size: 11, weight: t.esteRomania ? ("bold" as const) : ("normal" as const) };
        },
        padding: { left: 4 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const tara = sorted[ctx.dataIndex];
            const val = ctx.parsed.x ?? 0;
            let label = ` ${val}${date.unitateMasura === "%" ? "%" : ` ${date.unitateMasura}`}`;
            if (tara.detalii) label += ` — ${tara.detalii}`;
            return label;
          },
        },
        backgroundColor: "rgba(255,255,255,0.95)",
        titleColor: "#1a1a2e",
        bodyColor: "#374151",
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 10,
      },
    },
    layout: {
      padding: { right: 48 },
    },
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: (ctx: { index: number }) => {
            const t = sorted[ctx.index];
            return t.esteRomania ? date.culoare.replace("0.85", "1") : "#374151";
          },
          font: (ctx: { index: number }) => {
            const t = sorted[ctx.index];
            return { size: 12, weight: t.esteRomania ? ("bold" as const) : ("normal" as const) };
          },
        },
      },
    },
  };

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/comparatii" className={styles.breadcrumbLink}>
          Comparații
        </Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span>{date.titlu}</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerEmoji}>{date.emoji}</span>
        <div>
          <h1 className={styles.title} style={{ color: date.culoare.replace("0.85", "1") }}>
            {date.titlu}
          </h1>
          <p className={styles.subtitle}>{date.descriere}</p>
        </div>
      </div>

      {/* Chart */}
      <section className={styles.section}>
        {/* Filter buttons */}
        <div className={styles.zonaFilter}>
          <button
            className={`${styles.zonaBtn} ${zona === "europa" ? styles.zonaBtnActiv : ""}`}
            style={zona === "europa" ? { background: date.culoare, borderColor: date.culoare } : {}}
            onClick={() => setZona("europa")}
          >
            🌍 Europa
            <span className={styles.zonaBtnCount}>
              {date.tari.filter((t) => !t.zona).length} țări
            </span>
          </button>
          <button
            className={`${styles.zonaBtn} ${zona === "global" ? styles.zonaBtnActiv : ""}`}
            style={zona === "global" ? { background: date.culoare, borderColor: date.culoare } : {}}
            onClick={() => setZona("global")}
          >
            🌐 Global
            <span className={styles.zonaBtnCount}>
              {date.tari.length} țări
            </span>
          </button>
        </div>

        <h2 className={styles.sectionTitle}>
          Comparație vizuală — {sorted.length} țări {zona === "global" ? "(întreaga lume)" : "(Europa)"}
        </h2>
        <div
          className={styles.chartCard}
          style={{
            borderColor: date.culoareSecundara.replace("0.18", "0.4"),
            boxShadow: `0 8px 40px ${date.culoareSecundara.replace("0.18", "0.3")}`,
          }}
        >
          <div className={styles.chartLegend}>
            <span
              className={styles.legendRo}
              style={{ background: date.culoare, border: `2px solid ${date.culoare}` }}
            />
            <span className={styles.legendText}>România</span>
            <span
              className={styles.legendAlt}
              style={{
                background: date.culoareSecundara.replace("0.18)", "0.5)"),
                border: `1px solid ${date.culoareSecundara.replace("0.18)", "0.8)")}`,
              }}
            />
            <span className={styles.legendText}>Alte țări</span>
          </div>
          <div className={styles.chartWrap} style={{ height: `${sorted.length * 34 + 40}px` }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* România în context */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          România în context {zona === "global" ? "mondial" : "european"}
        </h2>
        <div
          className={styles.contextCard}
          style={{
            borderColor: date.culoareSecundara.replace("0.18", "0.4"),
            background: date.culoareSecundara,
          }}
        >
          <div className={styles.contextStats}>
            <div className={styles.contextStat}>
              <span className={styles.contextStatVal} style={{ color: date.culoare.replace("0.85", "1") }}>
                {romania?.cotaStandard}{date.unitateMasura === "%" ? "%" : ` ${date.unitateMasura}`}
              </span>
              <span className={styles.contextStatLabel}>Cota României</span>
            </div>
            <div className={styles.contextStatDiv} />
            <div className={styles.contextStat}>
              <span className={styles.contextStatVal}>{date.mediuEuropean}%</span>
              <span className={styles.contextStatLabel}>Media europeană</span>
            </div>
            <div className={styles.contextStatDiv} />
            <div className={styles.contextStat}>
              <span className={styles.contextStatVal} style={{ color: date.culoare.replace("0.85", "1") }}>
                #{pozitieRo}/{sorted.length}
              </span>
              <span className={styles.contextStatLabel}>
                Poziție {zona === "global" ? "mondial" : "european"} (desc.)
              </span>
            </div>
          </div>
          <p className={styles.contextText}>{date.contextRomania}</p>
        </div>
      </section>

      {/* Tabel Top 5 mic + mare */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Extremele {zona === "global" ? "mondiale" : "europene"}
        </h2>
        <div className={styles.tabele}>
          <div className={styles.tabelCard}>
            <h3 className={styles.tabelTitlu}>Top 5 — Cele mai mici cote</h3>
            <table className={styles.tabel}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Țară</th>
                  <th>Cotă</th>
                  <th>{sistemHeader}</th>
                </tr>
              </thead>
              <tbody>
                {top5mic.map((t, i) => (
                  <tr key={t.codISO} className={t.esteRomania ? styles.rowRomania : ""}>
                    <td className={styles.tdRank}>{i + 1}</td>
                    <td className={styles.tdTara}>
                      {t.esteRomania ? (
                        <strong style={{ color: date.culoare.replace("0.85", "1") }}>{t.nume} 🇷🇴</strong>
                      ) : (
                        t.nume
                      )}
                    </td>
                    <td
                      className={styles.tdCota}
                      style={t.esteRomania ? { color: date.culoare.replace("0.85", "1"), fontWeight: 700 } : {}}
                    >
                      {t.cotaStandard}{date.unitateMasura === "%" ? "%" : ` ${date.unitateMasura}`}
                    </td>
                    <td className={styles.tdSistem}>{formatSistem(t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tabelCard}>
            <h3 className={styles.tabelTitlu}>Top 5 — Cele mai mari cote</h3>
            <table className={styles.tabel}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Țară</th>
                  <th>Cotă</th>
                  <th>{sistemHeader}</th>
                </tr>
              </thead>
              <tbody>
                {top5mare.map((t, i) => (
                  <tr key={t.codISO} className={t.esteRomania ? styles.rowRomania : ""}>
                    <td className={styles.tdRank}>{i + 1}</td>
                    <td className={styles.tdTara}>
                      {t.esteRomania ? (
                        <strong style={{ color: date.culoare.replace("0.85", "1") }}>{t.nume} 🇷🇴</strong>
                      ) : (
                        t.nume
                      )}
                    </td>
                    <td
                      className={styles.tdCota}
                      style={t.esteRomania ? { color: date.culoare.replace("0.85", "1"), fontWeight: 700 } : {}}
                    >
                      {t.cotaStandard}{date.unitateMasura === "%" ? "%" : ` ${date.unitateMasura}`}
                    </td>
                    <td className={styles.tdSistem}>{formatSistem(t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Istorie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Scurtă istorie</h2>
        <div
          className={styles.istorieCard}
          style={{ borderLeftColor: date.culoare.replace("0.85", "1") }}
        >
          <p>{date.istorie}</p>
        </div>
      </section>

      {/* Fapte interesante */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fapte interesante</h2>
        <ul className={styles.fapteList}>
          {date.fapteInteresante.map((f, i) => (
            <li
              key={i}
              className={styles.faptItem}
              style={{
                borderColor: date.culoareSecundara.replace("0.18", "0.4"),
                animationDelay: `${i * 80}ms`,
              }}
            >
              <span className={styles.faptDot} style={{ background: date.culoare }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Back */}
      <Link href="/comparatii" className={styles.backBtn}>
        ← Înapoi la toate comparațiile
      </Link>
    </main>
  );
}
