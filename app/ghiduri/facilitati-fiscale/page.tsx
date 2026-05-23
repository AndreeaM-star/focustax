"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

const SMIN = 4050;

function CalculatorIT() {
  const [brut, setBrut] = useState(7000);
  const b = brut;

  const casNorm = b * 0.25;
  const cassNorm = b * 0.1;
  const dedNorm = b <= SMIN ? 300 : b <= SMIN * 2 ? Math.max(0, 300 - (300 / SMIN) * (b - SMIN)) : 0;
  const impNorm = Math.max(0, (b - casNorm - cassNorm - dedNorm) * 0.1);
  const netNorm = b - casNorm - cassNorm - impNorm;

  const casIT = b * 0.25;
  const cassIT = b * 0.1;
  const netIT = b - casIT - cassIT;

  const diferentaLunara = netIT - netNorm;
  const diferentaAnuala = diferentaLunara * 12;

  return (
    <div className={styles.calcPanel}>
      <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 14, color: "#1a1a2e" }}>
        Calculator comparativ IT
      </h3>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6, color: "#374151" }}>
          Salariu brut lunar (lei)
        </label>
        <input
          type="range" min={4050} max={20000} step={50} value={brut}
          onChange={e => setBrut(Number(e.target.value))}
          style={{ width: "100%", maxWidth: 300, marginBottom: 6 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>4.050 lei</span>
          <input
            type="number" min={4050} step={50}
            value={brut} onChange={e => setBrut(Math.max(4050, Number(e.target.value)))}
            style={{
              padding: "6px 10px", borderRadius: 8,
              border: "1px solid rgba(99,102,241,0.3)",
              background: "rgba(255,255,255,0.8)",
              outline: "none", fontSize: "0.88rem", width: 120, textAlign: "right",
            }}
          />
          <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>lei/lună</span>
        </div>
      </div>
      {b > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>FĂRĂ facilitate</div>
            <div style={{ fontSize: "0.82rem", color: "#374151" }}>CAS: −{fmt(casNorm)} lei</div>
            <div style={{ fontSize: "0.82rem", color: "#374151" }}>CASS: −{fmt(cassNorm)} lei</div>
            <div style={{ fontSize: "0.82rem", color: "#dc2626" }}>Impozit: −{fmt(impNorm)} lei</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#059669", marginTop: 6 }}>Net: {fmt(netNorm)} lei</div>
          </div>
          <div style={{ background: "rgba(5,150,105,0.08)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(5,150,105,0.2)" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#059669", marginBottom: 6 }}>CU facilitate IT</div>
            <div style={{ fontSize: "0.82rem", color: "#374151" }}>CAS: −{fmt(casIT)} lei</div>
            <div style={{ fontSize: "0.82rem", color: "#374151" }}>CASS: −{fmt(cassIT)} lei</div>
            <div style={{ fontSize: "0.82rem", color: "#059669" }}>Impozit: scutit ✓</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#059669", marginTop: 6 }}>Net: {fmt(netIT)} lei</div>
          </div>
        </div>
      )}
      {diferentaLunara > 0 && (
        <div style={{ marginTop: 12, fontSize: "0.875rem", color: "#059669", fontWeight: 600 }}>
          Diferență: +{fmt(diferentaLunara)} lei/lună · +{fmt(diferentaAnuala)} lei/an
        </div>
      )}
    </div>
  );
}

export default function FacilitatiFiscale() {
  const [tab, setTab] = useState<"it" | "constructii" | "agricultura">("it");

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>
          Facilități Fiscale <span className={styles.titleAccent}>Sectoriale</span> 2026
        </h1>
        <p className={styles.subtitle}>
          Angajații din IT, construcții și agricultură beneficiază de scutiri de impozit pe venit și contribuții reduse.
        </p>

        <div className={styles.tabs}>
          {([
            { id: "it", label: "💻 IT — Scutire impozit venit" },
            { id: "constructii", label: "🏗️ Construcții" },
            { id: "agricultura", label: "🌾 Agricultură" },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "it" && (
          <div>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Facilitatea IT — Scutire impozit pe venit 10%</h2>
              <p style={{ fontSize: "0.875rem", color: "#374151", marginBottom: 12 }}>
                Angajații din IT care îndeplinesc <strong>cumulativ toate condițiile</strong> nu plătesc impozit pe venit (10%), păstrând CAS și CASS nemodificate.
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.875rem", color: "#374151", lineHeight: 1.9 }}>
                <li>Angajat pe <strong>contract de muncă (CIM)</strong> cu funcție IT eligibilă</li>
                <li>Angajatorul are ca obiect principal <strong>activitatea de creare programe</strong> (CAEN 6201, 6202, 6209, 6311 etc.)</li>
                <li>Angajatorul realizează <strong>venituri din activitate software</strong></li>
                <li>Ai <strong>studii superioare finalizate</strong> (diplomă de licență sau echivalent)</li>
                <li>Salariul brut ≥ <strong>salariul minim brut pe economie</strong></li>
              </ul>
            </div>
            <CalculatorIT />
          </div>
        )}

        {tab === "constructii" && (
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Facilitatea Construcții</h2>
            <p style={{ fontSize: "0.875rem", color: "#374151", marginBottom: 12 }}>
              Angajații din sectorul construcții beneficiază de scutire impozit și CAS redus.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 8, color: "#6b7280" }}>NORMAL</div>
                <div style={{ fontSize: "0.82rem", color: "#374151" }}>CAS: 25%</div>
                <div style={{ fontSize: "0.82rem", color: "#374151" }}>CASS: 10%</div>
                <div style={{ fontSize: "0.82rem", color: "#dc2626" }}>Impozit venit: 10%</div>
              </div>
              <div style={{ background: "rgba(5,150,105,0.08)", borderRadius: 10, padding: 14, border: "1px solid rgba(5,150,105,0.2)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 8, color: "#059669" }}>CONSTRUCȚII</div>
                <div style={{ fontSize: "0.82rem", color: "#374151" }}>CAS: <strong>21.25%</strong> (redus)</div>
                <div style={{ fontSize: "0.82rem", color: "#374151" }}>CASS: 10%</div>
                <div style={{ fontSize: "0.82rem", color: "#059669" }}>Impozit venit: <strong>scutit</strong></div>
              </div>
            </div>
            <div style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.25)", borderRadius: 10, padding: "10px 14px", fontSize: "0.82rem", color: "#78350f" }}>
              <strong>Condiție:</strong> Angajatorul trebuie să realizeze cel puțin <strong>80% din venituri</strong> din activitate de construcții (CAEN 41, 42, 43).
            </div>
          </div>
        )}

        {tab === "agricultura" && (
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Facilitatea Agricultură</h2>
            <p style={{ fontSize: "0.875rem", color: "#374151", marginBottom: 14 }}>
              Angajații din sectorul agricol și industria alimentară beneficiază de scutire la impozitul pe venit.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.875rem", color: "#374151", lineHeight: 1.9 }}>
              <li>Scutire impozit pe venit <strong>10%</strong></li>
              <li>CAS și CASS rămân nemodificate</li>
              <li>Condiție: angajatorul realizează ≥<strong>80% venituri</strong> din activitate agricolă sau industrie alimentară</li>
              <li>CAEN eligibil: 01xx (agricultură), 02xx (silvicultură), 10xx (industrie alimentară)</li>
            </ul>
          </div>
        )}

        <p className={styles.disclaimer}>
          Calcul orientativ. Nu substituie consultanță fiscală autorizată CCF/CECCAR. Condițiile se verifică individual cu angajatorul și cu un expert fiscal.
        </p>
      </main>
      <Footer />
    </>
  );
}
