"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

type Tab = "salariu" | "pfa" | "firma";

/* ── helpers ──────────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const SMIN = 4050; // salariu minim brut 2025

/* ── SALARIU ──────────────────────────────── */
function CalculatorSalariu() {
  const [brut, setBrut] = useState("");
  const [handicap, setHandicap] = useState(false);
  const [ticheteMasa, setTicheteMasa] = useState("");
  const [rez, setRez] = useState<null | Record<string, number>>(null);

  function calculeaza() {
    const b = parseFloat(brut) || 0;
    const tm = parseFloat(ticheteMasa) || 0;
    if (b <= 0) return;

    const cas = b * 0.25;
    const cass = b * 0.1;
    const bazaImpozit = b - cas - cass - 300 - (handicap ? b * 0.03 : 0);
    const impozit = Math.max(0, bazaImpozit * 0.1);
    const net = b - cas - cass - impozit;
    const cam = b * 0.0225;
    const costAngajator = b + cam;

    setRez({ brut: b, cas, cass, impozit, net, netCuTichete: net + tm, cam, costAngajator, ticheteMasa: tm });
  }

  return (
    <div className={styles.calcCard}>
      <div className={styles.calcSection}>
        <label className={styles.label}>Salariu brut lunar (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 5000" value={brut}
          onChange={e => { setBrut(e.target.value); setRez(null); }} />
      </div>
      <div className={styles.calcSection}>
        <label className={styles.label}>Tichete de masă / lună (lei) <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 400" value={ticheteMasa}
          onChange={e => { setTicheteMasa(e.target.value); setRez(null); }} />
      </div>
      <div className={styles.checkRow}>
        <input type="checkbox" id="handicap" checked={handicap}
          onChange={e => { setHandicap(e.target.checked); setRez(null); }} />
        <label htmlFor="handicap">Persoană cu handicap (deducere suplimentară 3%)</label>
      </div>
      <button className={styles.btnCalc} onClick={calculeaza} disabled={!brut}>
        Calculează
      </button>

      {rez && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>ANGAJAT — Rețineri din salariu</p>
          <Row label="Salariu brut" val={fmt(rez.brut)} />
          <Row label="CAS (pensii) — 25%" val={`−${fmt(rez.cas)}`} neg />
          <Row label="CASS (sănătate) — 10%" val={`−${fmt(rez.cass)}`} neg />
          <Row label="Impozit pe venit — 10%" val={`−${fmt(rez.impozit)}`} neg />
          <Row label="Salariu net" val={`${fmt(rez.net)} lei`} bold />
          {rez.ticheteMasa > 0 && <Row label="+ Tichete masă" val={`+${fmt(rez.ticheteMasa)}`} pos />}
          {rez.ticheteMasa > 0 && <Row label="Total primit" val={`${fmt(rez.netCuTichete)} lei`} bold />}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>ANGAJATOR — Cost total</p>
          <Row label="Salariu brut" val={fmt(rez.brut)} />
          <Row label="CAM (contrib. asiguratorie) — 2,25%" val={`+${fmt(rez.cam)}`} neg />
          <Row label="Cost total angajator / lună" val={`${fmt(rez.costAngajator)} lei`} bold />

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>ANUAL estimat</p>
          <Row label="Salariu net anual" val={`${fmt(rez.net * 12)} lei`} bold />
          <Row label="Cost angajator anual" val={`${fmt(rez.costAngajator * 12)} lei`} />
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

  function calculeaza() {
    const v = parseFloat(venit) || 0;
    if (v <= 0) return;

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
  }

  return (
    <div className={styles.calcCard}>
      <div className={styles.calcSection}>
        <label className={styles.label}>Venit brut anual (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 80000" value={venit}
          onChange={e => { setVenit(e.target.value); setRez(null); }} />
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Sistem de impozitare</label>
        <div className={styles.btnGroup}>
          <button className={`${styles.btnOption} ${sistem === "real" ? styles.activ : ""}`}
            onClick={() => { setSistem("real"); setRez(null); }}>Sistem real</button>
          <button className={`${styles.btnOption} ${sistem === "norma" ? styles.activ : ""}`}
            onClick={() => { setSistem("norma"); setRez(null); }}>Normă de venit</button>
        </div>
      </div>

      {sistem === "real" && (
        <div className={styles.calcSection}>
          <label className={styles.label}>Cheltuieli deductibile anuale (lei)</label>
          <input className={styles.input} type="number" placeholder="ex: 20000" value={cheltuieli}
            onChange={e => { setCheltuieli(e.target.value); setRez(null); }} />
        </div>
      )}

      <div className={styles.calcSection}>
        <label className={styles.label}>Baza calcul CAS (pensii)</label>
        <div className={styles.btnGroup}>
          <button className={`${styles.btnOption} ${bazaCAS === "minim" ? styles.activ : ""}`}
            onClick={() => { setBazaCAS("minim"); setRez(null); }}>Salariul minim × 12</button>
          <button className={`${styles.btnOption} ${bazaCAS === "real" ? styles.activ : ""}`}
            onClick={() => { setBazaCAS("real"); setRez(null); }}>Venitul net realizat</button>
        </div>
      </div>

      <div className={styles.checkRow}>
        <input type="checkbox" id="plasCAS" checked={platesteCAS}
          onChange={e => { setPlatesteCAS(e.target.checked); setRez(null); }} />
        <label htmlFor="plasCAS">Plătesc CAS (contribuție la pensie)</label>
      </div>

      <button className={styles.btnCalc} onClick={calculeaza} disabled={!venit}>
        Calculează
      </button>

      {rez && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>VENITURI</p>
          <Row label="Venit brut anual" val={`${fmt(rez.venBrut)} lei`} />
          {rez.venBrut !== rez.venNet && <Row label="Venit net (după cheltuieli)" val={`${fmt(rez.venNet)} lei`} />}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>CONTRIBUȚII & IMPOZIT (D212)</p>
          {rez.cas > 0 && <Row label="CAS — 25%" val={`−${fmt(rez.cas)}`} neg />}
          <Row label="CASS — 10%" val={`−${fmt(rez.cass)}`} neg />
          <Row label="Impozit pe venit — 10%" val={`−${fmt(rez.impozit)}`} neg />
          <Row label="Total obligații fiscale" val={`${fmt(rez.total)} lei`} bold />

          <div className={styles.separator} />
          <Row label="Venit net final anual" val={`${fmt(rez.net)} lei`} bold green />
          <Row label="Venit net lunar estimat" val={`${fmt(rez.net / 12)} lei`} />
          <Row label="Rata fiscalizare" val={`${((rez.total / rez.venNet) * 100).toFixed(1)}%`} />
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

  function calculeaza() {
    const caVal = parseFloat(ca) || 0;
    const profitVal = parseFloat(profit) || 0;
    const salVal = parseInt(salariati) || 0;
    const sponsVal = parseFloat(sponsorizare) || 0;
    const divVal = parseFloat(dividende) || 0;
    if (caVal <= 0) return;

    let impozitFirma = 0;

    if (tip === "micro") {
      const cota = salVal >= 1 ? 0.01 : 0.03;
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

    const profitNet = (tip === "micro" ? caVal - impozitFirma : profitVal - impozitFirma);
    const impDividende = divVal * 0.08;
    const netDupaDividende = divVal - impDividende;

    setRez({ caVal, impozitFirma, profitNet, divVal, impDividende, netDupaDividende });
  }

  return (
    <div className={styles.calcCard}>
      <div className={styles.calcSection}>
        <label className={styles.label}>Tipul firmei</label>
        <div className={styles.btnGroup}>
          <button className={`${styles.btnOption} ${tip === "micro" ? styles.activ : ""}`}
            onClick={() => { setTip("micro"); setRez(null); }}>Microîntreprindere</button>
          <button className={`${styles.btnOption} ${tip === "profit" ? styles.activ : ""}`}
            onClick={() => { setTip("profit"); setRez(null); }}>Impozit pe profit</button>
        </div>
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Cifra de afaceri anuală (lei)</label>
        <input className={styles.input} type="number" placeholder="ex: 500000" value={ca}
          onChange={e => { setCa(e.target.value); setRez(null); }} />
      </div>

      {tip === "profit" && (
        <div className={styles.calcSection}>
          <label className={styles.label}>Profit brut (înainte de impozit)</label>
          <input className={styles.input} type="number" placeholder="ex: 100000" value={profit}
            onChange={e => { setProfit(e.target.value); setRez(null); }} />
        </div>
      )}

      {tip === "micro" && (
        <div className={styles.calcSection}>
          <label className={styles.label}>Număr salariați</label>
          <div className={styles.btnGroup}>
            {["0", "1", "2+"].map(s => (
              <button key={s} className={`${styles.btnOption} ${salariati === s ? styles.activ : ""}`}
                onClick={() => { setSalariati(s); setRez(null); }}>{s}</button>
            ))}
          </div>
          <p className={styles.hint}>0 salariați sau venituri consultanță &gt;20% → cotă 3% | ≥1 salariat → cotă 1%</p>
        </div>
      )}

      <div className={styles.calcSection}>
        <label className={styles.label}>Cheltuieli cu sponsorizarea (lei) <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 5000" value={sponsorizare}
          onChange={e => { setSponsor(e.target.value); setRez(null); }} />
      </div>

      <div className={styles.calcSection}>
        <label className={styles.label}>Dividende distribuite (lei) <span className={styles.optional}>opțional</span></label>
        <input className={styles.input} type="number" placeholder="ex: 50000" value={dividende}
          onChange={e => { setDividende(e.target.value); setRez(null); }} />
        <p className={styles.hint}>Impozit dividende: 8% reținut la sursă (D205)</p>
      </div>

      <button className={styles.btnCalc} onClick={calculeaza} disabled={!ca}>
        Calculează
      </button>

      {rez && (
        <div className={styles.rezultate}>
          <p className={styles.rezSectionLabel}>IMPOZIT FIRMĂ ({tip === "micro" ? "D100 trimestrial" : "D101 anual"})</p>
          <Row label="Cifra de afaceri" val={`${fmt(rez.caVal)} lei`} />
          <Row label={`Impozit ${tip === "micro" ? "microîntreprindere" : "pe profit"}`} val={`−${fmt(rez.impozitFirma)}`} neg />
          <Row label="Profit net după impozit" val={`${fmt(rez.profitNet)} lei`} bold />

          {rez.divVal > 0 && (
            <>
              <div className={styles.separator} />
              <p className={styles.rezSectionLabel}>DIVIDENDE (D205)</p>
              <Row label="Dividende distribuite" val={`${fmt(rez.divVal)} lei`} />
              <Row label="Impozit dividende — 8%" val={`−${fmt(rez.impDividende)}`} neg />
              <Row label="Dividende nete" val={`${fmt(rez.netDupaDividende)} lei`} bold green />
            </>
          )}

          <div className={styles.separator} />
          <p className={styles.rezSectionLabel}>DECLARAȚII NECESARE</p>
          <div className={styles.declaratiiList}>
            {tip === "micro"
              ? <>
                  <span className={styles.decTag}>D100 — trimestrial</span>
                  {rez.divVal > 0 && <span className={styles.decTag}>D205 — la distribuire</span>}
                </>
              : <>
                  <span className={styles.decTag}>D101 — anual</span>
                  <span className={styles.decTag}>D100 — trimestrial (plăți anticipate)</span>
                  {rez.divVal > 0 && <span className={styles.decTag}>D205 — la distribuire</span>}
                </>
            }
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

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Calculator Taxe</h1>
        <p className={styles.subtitle}>
          Calculează impozitele și contribuțiile pentru salariu, PFA sau firmă — conform legislației fiscale 2025.
        </p>

        <div className={styles.tabs}>
          {(["salariu", "pfa", "firma"] as Tab[]).map(t => (
            <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActiv : ""}`}
              onClick={() => setTab(t)}>
              {t === "salariu" && "💼 Salariu"}
              {t === "pfa" && "🧾 PFA / II"}
              {t === "firma" && "🏢 Firmă SRL"}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {tab === "salariu" && <CalculatorSalariu />}
          {tab === "pfa" && <CalculatorPFA />}
          {tab === "firma" && <CalculatorFirma />}
        </div>

        <p className={styles.disclaimer}>
          * Calcul orientativ conform legii 227/2015 (Cod fiscal), actualizat pentru 2025. Salariul minim brut: 4.050 lei.
          Consultați un contabil autorizat pentru situația dvs. exactă.
        </p>
      </main>
      <Footer />
    </>
  );
}
