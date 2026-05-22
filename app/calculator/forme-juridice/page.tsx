"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

const SMIN = 4050;

interface FormaResult {
  label: string;
  netAnual: number;
  netLunar: number;
  pctTaxare: number;
  detalii: { label: string; val: string; neg?: boolean }[];
}

function calcAngajat(brutAnual: number): FormaResult {
  const brut = brutAnual / 12;
  const cas = brut * 0.25;
  const cass = brut * 0.1;
  const deducere = brut <= SMIN ? 300 :
    brut <= SMIN * 2 ? Math.max(0, 300 - (300 / SMIN) * (brut - SMIN)) : 0;
  const impozit = Math.max(0, (brut - cas - cass - deducere) * 0.1);
  const netLunar = brut - cas - cass - impozit;
  const netAnual = netLunar * 12;
  const totalTaxe = (cas + cass + impozit) * 12;
  return {
    label: "Angajat CIM",
    netAnual,
    netLunar,
    pctTaxare: (totalTaxe / brutAnual) * 100,
    detalii: [
      { label: "Brut lunar", val: `${fmt(brut)} lei` },
      { label: "CAS 25%", val: `−${fmt(cas)} lei`, neg: true },
      { label: "CASS 10%", val: `−${fmt(cass)} lei`, neg: true },
      { label: "Impozit 10%", val: `−${fmt(impozit)} lei`, neg: true },
      { label: "Net lunar", val: `${fmt(netLunar)} lei` },
    ],
  };
}

function calcPFAReal(brutAnual: number, cheltuieli: number): FormaResult {
  const venNet = Math.max(0, brutAnual - cheltuieli);
  const bazaCASS = Math.min(Math.max(venNet, SMIN * 6), SMIN * 72);
  const cass = bazaCASS * 0.1;
  const cas = venNet > SMIN * 12 ? venNet * 0.25 : 0;
  const impozit = Math.max(0, (venNet - cas - cass) * 0.1);
  const total = cas + cass + impozit;
  const netAnual = venNet - total;
  return {
    label: "PFA sistem real",
    netAnual,
    netLunar: netAnual / 12,
    pctTaxare: venNet > 0 ? (total / venNet) * 100 : 0,
    detalii: [
      { label: "Venit brut", val: `${fmt(brutAnual)} lei` },
      { label: "Cheltuieli deductibile", val: `−${fmt(cheltuieli)} lei`, neg: true },
      { label: "Venit net", val: `${fmt(venNet)} lei` },
      ...(cas > 0 ? [{ label: "CAS 25%", val: `−${fmt(cas)} lei`, neg: true as const }] : []),
      { label: "CASS 10%", val: `−${fmt(cass)} lei`, neg: true },
      { label: "Impozit 10%", val: `−${fmt(impozit)} lei`, neg: true },
      { label: "Net anual", val: `${fmt(netAnual)} lei` },
    ],
  };
}

function calcPFANorma(): FormaResult {
  const norma = 50_000;
  const bazaCASS = Math.min(Math.max(norma, SMIN * 6), SMIN * 72);
  const cass = bazaCASS * 0.1;
  const impozit = Math.max(0, (norma - cass) * 0.1);
  const total = cass + impozit;
  const netAnual = norma - total;
  return {
    label: "PFA normă de venit",
    netAnual,
    netLunar: netAnual / 12,
    pctTaxare: (total / norma) * 100,
    detalii: [
      { label: "Normă orientativă", val: `${fmt(norma)} lei/an` },
      { label: "CASS 10%", val: `−${fmt(cass)} lei`, neg: true },
      { label: "Impozit 10%", val: `−${fmt(impozit)} lei`, neg: true },
      { label: "Net anual (pe normă)", val: `${fmt(netAnual)} lei` },
      { label: "Notă", val: "Norma variază pe județ/CAEN" },
    ],
  };
}

function calcSRLMicro(ca: number): FormaResult {
  const impFirma = ca * 0.01;
  const profitNet = ca - impFirma;
  const impDiv = profitNet * 0.16;
  const netProprietar = profitNet - impDiv;
  const totalTaxe = impFirma + impDiv;
  return {
    label: "SRL Micro 1%",
    netAnual: netProprietar,
    netLunar: netProprietar / 12,
    pctTaxare: (totalTaxe / ca) * 100,
    detalii: [
      { label: "Cifra de afaceri", val: `${fmt(ca)} lei` },
      { label: "Impozit micro 1%", val: `−${fmt(impFirma)} lei`, neg: true },
      { label: "Profit net firmă", val: `${fmt(profitNet)} lei` },
      { label: "Impozit dividende 16%", val: `−${fmt(impDiv)} lei`, neg: true },
      { label: "Net proprietar/an", val: `${fmt(netProprietar)} lei` },
    ],
  };
}

