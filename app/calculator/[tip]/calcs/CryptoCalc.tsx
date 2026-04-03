"use client";
import { useState, useEffect } from "react";
import styles from "../../page.module.css";

const SMIN_2026 = 4050;
const COTA_CRYPTO = 0.16;
const COTA_ACTIUNI_LUNG = 0.03;
const COTA_ACTIUNI_SCURT = 0.06;
const COTA_DIVIDENDE = 0.16;
const PLAFON_CASS_MIN = SMIN_2026 * 6; // 24.300 lei
const PLAFON_CASS_MAX = SMIN_2026 * 72; // 291.600 lei

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
  const [castig, setCastig] = useState("");
  const [scutit, setScutit] = useState(false);

  const val = parseFloat(castig) || 0;
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
        <input className={styles.input} type="number" placeholder="ex: 10.000"
          value={castig} onChange={e => setCastig(e.target.value)} />
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
        <div className={styles.rezultate}>
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
            <span className={styles.decTag}>Bonificație 3% dacă depui până 15 apr</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Tab Acțiuni Bursă ──────────────────────── */
function TabActiuni() {
  const [lung, setLung] = useState("");
  const [scurt, setScurt] = useState("");

  const valLung = parseFloat(lung) || 0;
  const valScurt = parseFloat(scurt) || 0;
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
        <input className={styles.input} type="number" placeholder="ex: 10.000"
          value={lung} onChange={e => setLung(e.target.value)} />
        <p className={styles.hint}>Impozit 3% reținut la sursă de broker</p>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Câștig net acțiuni deținute &lt; 365 zile (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 5.000"
          value={scurt} onChange={e => setScurt(e.target.value)} />
        <p className={styles.hint}>Impozit 6% reținut la sursă de broker</p>
      </div>

      {(valLung > 0 || valScurt > 0) && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>IMPOZITE REȚINUTE LA SURSĂ</p>
          {valLung > 0 && <Row label="Impozit 3% (>365 zile)" val={`${fmt(impLung)} lei`} neg />}
          {valScurt > 0 && <Row label="Impozit 6% (<365 zile)" val={`${fmt(impScurt)} lei`} neg />}
          <Row label="Total impozit reținut" val={`${fmt(totalImp)} lei`} bold />

          {cass > 0 && (
            <>
              <div className={styles.separator} />
              <p className={styles.rezSectionLabel}>CASS DATORATĂ</p>
              <Row label="Total câștiguri" val={`${fmt(totalCastig)} lei`} />
              <Row label="CASS 10%" val={`−${fmt(cass)} lei`} neg />
              <p className={styles.hint}>Trebuie declarată prin D212 (termen 25 mai / bonificație 15 apr)</p>
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
  const [divBrut, setDivBrut] = useState("");
  const [alteVenituri, setAlteVenituri] = useState("");

  const val = parseFloat(divBrut) || 0;
  const alte = parseFloat(alteVenituri) || 0;
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
        <input className={styles.input} type="number" placeholder="ex: 50.000"
          value={divBrut} onChange={e => setDivBrut(e.target.value)} />
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Alte venituri pasive (chirii, crypto, dobânzi) <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 5.000"
          value={alteVenituri} onChange={e => setAlteVenituri(e.target.value)} />
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
          {cass > 0
            ? <>
                <Row label="CASS 10% (datorată prin D212)" val={`−${fmt(cass)} lei`} neg />
                <div className={styles.declaratiiList} style={{ marginTop: 8 }}>
                  <span className={styles.decTag}>D212 — termen 25 mai</span>
                  <span className={styles.decTag}>Bonificație 3% dacă depui până 15 apr</span>
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
