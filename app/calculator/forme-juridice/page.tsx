"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

const SMIN = 4050; // ian-iun 2026 (conservativ)

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
  const norma = 50_000; // orientativ național
  const bazaCASS = Math.min(Math.max(norma, SMIN * 6), SMIN * 72);
  const cass = bazaCASS * 0.1;
  const cas = 0; // opțional, calculăm fără
  const impozit = Math.max(0, (norma - cas - cass) * 0.1);
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

function FormaCard({ forma, isMax }: { forma: FormaResult; isMax: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${isMax ? "rgba(5,150,105,0.6)" : "rgba(255,255,255,0.12)"}`,
      borderRadius: "16px",
      padding: "20px",
      position: "relative",
      transition: "all 0.2s",
      boxShadow: isMax ? "0 0 24px rgba(5,150,105,0.15)" : undefined,
    }}>
      {isMax && (
        <div style={{
          position: "absolute", top: -10, right: 12,
          background: "#059669", color: "#fff",
          fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px",
          borderRadius: "9999px",
        }}>CEL MAI AVANTAJOS</div>
      )}
      <h3 style={{ margin: "0 0 4px", fontSize: "1rem", fontWeight: 700, color: "#1e293b" }}>
        {forma.label}
      </h3>
      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#059669", margin: "8px 0 2px" }}>
        {fmt(forma.netLunar)} <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>lei/lună</span>
      </div>
      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
        {fmt(forma.netAnual)} lei/an · taxare {forma.pctTaxare.toFixed(1)}%
      </div>

      <button
        onClick={() => setOpen(p => !p)}
        style={{
          marginTop: 12, fontSize: "0.8rem", color: "#6366f1",
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}
      >
        {open ? "▲ Ascunde detalii" : "▼ Vezi calcul detaliat"}
      </button>

      {open && (
        <div style={{ marginTop: 10 }}>
          {forma.detalii.map((d, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "0.8rem", padding: "3px 0",
              borderBottom: i < forma.detalii.length - 1 ? "1px solid rgba(0,0,0,0.05)" : undefined,
              color: d.neg ? "#dc2626" : "#374151",
            }}>
              <span>{d.label}</span>
              <span style={{ fontWeight: 500 }}>{d.val}</span>
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

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8, color: "#1e293b" }}>
          Compară Forme Juridice 2026
        </h1>
        <p style={{ color: "#64748b", marginBottom: "2rem", maxWidth: 600 }}>
          Introdu venitul tău estimat și compară instant cât rămâi net ca angajat, PFA, SRL micro sau SRL profit.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: 500, marginBottom: "2.5rem" }}>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "block", marginBottom: 6, color: "#374151" }}>
              Venit brut anual (lei)
            </label>
            <input
              type="number"
              placeholder="ex: 120.000"
              value={venit}
              onChange={e => setVenit(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.8)",
                fontSize: "1rem", outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "block", marginBottom: 6, color: "#374151" }}>
              Cheltuieli deductibile/an <span style={{ fontWeight: 400, color: "#9ca3af" }}>(opțional)</span>
            </label>
            <input
              type="number"
              placeholder="ex: 20.000"
              value={cheltuieli}
              onChange={e => setCheltuieli(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.8)",
                fontSize: "1rem", outline: "none",
              }}
            />
          </div>
        </div>

        {forme.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}>
              {forme.map(f => (
                <FormaCard key={f.label} forma={f} isMax={f.netAnual === maxNet} />
              ))}
            </div>

            <div style={{
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.3)",
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: "0.8rem",
              color: "#78350f",
            }}>
              ⚠ Calcul orientativ conform legislației 2026. Nu substituie consultanță fiscală autorizată CCF/CECCAR. Valorile exacte pot varia în funcție de situația specifică.
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
