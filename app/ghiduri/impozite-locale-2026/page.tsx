"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

const tarifeEuro: Record<string, { base?: number; per200?: number; fixed?: number; label: string }> = {
  non_euro: { base: 30, per200: 15, label: "Non-Euro" },
  euro1: { base: 25, per200: 12, label: "Euro 1" },
  euro2: { base: 20, per200: 10, label: "Euro 2" },
  euro3: { base: 18, per200: 8, label: "Euro 3" },
  euro4: { base: 12, per200: 6, label: "Euro 4" },
  euro5: { base: 8, per200: 4, label: "Euro 5" },
  euro6: { base: 6, per200: 3, label: "Euro 6 / Hibrid" },
  electric: { fixed: 40, label: "Electric" },
};

function CalculatorCladire() {
  const [valoare, setValoare] = useState("");
  const [tip, setTip] = useState<"rezidential" | "alt_rezidential" | "nerezidential">("rezidential");
  const [an, setAn] = useState("2000");

  const val = parseFloat(valoare) || 0;
  const vechime = new Date().getFullYear() - (parseInt(an) || 2000);
  const reducereVechime = Math.min(0.4, vechime * 0.005); // 0.5% per an, max 40%

  let cota2026: number, cota2025: number;
  if (tip === "rezidential") {
    cota2026 = 0.12; cota2025 = 0.08;
  } else if (tip === "alt_rezidential") {
    cota2026 = 0.18; cota2025 = 0.1;
  } else {
    cota2026 = 0.5; cota2025 = 0.2;
  }

  const valImpozabila = val * (1 - reducereVechime);
  const impozit2026 = Math.round(valImpozabila * (cota2026 / 100));
  const impozit2025 = Math.round(valImpozabila * (cota2025 / 100));
  const crestere = impozit2025 > 0 ? ((impozit2026 - impozit2025) / impozit2025) * 100 : 0;

  const tipLabels = {
    rezidential: "Reședință principală",
    alt_rezidential: "Altă clădire rezidențială",
    nerezidential: "Clădire nerezidențială",
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px",
      marginBottom: "2rem",
    }}>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
        Calculator Impozit Clădiri 2026
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6, color: "#374151" }}>
            Valoare impozabilă (lei)
          </label>
          <input
            type="number" placeholder="ex: 200.000"
            value={valoare} onChange={e => setValoare(e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "0.9rem" }}
          />
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 4 }}>Din actul de proprietate sau evaluare primărie</p>
        </div>
        <div>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6, color: "#374151" }}>
            An construcție
          </label>
          <input
            type="number" placeholder="ex: 2000" min="1900" max="2026"
            value={an} onChange={e => setAn(e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "0.9rem" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 8, color: "#374151" }}>
          Tip clădire
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["rezidential", "alt_rezidential", "nerezidential"] as const).map(t => (
            <button key={t}
              onClick={() => setTip(t)}
              style={{
                padding: "7px 14px", borderRadius: 8, fontSize: "0.82rem",
                background: tip === t ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${tip === t ? "rgba(99,102,241,0.5)" : "rgba(0,0,0,0.1)"}`,
                color: tip === t ? "#4338ca" : "#374151",
                fontWeight: tip === t ? 600 : 400, cursor: "pointer",
              }}
            >
              {tipLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {val > 0 && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", padding: "4px 0", color: "#374151" }}>
            <span>Valoare impozabilă (ajustată vechime {reducereVechime > 0 ? `−${(reducereVechime * 100).toFixed(0)}%` : ""})</span>
            <strong>{fmt(valImpozabila)} lei</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", padding: "4px 0", color: "#374151" }}>
            <span>Cotă orientativă 2026</span>
            <span>{cota2026}‰</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", padding: "8px 0", color: "#059669", fontWeight: 700, borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: 4 }}>
            <span>Impozit estimat 2026</span>
            <span>{fmt(impozit2026)} lei/an</span>
          </div>
          {crestere > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "4px 0", color: "#dc2626" }}>
              <span>Față de 2025 (estimat)</span>
              <span>+{crestere.toFixed(0)}% (+{fmt(impozit2026 - impozit2025)} lei)</span>
            </div>
          )}
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 8, fontStyle: "italic" }}>
            ⚠ Valori orientative. Cotele exacte variază pe localitate. Verificați la primăria dvs.
          </p>
        </div>
      )}
    </div>
  );
}

function CalculatorAuto() {
  const [norma, setNorma] = useState<string>("euro5");
  const [cilindree, setCilindree] = useState("");

  const cil = parseInt(cilindree) || 0;
  const tarif = tarifeEuro[norma];

  let impozit = 0;
  if (tarif.fixed !== undefined) {
    impozit = tarif.fixed;
  } else if (tarif.base !== undefined && tarif.per200 !== undefined && cil > 0) {
    const transe = Math.ceil(cil / 200);
    impozit = tarif.base + (transe - 1) * tarif.per200;
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px",
      marginBottom: "2rem",
    }}>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
        Calculator Impozit Autoturisme 2026
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 8, color: "#374151" }}>
          Normă de emisii
        </label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Object.entries(tarifeEuro).map(([k, v]) => (
            <button key={k}
              onClick={() => setNorma(k)}
              style={{
                padding: "6px 12px", borderRadius: 8, fontSize: "0.8rem",
                background: norma === k ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${norma === k ? "rgba(99,102,241,0.5)" : "rgba(0,0,0,0.1)"}`,
                color: norma === k ? "#4338ca" : "#374151",
                fontWeight: norma === k ? 600 : 400, cursor: "pointer",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {norma !== "electric" && (
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6, color: "#374151" }}>
            Cilindree (cm³)
          </label>
          <input
            type="number" placeholder="ex: 1598" min="500" max="8000"
            value={cilindree} onChange={e => setCilindree(e.target.value)}
            style={{ width: "100%", maxWidth: 200, padding: "9px 12px", borderRadius: 9, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "0.9rem" }}
          />
        </div>
      )}

      {(norma === "electric" || cil > 0) && impozit > 0 && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", padding: "6px 0", color: "#059669", fontWeight: 700 }}>
            <span>Impozit auto estimat 2026</span>
            <span>{fmt(impozit)} lei/an</span>
          </div>
          {norma === "electric" && (
            <p style={{ fontSize: "0.8rem", color: "#059669", marginTop: 4 }}>
              Mașinile electrice plătesc o taxă fixă de 40 lei/an (față de 0 lei în 2025).
            </p>
          )}
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 8, fontStyle: "italic" }}>
            ⚠ Valori orientative conform Legii 239/2025. Verificați la primărie cuantumul exact.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ImpoziteLocale2026() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8, color: "#1e293b" }}>
          Impozite Locale 2026 — Clădiri și Mașini
        </h1>
        <p style={{ color: "#64748b", marginBottom: "0.5rem", maxWidth: 620 }}>
          Impozitele pe proprietăți și autoturisme au crescut semnificativ în 2026 față de 2025. Calculează estimativ cât plătești.
        </p>
        <div style={{
          background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)",
          borderRadius: 10, padding: "10px 16px", marginBottom: "2rem",
          fontSize: "0.875rem", color: "#7f1d1d",
        }}>
          ⚠ Creșteri de până la <strong>150%</strong> față de 2025 în unele localități. Verificați la primăria voastră cuantumul exact.
        </div>

        <CalculatorCladire />
        <CalculatorAuto />

        <div style={{
          background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "20px",
        }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 12, color: "#1e293b" }}>
            Ce s-a schimbat în 2026?
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.875rem", color: "#374151", lineHeight: 1.8 }}>
            <li>Impozitul pe clădiri rezidențiale a crescut în medie cu <strong>50–150%</strong> față de 2025</li>
            <li>Impozitul pe mașini este acum <strong>diferențiat după norma Euro și cilindree</strong></li>
            <li>Mașinile electrice plătesc <strong>40 lei/an fix</strong> (față de 0 lei în 2025)</li>
            <li>Vehiculele non-Euro și Euro 1-2 plătesc cele mai mari taxe</li>
            <li>Din 2027, valoarea de impozitare va fi <strong>valoarea de piață</strong> (sistem e-Proprietatea), nu valoarea contabilă</li>
          </ul>
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "#9ca3af" }}>
          Calcul orientativ. Nu substituie consultanță fiscală autorizată CCF/CECCAR. Valorile exacte se obțin de la primăria localității.
        </p>
      </main>
      <Footer />
    </>
  );
}
