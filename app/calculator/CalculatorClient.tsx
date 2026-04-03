"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import CalculatorCrypto from "./[tip]/calcs/CryptoCalc";

type Tab = "salariu" | "pfa" | "firma" | "chirii" | "tva" | "crypto";

/* ── helpers ──────────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const fmtDec = (n: number) =>
  n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const getSMIN = () => new Date().getMonth() >= 6 ? 4325 : 4050;
const SMIN = getSMIN();

/* ── Visual Breakdown Bar ─────────────────── */
function BreakdownBar({ segments }: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  if (total <= 0) return null;
  return (
    <div className={styles.breakdown}>
      <div className={styles.breakdownBar}>
        {segments.map((seg, i) => (
          <div
            key={i}
            className={styles.breakdownSegment}
            style={{ width: `${(seg.value / total) * 100}%`, background: seg.color }}
            title={`${seg.label}: ${fmt(seg.value)} lei`}
          />
        ))}
      </div>
      <div className={styles.breakdownLegend}>
        {segments.map((seg, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: seg.color }} />
            <span className={styles.legendLabel}>{seg.label}</span>
            <span className={styles.legendPct}>{((seg.value / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SALARIU ──────────────────────────────── */
function CalculatorSalariu() {
  const [brut, setBrut] = useState("");
  const [handicap, setHandicap] = useState(false);
  const [ticheteMasa, setTicheteMasa] = useState("");
  const [rez, setRez] = useState<null | Record<string, number>>(null);

  useEffect(() => {
    const b = parseFloat(brut) || 0;
    if (b <= 0) { setRez(null); return; }
    const tm = parseFloat(ticheteMasa) || 0;
    const cas = b * 0.25;
    const cass = b * 0.1;
    const bazaImpozit = b - cas - cass - 300 - (handicap ? b * 0.03 : 0);
    const impozit = Math.max(0, bazaImpozit * 0.1);
    const net = b - cas - cass - impozit;
    const cam = b * 0.0225;
    const costAngajator = b + cam;
    setRez({ brut: b, cas, cass, impozit, net, netCuTichete: net + tm, cam, costAngajator, ticheteMasa: tm });
  }, [brut, handicap, ticheteMasa]);

  return (
    <div className={styles.calcCard}>
      <div className={styles.calcSection}>
        <label className={styles.label}>Salariu brut lunar (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 5.000" value={brut}
          onChange={e => setBrut(e.target.value)} />
      </div>
      <div className={styles.calcSection}>
        <label className={styles.label}>Tichete de masă / lună <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 400" value={ticheteMasa}
          onChange={e => setTicheteMasa(e.target.value)} />
      </div>
      <div className={styles.checkRow}>
        <input type="checkbox" id="handicap" checked={handicap} onChange={e => setHandicap(e.target.checked)} />
        <label htmlFor="handicap">Persoană cu handicap (deducere 3% suplimentar)</label>
      </div>

      {rez && (
        <div className={styles.rezultate}>
          <BreakdownBar segments={[
            { label: "Net", value: rez.net, color: "#059669" },
            { label: "CAS 25%", value: rez.cas, color: "#2563eb" },
            { label: "CASS 10%", value: rez.cass, color: "#7c3aed" },
            { label: "Impozit 10%", value: rez.impozit, color: "#d97706" },
          ]} />

          <p className={styles.rezSectionLabel}>ANGAJAT — Rețineri din salariu</p>
          <Row label="Salariu brut" val={`${fmt(rez.brut)} lei`} />
          <Row label="CAS (pensii) — 25%" val={`−${fmt(rez.cas)} lei`} neg />
          <Row label="CASS (sănătate) — 10%" val={`−${fmt(rez.cass)} lei`} neg />
          <Row label="Impozit pe venit — 10%" val={`−${fmt(rez.impozit)} lei`} neg />
          <Row label="Salariu net" val={`${fmt(rez.net)} lei`} bold green />
          {rez.ticheteMasa > 0 && <Row label="+ Tichete masă" val={`+${fmt(rez.ticheteMasa)} lei`} pos />}
          {rez.ticheteMasa > 0 && <Row label="Total primit lunar" val={`${fmt(rez.netCuTichete)} lei`} bold green />}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>ANGAJATOR — Cost total</p>
          <Row label="Salariu brut" val={`${fmt(rez.brut)} lei`} />
          <Row label="CAM (contrib. asiguratorie) — 2,25%" val={`+${fmt(rez.cam)} lei`} neg />
          <Row label="Cost total angajator / lună" val={`${fmt(rez.costAngajator)} lei`} bold />

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>ANUAL ESTIMAT</p>
          <Row label="Salariu net anual" val={`${fmt(rez.net * 12)} lei`} bold green />
          <Row label="Cost angajator anual" val={`${fmt(rez.costAngajator * 12)} lei`} />
          <Row label="Rata impozitare efectivă" val={`${(((rez.cas + rez.cass + rez.impozit) / rez.brut) * 100).toFixed(1)}%`} />
        </div>
      )}
    </div>
  );
}

/* ── PFA ──────────────────────────────────── */
function CalculatorPFA() {
  const [venit, setVenit] = useState("");
  const [sistem, setSistem] = useState<"real" | "norma">("real");
  const [cheltuieli, setCheltuieli] = useState("");
  const [platesteCAS, setPlatesteCAS] = useState(true);
  const [bazaCAS, setBazaCAS] = useState<"minim" | "real">("minim");
  const [rez, setRez] = useState<null | Record<string, number>>(null);

  useEffect(() => {
    const v = parseFloat(venit) || 0;
    if (v <= 0) { setRez(null); return; }
    let venNet = v;
    if (sistem === "real") {
      const ch = parseFloat(cheltuieli) || 0;
      venNet = Math.max(0, v - ch);
    }
    const bazaCASval = bazaCAS === "minim" ? SMIN * 12 : Math.max(venNet, SMIN * 12);
    const cas = platesteCAS ? bazaCASval * 0.25 : 0;
    const plafonCASSmin = SMIN * 6;
    const plafonCASSmax = SMIN * 60;
    const bazaCASSval = Math.min(Math.max(venNet, plafonCASSmin), plafonCASSmax);
    const cass = bazaCASSval * 0.1;
    const bazaImpozit = Math.max(0, venNet - cas - cass);
    const impozit = bazaImpozit * 0.1;
    const total = cas + cass + impozit;
    const net = venNet - total;
    setRez({ venBrut: v, venNet, cas, cass, impozit, total, net });
  }, [venit, sistem, cheltuieli, platesteCAS, bazaCAS]);

  return (
    <div className={styles.calcCard}>
      <div className={styles.calcSection}>
        <label className={styles.label}>Venit brut anual (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 80.000" value={venit}
          onChange={e => setVenit(e.target.value)} />
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Sistem de impozitare</label>
        <div className={styles.btnGroup}>
          {(["real", "norma"] as const).map(s => (
            <button key={s} className={`${styles.btnOption} ${sistem === s ? styles.activ : ""}`}
              onClick={() => setSistem(s)}>
              {s === "real" ? "Sistem real" : "Normă de venit"}
            </button>
          ))}
        </div>
      </div>

      {sistem === "real" && (
        <div className={styles.calcSection}>
          <label className={styles.label}>Cheltuieli deductibile anuale (lei)</label>
          <input className={styles.input} type="number" placeholder="ex: 20.000" value={cheltuieli}
            onChange={e => setCheltuieli(e.target.value)} />
        </div>
      )}

      <div className={styles.calcSection}>
        <label className={styles.label}>Baza de calcul CAS (pensii)</label>
        <div className={styles.btnGroup}>
          {(["minim", "real"] as const).map(b => (
            <button key={b} className={`${styles.btnOption} ${bazaCAS === b ? styles.activ : ""}`}
              onClick={() => setBazaCAS(b)}>
              {b === "minim" ? "Salariul minim × 12" : "Venitul net realizat"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.checkRow}>
        <input type="checkbox" id="plasCAS" checked={platesteCAS}
          onChange={e => setPlatesteCAS(e.target.checked)} />
        <label htmlFor="plasCAS">Plătesc CAS (contribuție la pensie)</label>
      </div>

      {rez && (
        <div className={styles.rezultate}>
          <BreakdownBar segments={[
            { label: "Net", value: Math.max(0, rez.net), color: "#059669" },
            ...(rez.cas > 0 ? [{ label: "CAS 25%", value: rez.cas, color: "#2563eb" }] : []),
            { label: "CASS 10%", value: rez.cass, color: "#7c3aed" },
            { label: "Impozit 10%", value: rez.impozit, color: "#d97706" },
          ]} />

          <p className={styles.rezSectionLabel}>VENITURI</p>
          <Row label="Venit brut anual" val={`${fmt(rez.venBrut)} lei`} />
          {rez.venBrut !== rez.venNet && <Row label="Venit net (după cheltuieli)" val={`${fmt(rez.venNet)} lei`} />}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>CONTRIBUȚII & IMPOZIT — D212</p>
          {rez.cas > 0 && <Row label="CAS — 25%" val={`−${fmt(rez.cas)} lei`} neg />}
          <Row label="CASS — 10%" val={`−${fmt(rez.cass)} lei`} neg />
          <Row label="Impozit pe venit — 10%" val={`−${fmt(rez.impozit)} lei`} neg />
          <Row label="Total obligații fiscale" val={`${fmt(rez.total)} lei`} bold />

          <div className={styles.separator} />
          <Row label="Venit net final anual" val={`${fmt(rez.net)} lei`} bold green />
          <Row label="Venit net lunar estimat" val={`${fmt(rez.net / 12)} lei`} />
          <Row label="Rata fiscalizare efectivă" val={`${((rez.total / rez.venNet) * 100).toFixed(1)}%`} />
        </div>
      )}
    </div>
  );
}

/* ── FIRMA ────────────────────────────────── */
function CalculatorFirma() {
  const [tip, setTip] = useState<"micro" | "profit">("micro");
  const [ca, setCa] = useState("");
  const [profit, setProfit] = useState("");
  const [salariati, setSalariati] = useState("1");
  const [sponsorizare, setSponsor] = useState("");
  const [dividende, setDividende] = useState("");
  const [rez, setRez] = useState<null | Record<string, number>>(null);

  useEffect(() => {
    const caVal = parseFloat(ca) || 0;
    const profitVal = parseFloat(profit) || 0;
    const salVal = parseInt(salariati) || 0;
    const sponsVal = parseFloat(sponsorizare) || 0;
    const divVal = parseFloat(dividende) || 0;
    if (caVal <= 0) { setRez(null); return; }

    let impozitFirma = 0;
    if (tip === "micro") {
      const cota = 0.01; // 2026: cotă unică 1%
      impozitFirma = caVal * cota;
      const reducereMax = Math.min(impozitFirma * 0.2, caVal * 0.0075);
      const reducereSpons = Math.min(sponsVal * cota * 2, reducereMax);
      impozitFirma = Math.max(0, impozitFirma - reducereSpons);
    } else {
      impozitFirma = profitVal * 0.16;
      let impMinim = 0;
      if (caVal <= 1_000_000) impMinim = caVal * 0.005;
      else if (caVal <= 5_000_000) impMinim = caVal * 0.004;
      else impMinim = caVal * 0.003;
      impozitFirma = Math.max(impozitFirma, impMinim);
      const reducereSpons = Math.min(sponsVal, impozitFirma * 0.2, caVal * 0.0075);
      impozitFirma = Math.max(0, impozitFirma - reducereSpons);
    }

    const profitNet = tip === "micro" ? caVal - impozitFirma : Math.max(0, profitVal - impozitFirma);
    const impDividende = divVal * 0.16;
    const netDupaDividende = divVal - impDividende;
    const cotaEfectiva = profitVal > 0 ? (impozitFirma / profitVal) * 100 : (impozitFirma / caVal) * 100;
    setRez({ caVal, profitVal, impozitFirma, profitNet, divVal, impDividende, netDupaDividende, cotaEfectiva });
  }, [tip, ca, profit, salariati, sponsorizare, dividende]);

  return (
    <div className={styles.calcCard}>
      <div className={styles.calcSection}>
        <label className={styles.label}>Tipul firmei</label>
        <div className={styles.btnGroup}>
          {(["micro", "profit"] as const).map(t => (
            <button key={t} className={`${styles.btnOption} ${tip === t ? styles.activ : ""}`}
              onClick={() => { setTip(t); }}>
              {t === "micro" ? "Microîntreprindere" : "Impozit pe profit 16%"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Cifra de afaceri anuală (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 500.000" value={ca}
          onChange={e => setCa(e.target.value)} />
      </div>

      {tip === "profit" && (
        <div className={styles.calcSection}>
          <label className={styles.label}>Profit brut (înainte de impozit)</label>
          <input className={styles.input} type="number" placeholder="ex: 100.000" value={profit}
            onChange={e => setProfit(e.target.value)} />
        </div>
      )}

      {tip === "micro" && (
        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>ℹ️</span>
          <span>Din 2026: cotă unică <strong>1%</strong> pentru toate microîntreprinderile. Eliminată cota de 3%. Plafonul: <strong>100.000 EUR/an</strong> (≈510.000 lei).</span>
        </div>
      )}

      <div className={styles.calcSection}>
        <label className={styles.label}>Cheltuieli sponsorizare <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 5.000" value={sponsorizare}
          onChange={e => setSponsor(e.target.value)} />
        <p className={styles.hint}>Reduce impozitul cu max 20% din impozit sau 0.75% din CA</p>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Dividende distribuite <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 50.000" value={dividende}
          onChange={e => setDividende(e.target.value)} />
        <p className={styles.hint}>Impozit dividende: 16% reținut la sursă din 2026 (D205)</p>
      </div>

      {rez && (
        <div className={styles.rezultate}>
          {tip === "micro" ? (
            <BreakdownBar segments={[
              { label: "Profit net", value: rez.profitNet, color: "#059669" },
              { label: "Impozit 1%", value: rez.impozitFirma, color: "#d97706" },
            ]} />
          ) : rez.profitVal > 0 ? (
            <BreakdownBar segments={[
              { label: "Profit net", value: rez.profitNet, color: "#059669" },
              { label: "Impozit 16%", value: rez.impozitFirma, color: "#d97706" },
            ]} />
          ) : null}

          <p className={styles.rezSectionLabel}>IMPOZIT FIRMĂ ({tip === "micro" ? "D100 trimestrial" : "D101 anual"})</p>
          <Row label="Cifra de afaceri" val={`${fmt(rez.caVal)} lei`} />
          {tip === "profit" && rez.profitVal > 0 && <Row label="Profit brut" val={`${fmt(rez.profitVal)} lei`} />}
          <Row label={`Impozit ${tip === "micro" ? "microîntreprindere" : "pe profit"}`} val={`−${fmt(rez.impozitFirma)} lei`} neg />
          <Row label="Profit net după impozit" val={`${fmt(rez.profitNet)} lei`} bold green />
          <Row label="Cotă efectivă" val={`${rez.cotaEfectiva.toFixed(2)}%`} />

          {rez.divVal > 0 && (
            <>
              <div className={styles.separator} />
              <p className={styles.rezSectionLabel}>DIVIDENDE (D205)</p>
              <Row label="Dividende distribuite" val={`${fmt(rez.divVal)} lei`} />
              <Row label="Impozit dividende — 16%" val={`−${fmt(rez.impDividende)} lei`} neg />
              <Row label="Dividende nete" val={`${fmt(rez.netDupaDividende)} lei`} bold green />
            </>
          )}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>DECLARAȚII NECESARE</p>
          <div className={styles.declaratiiList}>
            {tip === "micro" ? (
              <>
                <span className={styles.decTag}>D100 — trimestrial</span>
                {rez.divVal > 0 && <span className={styles.decTag}>D205 — la distribuire</span>}
              </>
            ) : (
              <>
                <span className={styles.decTag}>D101 — anual</span>
                <span className={styles.decTag}>D100 — trimestrial (plăți anticipate)</span>
                {rez.divVal > 0 && <span className={styles.decTag}>D205 — la distribuire</span>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── CHIRII ───────────────────────────────── */
function CalculatorChirii() {
  const [chirieLunara, setChirieLunara] = useState("");
  const [nrLuni, setNrLuni] = useState("12");
  const [optiuneCAS, setOptiuneCAS] = useState(false);
  const [rez, setRez] = useState<null | Record<string, number>>(null);

  useEffect(() => {
    const chirie = parseFloat(chirieLunara) || 0;
    const luni = parseInt(nrLuni) || 12;
    if (chirie <= 0) { setRez(null); return; }

    const venitBrut = chirie * luni;
    // Deducere forfetară 40%
    const deducereForfetara = venitBrut * 0.4;
    const bazaImpozabila = venitBrut - deducereForfetara;
    const impozit = bazaImpozabila * 0.1;

    // CASS: dacă baza impozabilă > 6 salarii minime, se plătește CASS
    const plafonMinCASS = SMIN * 6;
    const plafonMaxCASS = SMIN * 60;
    let cass = 0;
    if (bazaImpozabila >= plafonMinCASS) {
      const bazaCASS = Math.min(bazaImpozabila, plafonMaxCASS);
      cass = bazaCASS * 0.1;
    }

    // CAS opțional (contribuție la pensie — nu e obligatorie pentru chirii)
    const cas = optiuneCAS ? Math.max(bazaImpozabila, SMIN * 12) * 0.25 : 0;

    const totalObligatii = impozit + cass + cas;
    const netAnual = venitBrut - totalObligatii;
    const netLunar = netAnual / luni;
    const rataTotala = (totalObligatii / venitBrut) * 100;

    setRez({ chirie, luni, venitBrut, deducereForfetara, bazaImpozabila, impozit, cass, cas, totalObligatii, netAnual, netLunar, rataTotala });
  }, [chirieLunara, nrLuni, optiuneCAS]);

  return (
    <div className={styles.calcCard}>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>ℹ️</span>
        <span>La venituri din chirii se aplică o deducere forfetară de <strong>40%</strong> din venitul brut, înainte de calculul impozitului de 10%.</span>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Chirie lunară brută (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 2.000" value={chirieLunara}
          onChange={e => setChirieLunara(e.target.value)} />
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Număr luni închiriate / an</label>
        <div className={styles.btnGroup}>
          {["6", "9", "12"].map(l => (
            <button key={l} className={`${styles.btnOption} ${nrLuni === l ? styles.activ : ""}`}
              onClick={() => setNrLuni(l)}>{l} luni</button>
          ))}
        </div>
      </div>

      <div className={styles.checkRow}>
        <input type="checkbox" id="optCAS" checked={optiuneCAS} onChange={e => setOptiuneCAS(e.target.checked)} />
        <label htmlFor="optCAS">Optez pentru CAS (contribuție la pensie — nu e obligatorie)</label>
      </div>

      {rez && (
        <div className={styles.rezultate}>
          <BreakdownBar segments={[
            { label: "Net", value: Math.max(0, rez.netAnual), color: "#059669" },
            { label: "Impozit 10%", value: rez.impozit, color: "#d97706" },
            ...(rez.cass > 0 ? [{ label: "CASS 10%", value: rez.cass, color: "#7c3aed" }] : []),
            ...(rez.cas > 0 ? [{ label: "CAS 25%", value: rez.cas, color: "#2563eb" }] : []),
          ]} />

          <p className={styles.rezSectionLabel}>CALCUL VENIT IMPOZABIL</p>
          <Row label={`Venit brut (${fmt(rez.chirie)} × ${rez.luni} luni)`} val={`${fmt(rez.venitBrut)} lei`} />
          <Row label="Deducere forfetară 40%" val={`−${fmt(rez.deducereForfetara)} lei`} neg />
          <Row label="Bază impozabilă" val={`${fmt(rez.bazaImpozabila)} lei`} bold />

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>OBLIGAȚII FISCALE — D212</p>
          <Row label="Impozit pe venit — 10%" val={`−${fmt(rez.impozit)} lei`} neg />
          {rez.cass > 0
            ? <Row label="CASS — 10% (obligatorie)" val={`−${fmt(rez.cass)} lei`} neg />
            : <Row label={`CASS — sub plafonul de ${fmt(SMIN * 6)} lei`} val="scutit" />
          }
          {rez.cas > 0 && <Row label="CAS — 25% (opțional)" val={`−${fmt(rez.cas)} lei`} neg />}
          <Row label="Total obligații fiscale" val={`${fmt(rez.totalObligatii)} lei`} bold />

          <div className={styles.separator} />
          <Row label="Venit net anual" val={`${fmt(rez.netAnual)} lei`} bold green />
          <Row label="Venit net lunar estimat" val={`${fmt(rez.netLunar)} lei`} />
          <Row label="Rata fiscalizare efectivă" val={`${rez.rataTotala.toFixed(1)}%`} />

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>DECLARAȚII NECESARE</p>
          <div className={styles.declaratiiList}>
            <span className={styles.decTag}>D212 — până pe 25 mai</span>
            {rez.cass > 0 && <span className={styles.decTag}>CASS inclusă în D212</span>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── TVA CHECKER ──────────────────────────── */
function CalculatorTVA() {
  const [luni, setLuni] = useState<string[]>(Array(12).fill(""));
  const [rez, setRez] = useState<null | {
    total: number; ramas: number; pct: number; depasit: boolean;
    lunaDepasire: number | null; luneBp: number;
  }>(null);
  const PLAFON = 395_000;

  useEffect(() => {
    const vals = luni.map(v => parseFloat(v) || 0);
    const total = vals.reduce((s, v) => s + v, 0);
    const ramas = Math.max(0, PLAFON - total);
    const pct = Math.min(100, (total / PLAFON) * 100);
    const depasit = total >= PLAFON;

    let lunaDepasire: number | null = null;
    let cumul = 0;
    for (let i = 0; i < vals.length; i++) {
      cumul += vals[i];
      if (cumul >= PLAFON && lunaDepasire === null) lunaDepasire = i;
    }

    // câte luni cu valori au fost introduse
    const luneBp = vals.filter(v => v > 0).length;
    setRez({ total, ramas, pct, depasit, lunaDepasire, luneBp });
  }, [luni]);

  const lunaNames = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function updateLuna(i: number, val: string) {
    setLuni(prev => { const n = [...prev]; n[i] = val; return n; });
  }

  const pct = rez?.pct ?? 0;
  const barColor = pct >= 100 ? "#dc2626" : pct >= 80 ? "#d97706" : "#059669";

  return (
    <div className={styles.calcCard}>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>📋</span>
        <span>Plafonul de înregistrare obligatorie în scopuri de TVA este <strong>395.000 lei</strong> (cifra de afaceri din ultimele 12 luni, majorat de la 300.000 lei din septembrie 2025). La depășire, ești obligat să te înregistrezi în 10 zile.</span>
      </div>

      {rez && (
        <div className={styles.tvaGauge}>
          <div className={styles.tvaGaugeBar}>
            <div
              className={styles.tvaGaugeFill}
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>
          <div className={styles.tvaGaugeLabels}>
            <span style={{ color: barColor, fontWeight: 700 }}>
              {rez.depasit ? "⚠ PLAFON DEPĂȘIT" : `${pct.toFixed(1)}% din plafon`}
            </span>
            <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>
              {rez.depasit
                ? `Cu ${fmt(rez.total - PLAFON)} lei peste plafon`
                : `Mai poți factura ${fmt(rez.ramas)} lei`}
            </span>
          </div>
        </div>
      )}

      <div className={styles.calcSection}>
        <label className={styles.label}>Cifra de afaceri lunară — ultimele 12 luni (lei)</label>
        <div className={styles.luniGrid}>
          {lunaNames.map((luna, i) => (
            <div key={i} className={styles.lunaItem}>
              <label className={styles.lunaLabel}>{luna}</label>
              <input
                className={styles.lunaInput}
                type="number"
                placeholder="0"
                value={luni[i]}
                onChange={e => updateLuna(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {rez && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>SITUAȚIE TVA</p>
          <Row label="CA totală (12 luni)" val={`${fmt(rez.total)} lei`} bold />
          <Row label="Plafon înregistrare TVA" val="395.000 lei" />
          <Row
            label={rez.depasit ? "Depășit cu" : "Rămas până la plafon"}
            val={rez.depasit ? `${fmt(rez.total - PLAFON)} lei` : `${fmt(rez.ramas)} lei`}
            neg={rez.depasit}
            green={!rez.depasit}
          />

          {rez.depasit && rez.lunaDepasire !== null && (
            <>
              <div className={styles.separator} />
              <div className={styles.alertBox}>
                <strong>⚠ Plafonul a fost depășit în luna {lunaNames[rez.lunaDepasire]}!</strong>
                <p>Trebuie să depui cerere de înregistrare TVA în termen de 10 zile de la sfârșitul lunii {lunaNames[rez.lunaDepasire]}. Neinregistrarea atrage amenzi.</p>
              </div>
            </>
          )}

          {!rez.depasit && rez.total > 0 && (
            <>
              <div className={styles.separator} />
              <p className={styles.rezSectionLabel}>ESTIMARE</p>
              {rez.luneBp > 0 && (
                <Row
                  label="Medie lunară CA"
                  val={`${fmt(rez.total / rez.luneBp)} lei`}
                />
              )}
              {rez.luneBp > 0 && (
                <Row
                  label="Luni estimate până la plafon"
                  val={`~${Math.ceil(rez.ramas / (rez.total / rez.luneBp))} luni`}
                />
              )}
              <p className={styles.hint} style={{ marginTop: 8 }}>
                Poți opta voluntar pentru înregistrare TVA oricând, chiar sub plafon.
              </p>
            </>
          )}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>DECLARAȚII LA ÎNREGISTRARE TVA</p>
          <div className={styles.declaratiiList}>
            <span className={styles.decTag}>D010 sau D070 — înregistrare</span>
            <span className={styles.decTag}>D300 — lunar sau trimestrial</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Row helper ───────────────────────────── */
function Row({ label, val, neg, pos, bold, green }: {
  label: string; val: string; neg?: boolean; pos?: boolean; bold?: boolean; green?: boolean;
}) {
  return (
    <div className={`${styles.row} ${bold ? styles.rowBold : ""}`}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={`${styles.rowVal} ${neg ? styles.red : ""} ${pos ? styles.green : ""} ${green ? styles.green : ""}`}>
        {val}
      </span>
    </div>
  );
}

/* ── Main ─────────────────────────────────── */
export default function CalculatorClient() {
  const [tab, setTab] = useState<Tab>("salariu");
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = tabsRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;
    const activeBtn = container.querySelector(`.${styles.tabActiv}`) as HTMLElement;
    if (!activeBtn) return;
    pill.style.left = `${activeBtn.offsetLeft}px`;
    pill.style.width = `${activeBtn.offsetWidth}px`;
  }, [tab]);

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "salariu", icon: "💼", label: "Salariu" },
    { id: "pfa", icon: "🧾", label: "PFA / II" },
    { id: "firma", icon: "🏢", label: "SRL / Firmă" },
    { id: "chirii", icon: "🏠", label: "Chirii" },
    { id: "tva", icon: "📋", label: "Prag TVA" },
    { id: "crypto", icon: "₿", label: "Crypto & Invest" },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Calculator Taxe</h1>
        <p className={styles.subtitle}>
          Calculează instant impozitele și contribuțiile — salariu, PFA, SRL, chirii sau verifică plafonul TVA.
        </p>

        <div className={styles.tabs} ref={tabsRef}>
          <span className={styles.tabPill} ref={pillRef} />
          {tabs.map(t => (
            <button key={t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActiv : ""}`}
              onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {tab === "salariu" && <CalculatorSalariu />}
          {tab === "pfa" && <CalculatorPFA />}
          {tab === "firma" && <CalculatorFirma />}
          {tab === "chirii" && <CalculatorChirii />}
          {tab === "tva" && <CalculatorTVA />}
          {tab === "crypto" && <CalculatorCrypto />}
        </div>

        <p className={styles.disclaimer}>
          Calcul orientativ conform Legii 227/2015 (Cod fiscal) și modificărilor 2026. Salariu minim: 4.050 lei (ian-iun) / 4.325 lei (iul-dec). TVA standard: 21%. Consultați un contabil autorizat CECCAR pentru situația dvs. exactă.
        </p>
      </main>
      <Footer />
    </>
  );
}