function calcSRLProfit(ca: number, cheltuieli: number): FormaResult {
  const ch = cheltuieli || ca * 0.3;
  const profitBrut = Math.max(0, ca - ch);
  let impozitProfit = profitBrut * 0.16;
  const impMinim = ca <= 1_000_000 ? ca * 0.005 :
    ca <= 5_000_000 ? ca * 0.004 : ca * 0.003;
  impozitProfit = Math.max(impozitProfit, impMinim);
  const profitNet = Math.max(0, profitBrut - impozitProfit);
  const impDiv = profitNet * 0.16;
  const netProprietar = profitNet - impDiv;
  const totalTaxe = impozitProfit + impDiv;
  return {
    label: "SRL Profit 16%",
    netAnual: netProprietar,
    netLunar: netProprietar / 12,
    pctTaxare: ca > 0 ? (totalTaxe / ca) * 100 : 0,
    detalii: [
      { label: "Cifra de afaceri", val: `${fmt(ca)} lei` },
      { label: "Cheltuieli", val: `−${fmt(ch)} lei`, neg: true },
      { label: "Profit brut", val: `${fmt(profitBrut)} lei` },
      { label: "Impozit profit 16%", val: `−${fmt(impozitProfit)} lei`, neg: true },
      { label: "Profit net firmă", val: `${fmt(profitNet)} lei` },
      { label: "Impozit dividende 16%", val: `−${fmt(impDiv)} lei`, neg: true },
      { label: "Net proprietar/an", val: `${fmt(netProprietar)} lei` },
    ],
  };
}

const RATE_COLORS = [
  "#2563eb", "#7c3aed", "#6366f1", "#059669", "#d97706",
];

function FormaCard({ forma, isMax }: { forma: FormaResult; isMax: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.formaCard} ${isMax ? styles.formaCardBest : ""}`}>
      {isMax && (
        <span className={styles.bestBadge}>CEL MAI AVANTAJOS</span>
      )}
      <h3 className={styles.formaLabel}>{forma.label}</h3>
      <div className={styles.netValue}>
        {fmt(forma.netLunar)}
        <span className={styles.netUnit}>lei/lună</span>
      </div>
      <div className={styles.netMeta}>
        {fmt(forma.netAnual)} lei/an · taxare {forma.pctTaxare.toFixed(1)}%
      </div>

      <button className={styles.toggleBtn} onClick={() => setOpen(p => !p)}>
        {open ? "▲ Ascunde detalii" : "▼ Vezi calcul detaliat"}
      </button>

      {open && (
        <div className={styles.detailsTable}>
          {forma.detalii.map((d, i) => (
            <div key={i} className={`${styles.detailRow} ${d.neg ? styles.detailRowNeg : ""}`}>
              <span className={styles.detailLabel}>{d.label}</span>
              <span className={styles.detailVal}>{d.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FormeJuridice() {
  const [venit, setVenit] = useState("");
  const [cheltuieli, setCheltuieli] = useState("");
  const [forme, setForme] = useState<FormaResult[]>([]);

  useEffect(() => {
    const v = parseFloat(venit) || 0;
    const ch = parseFloat(cheltuieli) || 0;
    if (v <= 0) { setForme([]); return; }
    setForme([
      calcAngajat(v),
      calcPFAReal(v, ch),
      calcPFANorma(),
      calcSRLMicro(v),
      calcSRLProfit(v, ch),
    ]);
  }, [venit, cheltuieli]);

  const maxNet = forme.length ? Math.max(...forme.map(f => f.netAnual)) : 0;
  const maxPct = forme.length ? Math.max(...forme.map(f => f.pctTaxare)) : 1;

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Compară <span className={styles.titleAccent}>Forme Juridice</span> 2026
          </h1>
          <p className={styles.subtitle}>
            Introdu venitul estimat și compară instant cât rămâi net ca angajat, PFA, SRL micro sau SRL profit.
          </p>
        </div>

        <div className={styles.inputsGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Venit brut anual (lei)</label>
            <input
              type="number"
              placeholder="ex: 120000"
              value={venit}
              onChange={e => setVenit(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Cheltuieli deductibile/an
              <span className={styles.optional}>(opțional)</span>
            </label>
            <input
              type="number"
              placeholder="ex: 20000"
              value={cheltuieli}
              onChange={e => setCheltuieli(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {forme.length > 0 && (
          <>
            <div className={styles.formsGrid}>
              {forme.map(f => (
                <FormaCard key={f.label} forma={f} isMax={f.netAnual === maxNet} />
              ))}
            </div>

            <div className={styles.rateChart}>
              <div className={styles.rateTitle}>Rata de taxare comparată</div>
              {forme.map((f, i) => (
                <div key={f.label} className={styles.rateRow}>
                  <span className={styles.rateLabel}>{f.label}</span>
                  <div className={styles.rateBar}>
                    <div
                      className={styles.rateBarFill}
                      style={{
                        width: `${(f.pctTaxare / maxPct) * 100}%`,
                        background: RATE_COLORS[i % RATE_COLORS.length],
                      }}
                    />
                  </div>
                  <span className={styles.ratePct}>{f.pctTaxare.toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <p className={styles.disclaimer}>
              ⚠ Calcul orientativ conform legislației 2026. Nu substituie consultanță fiscală autorizată CCF/CECCAR.
              Valorile exacte pot varia în funcție de situația specifică.
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
