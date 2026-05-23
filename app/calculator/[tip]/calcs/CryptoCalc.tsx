"use client";
import { useState } from "react";
import styles from "../../page.module.css";

const SMIN_2026 = new Date().getMonth() >= 6 ? 4325 : 4050;
const COTA_CRYPTO = 0.16;
const COTA_ACTIUNI_LUNG = 0.03;
const COTA_ACTIUNI_SCURT = 0.06;
const COTA_DIVIDENDE = 0.16;
const PLAFON_CASS_MIN = SMIN_2026 * 6; // 24.300 lei
const PLAFON_CASS_MAX = SMIN_2026 * 60; // 243.000 lei

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

function Row({ label, val, neg, bold, green }: {
  label: string; val: string; neg?: boolean; bold?: boolean; green?: boolean;
}) {
  return (
    <div className={`${styles.row} ${bold ? styles.rowBold : ""}`}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={`${styles.rowVal} ${neg ? styles.red : ""} ${green ? styles.green : ""}`}>{val}</span>
    </div>
  );
}

/* ── Tab Crypto ─────────────────────────────── */
function TabCrypto() {
  const [val, setVal] = useState(0);
  const [scutit, setScutit] = useState(false);

  const impozit = scutit ? 0 : Math.round(val * COTA_CRYPTO);
  const bazaCASS = Math.min(Math.max(val, PLAFON_CASS_MIN), PLAFON_CASS_MAX);
  const cass = (!scutit && val >= PLAFON_CASS_MIN) ? Math.round(bazaCASS * 0.1) : 0;
  const total = impozit + cass;

  return (
    <div className={styles.calcCard}>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>ℹ️</span>
        <span>Din 2026, impozitul pe câștigurile crypto este <strong>16%</strong>. Prin DAC8, ANAF primește automat rapoarte de la platformele de tranzacționare. Declarați chiar dacă nu primiți notificare.</span>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Câștig net total din crypto în 2025 (lei)</label>
        <div className={styles.rangeWrap}>
          <input type="range" min={0} max={500000} step={1000} value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            aria-label="Câștig net crypto" />
          <span className={styles.rangeValue}>{fmt(val)} lei</span>
        </div>
        <input className={styles.inputSmall} type="number" value={val || ""} min={0} step={1000}
          placeholder="ex: 10000"
          onChange={(e) => setVal(Math.max(0, Number(e.target.value) || 0))}
          aria-label="Valoare exactă câștig crypto" />
        <p className={styles.hint}>Câștiguri minus pierderi compensate din același an</p>
      </div>

      <div className={styles.checkRow}>
        <input type="checkbox" id="scutitCrypto" checked={scutit}
          onChange={e => setScutit(e.target.checked)} />
        <label htmlFor="scutitCrypto">
          Câștiguri individuale sub 200 lei/tranzacție cu total anual sub 600 lei (scutit)
        </label>
      </div>

      {scutit && (
        <div className={styles.infoBox} style={{ marginTop: 12 }}>
          <span className={styles.infoIcon}>✅</span>
          <span>Scutit de impozit și de obligația de declarare (art. 116 Cod fiscal).</span>
        </div>
      )}

      {val > 0 && !scutit && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600, color: val >= PLAFON_CASS_MIN ? "#dc2626" : "#6b7280", marginBottom: 5 }}>
            <span>Prag CASS ({fmt(PLAFON_CASS_MIN)} lei)</span>
            <span>{val >= PLAFON_CASS_MIN ? "Depășit — CASS datorată" : `${fmt(val)} / ${fmt(PLAFON_CASS_MIN)} lei`}</span>
          </div>
          <div style={{ height: 8, borderRadius: 6, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.min((val / PLAFON_CASS_MIN) * 100, 100)}%`,
              background: val >= PLAFON_CASS_MIN
                ? "linear-gradient(90deg, #f97316, #dc2626)"
                : "linear-gradient(90deg, #22c55e, #f59e0b)",
              borderRadius: 6,
              transition: "width 0.5s ease, background 0.3s ease",
            }} />
          </div>
        </div>
      )}

      {val > 0 && !scutit && (
        <div className={styles.rezultate} aria-live="polite">
          <p className={styles.rezSectionLabel}>IMPOZIT CRYPTO 2026</p>
          <Row label="Câștig net" val={`${fmt(val)} lei`} />
          <Row label="Impozit 16%" val={`−${fmt(impozit)} lei`} neg />
          {cass > 0
            ? <Row label="CASS 10% (obligatorie)" val={`−${fmt(cass)} lei`} neg />
            : val > 0 && <Row label={`CASS — sub plafonul de ${fmt(PLAFON_CASS_MIN)} lei`} val="scutit" />
          }
          <div className={styles.separator} />
          <Row label="Total de plătit" val={`${fmt(total)} lei`} bold />
          <Row label="Net după impozite" val={`${fmt(val - total)} lei`} bold green />

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>DECLARAȚII NECESARE</p>
          <div className={styles.declaratiiList}>
            <span className={styles.decTag}>D212 — termen 25 mai 2026</span>
            <span className={styles.decTag}>Termen: 25 mai 2026 (bonificația 3% a expirat)</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Tab Acțiuni Bursă ──────────────────────── */
function TabActiuni() {
  const [lung, setLung] = useState(0);
  const [scurt, setScurt] = useState(0);

  const valLung = lung;
  const valScurt = scurt;
  const impLung = Math.round(valLung * COTA_ACTIUNI_LUNG);
  const impScurt = Math.round(valScurt * COTA_ACTIUNI_SCURT);
  const totalCastig = valLung + valScurt;
  const totalImp = impLung + impScurt;
  const bazaCASS = Math.min(Math.max(totalCastig, PLAFON_CASS_MIN), PLAFON_CASS_MAX);
  const cass = totalCastig >= PLAFON_CASS_MIN ? Math.round(bazaCASS * 0.1) : 0;

  return (
    <div className={styles.calcCard}>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>ℹ️</span>
        <span>Dacă câștigurile sunt prin broker autorizat, impozitul este <strong>reținut la sursă</strong>. Nu trebuie să-l declari tu, dar se ia în calcul pentru CASS dacă total &gt; 24.300 lei.</span>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Câștig net acțiuni deținute &gt; 365 zile (lei)</label>
        <div className={styles.rangeWrap}>
          <input type="range" min={0} max={500000} step={1000} value={lung}
            onChange={(e) => setLung(Number(e.target.value))}
            aria-label="Câștig acțiuni deținute peste 365 zile" />
          <span className={styles.rangeValue}>{fmt(lung)} lei</span>
        </div>
        <input className={styles.inputSmall} type="number" value={lung || ""} min={0} step={1000}
          placeholder="ex: 10000"
          onChange={(e) => setLung(Math.max(0, Number(e.target.value) || 0))}
          aria-label="Valoare exactă câștig acțiuni lung" />
        <p className={styles.hint}>Impozit 3% reținut la sursă de broker</p>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Câștig net acțiuni deținute &lt; 365 zile (lei)</label>
        <div className={styles.rangeWrap}>
          <input type="range" min={0} max={500000} step={1000} value={scurt}
            onChange={(e) => setScurt(Number(e.target.value))}
            aria-label="Câștig acțiuni deținute sub 365 zile" />
          <span className={styles.rangeValue}>{fmt(scurt)} lei</span>
        </div>
        <input className={styles.inputSmall} type="number" value={scurt || ""} min={0} step={1000}
          placeholder="ex: 5000"
          onChange={(e) => setScurt(Math.max(0, Number(e.target.value) || 0))}
          aria-label="Valoare exactă câștig acțiuni scurt" />
        <p className={styles.hint}>Impozit 6% reținut la sursă de broker</p>
      </div>

      {(valLung > 0 || valScurt > 0) && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>IMPOZITE REȚINUTE LA SURSĂ</p>
          {valLung > 0 && <Row label="Impozit 3% (>365 zile)" val={`${fmt(impLung)} lei`} neg />}
          {valScurt > 0 && <Row label="Impozit 6% (<365 zile)" val={`${fmt(impScurt)} lei`} neg />}
          <Row label="Total impozit reținut" val={`${fmt(totalImp)} lei`} bold />

          <div className={styles.separator} />
          <div style={{ margin: "8px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", fontWeight: 600, color: totalCastig >= PLAFON_CASS_MIN ? "#dc2626" : "#6b7280", marginBottom: 4 }}>
              <span>Prag CASS</span>
              <span>{totalCastig >= PLAFON_CASS_MIN ? "Depășit" : `${fmt(totalCastig)} / ${fmt(PLAFON_CASS_MIN)} lei`}</span>
            </div>
            <div style={{ height: 7, borderRadius: 5, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min((totalCastig / PLAFON_CASS_MIN) * 100, 100)}%`, background: totalCastig >= PLAFON_CASS_MIN ? "linear-gradient(90deg,#f97316,#dc2626)" : "linear-gradient(90deg,#22c55e,#f59e0b)", borderRadius: 5, transition: "width 0.5s ease" }} />
            </div>
          </div>

          {cass > 0 && (
            <>
              <p className={styles.rezSectionLabel}>CASS DATORATĂ</p>
              <Row label="Total câștiguri" val={`${fmt(totalCastig)} lei`} />
              <Row label="CASS 10%" val={`−${fmt(cass)} lei`} neg />
              <p className={styles.hint}>Trebuie declarată prin D212 — termen: 25 mai 2026</p>
            </>
          )}
          {totalCastig > 0 && totalCastig < PLAFON_CASS_MIN && (
            <Row label={`CASS — sub plafonul de ${fmt(PLAFON_CASS_MIN)} lei`} val="scutit" />
          )}
        </div>
      )}
    </div>
  );
}

