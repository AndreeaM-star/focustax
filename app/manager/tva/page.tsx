"use client";

import styles from "./page.module.css";

const plafonAnual = 300000;
const cifraDeAfaceriAnuala = 216400; // ytd
const tvaColectatLunar = [
  { luna: "Ian", colectat: 18200, deductibil: 9400, dePlata: 8800 },
  { luna: "Feb", colectat: 21400, deductibil: 11200, dePlata: 10200 },
  { luna: "Mar", colectat: 28450, deductibil: 14100, dePlata: 14350, current: true },
];

const tvaTotal = tvaColectatLunar.reduce((s, m) => s + m.dePlata, 0);
const progresPlafon = Math.round((cifraDeAfaceriAnuala / plafonAnual) * 100);

const discrepante = [
  { id: "D1", factura: "F2026-0845", desc: "Gamma Logistic SRL", suma: 5800, motiv: "TVA deductibil neconfirmat", status: "warning" },
];

const declaratii = [
  { luna: "Ianuarie 2026", depusa: true, data: "25 Feb 2026", suma: 8800, status: "confirmata" },
  { luna: "Februarie 2026", depusa: true, data: "25 Mar 2026", suma: 10200, status: "confirmata" },
  { luna: "Martie 2026",   depusa: false, data: "25 Apr 2026", suma: 14350, status: "in_pregatire" },
];

export default function TVAPage() {
  const zilesRamase = 30; // days until TVA payment
  const ziPericolPlafon = Math.round(((plafonAnual - cifraDeAfaceriAnuala) / (cifraDeAfaceriAnuala / 3)) * 30);

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
          Sincronizat cu ANAF e-VAT · azi 07:30
        </div>
      </div>

      {/* Alerts */}
      {discrepante.length > 0 && (
        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>⚠️</span>
          <div>
            <strong>Discrepanță detectată în e-VAT</strong>
            <p>1 factură cu TVA deductibil neconfirmat. Verifică și corectează înainte de depunerea D300.</p>
          </div>
          <button className={styles.alertBtn}>Verifică</button>
        </div>
      )}

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📊</span>
          <span className={styles.statLabel}>TVA de plată (Mar)</span>
          <span className={styles.statValue}>{(14350).toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Termen: 25 Aprilie 2026</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📥</span>
          <span className={styles.statLabel}>TVA Colectat (Mar)</span>
          <span className={styles.statValue}>{(28450).toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Din facturi emise validate</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📤</span>
          <span className={styles.statLabel}>TVA Deductibil (Mar)</span>
          <span className={styles.statValue}>{(14100).toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Din facturi primite</span>
        </div>
        <div className={`${styles.statCard} ${progresPlafon > 60 ? styles.statCardWarning : ""}`}>
          <span className={styles.statIcon}>🎯</span>
          <span className={styles.statLabel}>Risc plafon TVA</span>
          <span className={styles.statValue}>{progresPlafon}% din 300k</span>
          <span className={styles.statMeta}>~{ziPericolPlafon} zile până la depășire</span>
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
          <span className={styles.plafonAlert}>
            ⚠ Estimat depășire plafon în ~{ziPericolPlafon} zile
          </span>
          <button className={styles.btnPrimary}>Înregistrare TVA voluntară →</button>
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Istoric lunar TVA</h2>
        <div className={styles.monthGrid}>
          {tvaColectatLunar.map((m) => (
            <div
              key={m.luna}
              className={`${styles.monthCard} ${m.current ? styles.monthCardCurrent : ""}`}
            >
              {m.current && <div className={styles.currentBadge}>Luna curentă</div>}
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
          <div className={styles.monthCard + " " + styles.monthCardTotal}>
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
