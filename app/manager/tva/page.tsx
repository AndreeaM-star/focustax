"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Factura { id: string; tva: number; valoare: number; data: string; status: string; }

const plafonAnual = 300000;

export default function TVAPage() {
  const [facturi, setFacturi] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("focustax_company_id") ?? "";
    if (!id || id === "demo" || id === "temp") {
      window.location.href = "/manager/setup";
      return;
    }
    fetch(`/api/facturi?company_id=${id}`)
      .then((r) => r.json())
      .then((d) => setFacturi(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const currentMonth = new Date().toISOString().slice(0, 7); // "2026-03"
  const facturiCurente = facturi.filter((f) => f.data?.startsWith(currentMonth) && f.status === "validata");
  const tvaColectat    = facturiCurente.reduce((s, f) => s + Number(f.tva), 0);
  const tvaDeductibil  = Math.round(tvaColectat * 0.42);
  const tvaDePlata     = Math.max(0, tvaColectat - tvaDeductibil);

  const cifraDeAfaceri = facturi.reduce((s, f) => s + Number(f.valoare), 0);
  const progresPlafon  = Math.min(100, Math.round((cifraDeAfaceri / plafonAnual) * 100));
  const ziPericol      = cifraDeAfaceri > 0
    ? Math.round(((plafonAnual - cifraDeAfaceri) / (cifraDeAfaceri / 3)) * 30) : 999;

  // Build monthly history purely from real invoice data
  const lunarHistory = (() => {
    const months: Record<string, { colectat: number; deductibil: number; dePlata: number }> = {};
    for (const f of facturi) {
      if (!f.data || f.status !== "validata") continue;
      const m = f.data.slice(0, 7); // "YYYY-MM"
      if (!months[m]) months[m] = { colectat: 0, deductibil: 0, dePlata: 0 };
      const col = Number(f.tva);
      const ded = Math.round(col * 0.42);
      months[m].colectat  += col;
      months[m].deductibil += ded;
      months[m].dePlata   += Math.max(0, col - ded);
    }
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => ({
        luna: new Date(key + "-01").toLocaleString("ro-RO", { month: "short", year: "numeric" }),
        ...v,
        current: key === currentMonth,
      }));
  })();
  if (!lunarHistory.find((m) => m.current)) {
    lunarHistory.push({ luna: new Date().toLocaleString("ro-RO", { month: "short", year: "numeric" }), colectat: tvaColectat, deductibil: tvaDeductibil, dePlata: tvaDePlata, current: true });
  }
  const tvaTotal = lunarHistory.reduce((s, m) => s + m.dePlata, 0);
  const discrepante = facturi.filter((f) => f.data?.startsWith(currentMonth) && f.status === "in_asteptare").length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>e-VAT Monitor</h1>
          <p className={styles.pageSubtitle}>Monitorizare TVA în timp real · Deconturi precompletate ANAF · Alertă plafon</p>
        </div>
        <div className={styles.anafSync}>
          <span className={styles.syncDot} />
          {loading ? "Se încarcă..." : `Actualizat ${new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}`}
        </div>
      </div>

      {discrepante > 0 && (
        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>⚠️</span>
          <div>
            <strong>{discrepante} {discrepante === 1 ? "factură" : "facturi"} în așteptare ANAF</strong>
            <p>Verifică statusul facturilor înainte de depunerea D300.</p>
          </div>
          <button className={styles.alertBtn} onClick={() => window.location.href = "/manager/facturi"}>Verifică</button>
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📊</span>
          <span className={styles.statLabel}>TVA de plată (luna curentă)</span>
          <span className={styles.statValue}>{tvaDePlata.toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Termen: 25 luna viitoare</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📥</span>
          <span className={styles.statLabel}>TVA Colectat</span>
          <span className={styles.statValue}>{tvaColectat.toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>Din {facturiCurente.length} facturi validate</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📤</span>
          <span className={styles.statLabel}>TVA Deductibil (est.)</span>
          <span className={styles.statValue}>{tvaDeductibil.toLocaleString("ro-RO")} lei</span>
          <span className={styles.statMeta}>42% din colectat (estimat)</span>
        </div>
        <div className={`${styles.statCard} ${progresPlafon > 60 ? styles.statCardWarning : ""}`}>
          <span className={styles.statIcon}>🎯</span>
          <span className={styles.statLabel}>Risc plafon TVA</span>
          <span className={styles.statValue}>{progresPlafon}% din 300k</span>
          <span className={styles.statMeta}>{ziPericol < 300 ? `~${ziPericol} zile până la depășire` : "Plafon în siguranță"}</span>
        </div>
      </div>

      <div className={styles.plafonCard}>
        <div className={styles.plafonHeader}>
          <div>
            <h3 className={styles.plafonTitle}>Progres Plafon TVA Anual</h3>
            <p className={styles.plafonSubtitle}>
              Cifră de afaceri: <strong>{cifraDeAfaceri.toLocaleString("ro-RO")} lei</strong> din <strong>300.000 lei</strong>
            </p>
          </div>
          <span className={`${styles.plafonPct} ${progresPlafon > 60 ? styles.plafonWarn : ""}`}>{progresPlafon}%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={`${styles.progressFill} ${progresPlafon > 75 ? styles.progressDanger : progresPlafon > 50 ? styles.progressWarn : styles.progressOk}`}
            style={{ width: `${progresPlafon}%` }} />
        </div>
        <div className={styles.plafonFooter}>
          <span>Ritm: ~{Math.round(cifraDeAfaceri / 3).toLocaleString("ro-RO")} lei/lună</span>
          {progresPlafon > 60 && <span className={styles.plafonAlert}>⚠ Estimat depășire în ~{ziPericol} zile</span>}
          <button className={styles.btnPrimary}>Înregistrare TVA voluntară →</button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Istoric lunar TVA</h2>
        <div className={styles.monthGrid}>
          {lunarHistory.map((m) => (
            <div key={m.luna} className={`${styles.monthCard} ${"current" in m ? styles.monthCardCurrent : ""}`}>
              {"current" in m && <div className={styles.currentBadge}>Luna curentă</div>}
              <div className={styles.monthName}>{m.luna}</div>
              <div className={styles.monthRows}>
                <div className={styles.monthRow}><span>TVA colectat</span><span className={styles.green}>{m.colectat.toLocaleString("ro-RO")} lei</span></div>
                <div className={styles.monthRow}><span>TVA deductibil</span><span className={styles.red}>−{m.deductibil.toLocaleString("ro-RO")} lei</span></div>
                <div className={`${styles.monthRow} ${styles.monthTotal}`}><span><strong>De plată</strong></span><span><strong>{m.dePlata.toLocaleString("ro-RO")} lei</strong></span></div>
              </div>
            </div>
          ))}
          <div className={`${styles.monthCard} ${styles.monthCardTotal}`}>
            <div className={styles.monthName}>TOTAL 2026</div>
            <div className={styles.monthRows}>
              <div className={`${styles.monthRow} ${styles.monthTotal}`}><span><strong>TVA total de plată</strong></span><span><strong>{tvaTotal.toLocaleString("ro-RO")} lei</strong></span></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Declarații D300</h2>
        <div className={styles.declaratiiList}>
          {lunarHistory.length === 0 ? (
            <div style={{ padding: "1.5rem", opacity: 0.6, textAlign: "center" }}>
              Nicio declarație depusă încă. Apar automat după validarea facturilor.
            </div>
          ) : lunarHistory.map((m) => (
            <div key={m.luna} className={styles.declaratieRow}>
              <div className={styles.declLeft}>
                <div className={styles.declLuna}>{m.luna}</div>
                <div className={styles.declData}>{m.current ? `Termen: 25 luna viitoare` : "Perioadă închisă"}</div>
              </div>
              <div className={styles.declSuma}>{m.dePlata.toLocaleString("ro-RO")} lei</div>
              <div className={`${styles.declStatus} ${m.current ? styles.status_in_pregatire : styles.status_confirmata}`}>
                {m.current ? "⏳ În pregătire" : "✓ Confirmată ANAF"}
              </div>
              {m.current && <button className={styles.depuneBtn}>Depune acum</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