/* ── Tab Dividende ──────────────────────────── */
function TabDividende() {
  const [val, setVal] = useState(0);
  const [alte, setAlte] = useState(0);

  const impDiv = Math.round(val * COTA_DIVIDENDE);
  const netDiv = val - impDiv;
  const totalVenit = val + alte;
  const bazaCASS = Math.min(Math.max(totalVenit, PLAFON_CASS_MIN), PLAFON_CASS_MAX);
  const cass = totalVenit >= PLAFON_CASS_MIN ? Math.round(bazaCASS * 0.1) : 0;

  return (
    <div className={styles.calcCard}>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>ℹ️</span>
        <span>Impozitul pe dividende de <strong>16%</strong> este reținut la sursă de firmă (D205). Dacă dividendele + alte venituri pasive depășesc <strong>24.300 lei</strong>, datorezi și CASS.</span>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Dividende primite brut în 2025 (lei)</label>
        <div className={styles.rangeWrap}>
          <input type="range" min={0} max={1000000} step={5000} value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            aria-label="Dividende brute" />
          <span className={styles.rangeValue}>{fmt(val)} lei</span>
        </div>
        <input className={styles.inputSmall} type="number" value={val || ""} min={0} step={5000}
          placeholder="ex: 50000"
          onChange={(e) => setVal(Math.max(0, Number(e.target.value) || 0))}
          aria-label="Valoare exactă dividende" />
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Alte venituri pasive (chirii, crypto, dobânzi) <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" value={alte || ""} min={0} step={1000}
          placeholder="ex: 5000"
          onChange={(e) => setAlte(Math.max(0, Number(e.target.value) || 0))}
          aria-label="Alte venituri pasive" />
        <p className={styles.hint}>Necesar pentru calculul plafonului CASS cumulat</p>
      </div>

      {val > 0 && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>IMPOZIT DIVIDENDE (reținut la sursă)</p>
          <Row label="Dividende brute" val={`${fmt(val)} lei`} />
          <Row label="Impozit 16% (reținut de firmă)" val={`−${fmt(impDiv)} lei`} neg />
          <Row label="Dividende nete primite" val={`${fmt(netDiv)} lei`} bold green />

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>CASS CUMULAT</p>
          <Row label="Total venituri pasive" val={`${fmt(totalVenit)} lei`} />
          <div style={{ margin: "8px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", fontWeight: 600, color: totalVenit >= PLAFON_CASS_MIN ? "#dc2626" : "#6b7280", marginBottom: 4 }}>
              <span>Prag CASS</span>
              <span>{totalVenit >= PLAFON_CASS_MIN ? "Depășit" : `${fmt(totalVenit)} / ${fmt(PLAFON_CASS_MIN)} lei`}</span>
            </div>
            <div style={{ height: 7, borderRadius: 5, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min((totalVenit / PLAFON_CASS_MIN) * 100, 100)}%`, background: totalVenit >= PLAFON_CASS_MIN ? "linear-gradient(90deg,#f97316,#dc2626)" : "linear-gradient(90deg,#22c55e,#f59e0b)", borderRadius: 5, transition: "width 0.5s ease" }} />
            </div>
          </div>
          {cass > 0
            ? <>
                <Row label="CASS 10% (datorată prin D212)" val={`−${fmt(cass)} lei`} neg />
                <div className={styles.declaratiiList} style={{ marginTop: 8 }}>
                  <span className={styles.decTag}>D212 — termen 25 mai</span>
                  <span className={styles.decTag}>Termen: 25 mai 2026 (bonificația 3% a expirat)</span>
                </div>
              </>
            : <Row label={`CASS — sub plafonul de ${fmt(PLAFON_CASS_MIN)} lei`} val="scutit" />
          }
        </div>
      )}
    </div>
  );
}

/* ── Main CalculatorCrypto ──────────────────── */
type SubTab = "crypto" | "actiuni" | "dividende";

export default function CalculatorCrypto() {
  const [sub, setSub] = useState<SubTab>("crypto");

  const subTabs: { id: SubTab; label: string }[] = [
    { id: "crypto", label: "₿ Crypto" },
    { id: "actiuni", label: "📈 Acțiuni bursă" },
    { id: "dividende", label: "💰 Dividende" },
  ];

  return (
    <div>
      <div className={styles.btnGroup} style={{ marginBottom: "1.5rem" }}>
        {subTabs.map(t => (
          <button key={t.id}
            className={`${styles.btnOption} ${sub === t.id ? styles.activ : ""}`}
            onClick={() => setSub(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {sub === "crypto" && <TabCrypto />}
      {sub === "actiuni" && <TabActiuni />}
      {sub === "dividende" && <TabDividende />}
    </div>
  );
}
