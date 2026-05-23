"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";
import CopyBtn from "@/components/CopyBtn";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const SMIN = 4050;
const PRAG_CASS_DIV = 6 * SMIN;    // 24300 lei
const PLAFON_CASS_DIV = 60 * SMIN; // 243000 lei

export default function SrlCalc() {
  const [regim,    setRegim]    = useState<"micro" | "profit">("micro");
  const [ca,       setCa]       = useState(200000);
  const [profit,   setProfit]   = useState(50000);
  const [distribui, setDistribui] = useState(true);

  // Micro 2026: cotă unică 1% (eliminată cota 3%), plafon 100.000 EUR
  const cotaMicro   = 0.01;
  const impozitMicro = regim === "micro" ? ca * cotaMicro : 0;

  // Impozit profit 16%
  const impozitProfit = regim === "profit" ? profit * 0.16 : 0;

  const profitNet = regim === "micro"
    ? ca - impozitMicro  // simplificat
    : profit - impozitProfit;

  // Dividende: impozit 16% + CASS dacă venituri pasive > 24.300 lei (6 x SMIN)
  const impozitDiv = distribui ? profitNet * 0.16 : 0;
  const cassDiv    = distribui && profitNet > PRAG_CASS_DIV
    ? Math.min(profitNet, PLAFON_CASS_DIV) * 0.10
    : 0;

  const ramas = distribui ? Math.max(0, profitNet - impozitDiv - cassDiv) : profitNet;

  const impozitTotal = (regim === "micro" ? impozitMicro : impozitProfit) + impozitDiv + cassDiv;

  const segments = [
    { label: regim === "micro" ? "Impozit micro 1%" : "Impozit profit 16%",
      value: regim === "micro" ? impozitMicro : impozitProfit, color: "#ef4444" },
    { label: "Impozit dividende 16%", value: impozitDiv,  color: "#f97316" },
    { label: "CASS dividende",       value: cassDiv,     color: "#eab308" },
    { label: "Rămas net",            value: ramas,       color: "#22c55e" },
  ].filter((s) => s.value > 0);
  const totalSeg = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator SRL / Firmă</div>
        <div className={styles.cardSubtitle}>Microîntreprindere 1% (cotă unică 2026) sau Impozit profit 16% · România 2026</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.field}>
          <label>Regim fiscal</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${regim === "micro" ? styles.toggleBtnActive : ""}`}
              onClick={() => setRegim("micro")}>Microîntreprindere (CA ≤ 100k EUR)</button>
            <button className={`${styles.toggleBtn} ${regim === "profit" ? styles.toggleBtnActive : ""}`}
              onClick={() => setRegim("profit")}>Impozit pe profit 16%</button>
          </div>
        </div>

        {regim === "micro" ? (
          <>
            <div className={styles.field}>
              <label>Cifră de afaceri anuală (lei)</label>
              <input type="number" value={ca} min={0} step={10000}
                onChange={(e) => setCa(Number(e.target.value))} />
            </div>
          </>
        ) : (
          <div className={styles.field}>
            <label>Profit impozabil anual (lei)</label>
            <input type="number" value={profit} min={0} step={5000}
              onChange={(e) => setProfit(Number(e.target.value))} />
          </div>
        )}

        <div className={styles.field}>
          <label>Distribui profitul ca dividende?</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${distribui ? styles.toggleBtnActive : ""}`}
              onClick={() => setDistribui(true)}>Da, distribui dividende</button>
            <button className={`${styles.toggleBtn} ${!distribui ? styles.toggleBtnActive : ""}`}
              onClick={() => setDistribui(false)}>Nu, rămâne în firmă</button>
          </div>
        </div>

        <div className={styles.results} aria-live="polite">
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>{distribui ? "Dividende nete" : "Profit rămas în firmă"}</span>
            <span className={styles.resultValue}>{fmt(ramas)}</span>
            <span className={styles.resultUnit}>lei/an</span>
          </div>
          <div className={styles.resultRows}>
            {regim === "micro" ? (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Impozit micro 1%</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitMicro)} lei</span>
              </div>
            ) : (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Impozit profit 16%</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitProfit)} lei</span>
              </div>
            )}
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Profit net disponibil</span>
              <span className={styles.resultRowVal}>{fmt(profitNet)} lei</span>
            </div>
            {distribui && (
              <>
                <div className={styles.resultRow}>
                  <span className={styles.resultRowLabel}>Impozit dividende 16%</span>
                  <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitDiv)} lei</span>
                </div>
                {cassDiv > 0 && (
                  <div className={styles.resultRow}>
                    <span className={styles.resultRowLabel}>CASS dividende 10%</span>
                    <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(cassDiv)} lei</span>
                  </div>
                )}
              </>
            )}
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Total taxe</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitTotal)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Rata efectivă de taxare</span>
              <span className={styles.resultRowVal}>
                {((impozitTotal / (regim === "micro" ? ca : profit)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          {totalSeg > 0 && (
            <div className={styles.breakdown}>
              <div className={styles.breakdownBar}>
                {segments.map((s) => (
                  <div key={s.label} className={styles.breakdownSeg}
                    style={{ width: `${(s.value / totalSeg) * 100}%`, background: s.color }} />
                ))}
              </div>
              <div className={styles.breakdownLegend}>
                {segments.map((s) => (
                  <span key={s.label} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: s.color }} />
                    {s.label}: {fmt(s.value)} lei
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
                <CopyBtn text={`Calculator SRL — FocusTax 2026\nRegim: ${regim === "micro" ? "micro 1%" : "profit 16%"}\n${regim === "micro" ? `CA: ${fmt(ca)} lei\nImpozit micro 1%: −${fmt(impozitMicro)} lei` : `Profit impozabil: ${fmt(profit)} lei\nImpozit profit 16%: −${fmt(impozitProfit)} lei`}\nProfit net: ${fmt(profitNet)} lei${distribui ? `\nImpozit dividende 16%: −${fmt(impozitDiv)} lei${cassDiv > 0 ? `\nCASS dividende: −${fmt(cassDiv)} lei` : ""}\nDividende nete: ${fmt(ramas)} lei` : ""}`} />
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoBox}>
          Microîntreprindere 2026: cotă unică <strong>1%</strong>, plafon CA ≤ <strong>100.000 EUR/an</strong> (≈ 510.000 lei). Cota de 3% a fost eliminată din 2026.
          Impozit dividende <strong>16%</strong>. CASS la dividende se aplică dacă totalul veniturilor pasive depășește <strong>24.300 lei/an</strong>.
        </div>
      </div>
    </div>
  );
}
