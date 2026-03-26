"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Factura {
  id: string;
  tva: number;
  valoare: number;
  data: string;
  status: string;
}

const plafonAnual = 300000;

const declaratiiHistoric = [
  { luna: "Ianuarie 2026", depusa: true,  data: "25 Feb 2026", status: "confirmata" },
  { luna: "Februarie 2026", depusa: true, data: "25 Mar 2026", status: "confirmata" },
  { luna: "Martie 2026",    depusa: false, data: "25 Apr 2026", status: "in_pregatire" },
];

export default function TVAPage() {
  const [facturi, setFacturi] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/facturi")
      .then((r) => r.json())
      .then((data) => setFacturi(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Compute TVA colectat from real facturi (current month = March 2026)
  const currentMonth = "2026-03";
  const facturiCurente = facturi.filter(
    (f) => f.data?.startsWith(currentMonth) && f.status === "validata"
  );
  const tvaColectatCurent = facturiCurente.reduce((s, f) => s + Number(f.tva), 0);
  // Estimate deductibil as ~40% of colectat (typical for services company)
  const tvaDeductibilCurent = Math.round(tvaColectatCurent * 0.42);
  const tvaDePlataCurent = Math.max(0, tvaColectatCurent - tvaDeductibilCurent);

  // CA YTD: sum all facturi valoare
  const cifraDeAfaceriAnuala = facturi.reduce((s, f) => s + Number(f.valoare), 0);
  const progresPlafon = Math.min(100, Math.round((cifraDeAfaceriAnuala / plafonAnual) * 100));

  const lunarHistory = [
    { luna: "Ian", colectat: 18200, deductibil: 9400, dePlata: 8800 },
    { luna: "Feb", colectat: 21400, deductibil: 11200, dePlata: 10200 },
    { luna: "Mar", colectat: tvaColectatCurent || 28450, deductibil: tvaDeductibilCurent || 14100, dePlata: tvaDePlataCurent || 14350, current: true },
  ];
  const tvaTotal = lunarHistory.reduce((s, m) => s + m.dePlata, 0);

  const declaratii = declaratiiHistoric.map((d, i) => ({
    ...d,
    suma: lunarHistory[i]?.dePlata ?? 0,
  }));

  const discrepante = facturi.filter(
    (f) => f.data?.startsWith(currentMonth) && f.status === "in_asteptare"
  ).length;

  const ziPericolPlafon = cifraDeAfaceriAnuala > 0
    ? Math.round(((plafonAnual - cifraDeAfaceriAnuala) / (cifraDeAfaceriAnuala / 3)) * 30)
    : 999;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>e-VAT Monitor</h1>
          <p className={styles.pageSubtitle}>
            Monitorizare TVA în timp real · Deconturi precompletate ANAF · Alertă plafon
          </p>
        </div>
        <div className={styles.anafSync}>
          <span className={styles.syncDot} />
          {loading ? "Se încarcă..." : `Sincronizat cu ANAF · ${new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}`}
        </div>
      </div>

      {/* Alerts */}
      {discrepante > 0 && (
        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>⚠️</span>
          <div>
            <strong>Facturi în așteptare validare ANAF</strong>
            <p>{discrepante} {discrepante === 1 ? "factură" : "facturi"} cu status „în așteptare". Verifică în e-Factura.</p>
          </div>
          <button className={styles.alertBtn} onClick={() => window.location.href = "/manager/facturi"}>
            Verifică
          </button>
        </div>
      )}

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📊</span>
          <span className={styles.statLabel}>TVA de plată (Mar)</span>
          <span className={styles.statValue}>{tvaDePlataCurent.toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Termen: 25 Aprilie 2026</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📥</span>
          <span className={styles.statLabel}>TVA Colectat (Mar)</span>
          <span className={styles.statValue}>{tvaColectatCurent.toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Din {facturiCurente.length} facturi validate</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📤</span>
          <span className={styles.statLabel}>TVA Deductibil (Mar)</span>
          <span className={styles.statValue}>{tvaDeductibilCurent.toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Din facturi primite (estimat)</span>
        </div>
        <div className={`${styles.statCard} ${progresPlafon > 60 ? styles.statCardWarning : ""}`}>
          <span className={styles.statIcon}>🎯</span>
          <span className={styles.statLabel}>Risc plafon TVA</span>
          <span className={styles.statValue}>{progresPlafon}% din 300k</span>
          <span className={styles.statMeta}>
            {ziPericolPlafon < 300 ? `~${ziPericolPlafon} zile până la depășire` : "Plafon în siguranță"}
          </span>
        </div>
      </div>

      {/* Plafon progress */}
      <div className={styles.plafonCard}>
        <div className={styles.plafonHeader}>
          <div>
            <h3 className={styles.plafonTitle}>Progres Plafon TVA Anual</h3>
            <p className={styles.plafonSubtitle}>
              Cifră de afaceri actuală: <strong>{cifraDeAfaceriAnuala.toLocaleString("ro-RO")} lei</strong>
              &nbsp;din <strong>{plafonAnual.toLocaleString("ro-RO")} lei</strong> (300.000 lei prag legal)
            </p>
          </div>
          <span className={`${styles.plafonPct} ${progresPlafon > 60 ? styles.plafonWarn : ""}`}>
            {progresPlafon}%
          </span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${progresPlafon > 75 ? styles.progressDanger : progresPlafon > 50 ? styles.progressWarn : styles.progressOk}`}
            style={{ width: `${progresPlafon}%` }}
          />
          <div className={styles.progressThreshold} style={{ left: "100%" }} title="Prag 300k lei" />
        </div>
        <div className={styles.plafonFooter}>
          <span>Ritmul actual: ~{Math.round(cifraDeAfaceriAnuala / 3).toLocaleString("ro-RO")} lei/lună</span>
          {progresPlafon > 60 && (
            <span className={styles.plafonAlert}>
              ⚠ Estimat depășire plafon în ~{ziPericolPlafon} zile
            </span>
          )}
          <button className={styles.btnPrimary}>Înregistrare TVA voluntară →</button>
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Istoric lunar TVA</h2>
        <div className={styles.monthGrid}>
          {lunarHistory.map((m) => (
            <div key={m.luna}
              className={`${styles.monthCard} ${"current" in m && m.current ? styles.monthCardCurrent : ""}`}
            >
              {"current" in m && m.current && <div className={styles.currentBadge}>Luna curentă</div>}
              <div className={styles.monthName}>{m.luna}</div>
              <div className={styles.monthRows}>
                <div className={styles.monthRow}>
                  <span>TVA colectat</span>
                  <span className={styles.green}>{m.colectat.toLocaleString("ro-RO")} lei</span>
                </div>
                <div className={styles.monthRow}>
                  <span>TVA deductibil</span>
                  <span className={styles.red}>−{m.deductibil.toLocaleString("ro-RO")} lei</span>
                </div>
                <div className={`${styles.monthRow} ${styles.monthTotal}`}>
                  <span><strong>De plată</strong></span>
                  <span><strong>{m.dePlata.toLocaleString("ro-RO")} lei</strong></span>
                </div>
              </div>
            </div>
          ))}
          <div className={`${styles.monthCard} ${styles.monthCardTotal}`}>
            <div className={styles.monthName}>TOTAL 2026</div>
            <div className={styles.monthRows}>
              <div className={`${styles.monthRow} ${styles.monthTotal}`}>
                <span><strong>TVA total de plată</strong></span>
                <span><strong>{tvaTotal.toLocaleString("ro-RO")} lei</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* D300 Declarations */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Declarații D300</h2>
        <div className={styles.declaratiiList}>
          {declaratii.map((d) => (
            <div key={d.luna} className={styles.declaratieRow}>
              <div className={styles.declLeft}>
                <div className={styles.declLuna}>{d.luna}</div>
                <div className={styles.declData}>
                  {d.depusa ? `Depusă ${d.data}` : `Termen: ${d.data}`}
                </div>
              </div>
              <div className={styles.declSuma}>{d.suma.toLocaleString("ro-RO")} lei</div>
              <div className={`${styles.declStatus} ${styles[`status_${d.status}`]}`}>
                {d.status === "confirmata" ? "✓ Confirmată ANAF" :
                 d.status === "in_pregatire" ? "⏳ În pregătire" : "Depusă"}
              </div>
              {!d.depusa && (
                <button className={styles.depuneBtn}>Depune acum</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
