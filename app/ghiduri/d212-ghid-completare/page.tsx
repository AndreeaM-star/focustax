"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

type TipVenit = "pfa_real" | "pfa_norma" | "chirii" | "crypto" | "strainatate";

const TIP_LABELS: { id: TipVenit; label: string; capitole: string[] }[] = [
  {
    id: "pfa_real",
    label: "PFA sistem real",
    capitole: [
      "Capitolul I.1 — Venituri din activități independente (sistem real)",
      "Venituri brute, cheltuieli deductibile, venit net",
      "CAS 25% (dacă venit net > 12 salarii minime sau opțional)",
      "CASS 10% (obligatorie, plafonată)",
    ],
  },
  {
    id: "pfa_norma",
    label: "PFA normă de venit",
    capitole: [
      "Capitolul I.1 — Venituri din activități independente (normă de venit)",
      "Norma de venit stabilită de ANAF pe județ/activitate",
      "Impozit și contribuții calculate pe normă, indiferent de venit real",
    ],
  },
  {
    id: "chirii",
    label: "Venituri din chirii",
    capitole: [
      "Capitolul II — Venituri din cedarea folosinței bunurilor",
      "Venit brut anual (chirie brută)",
      "Deducere forfetară 40% aplicată automat",
      "CASS dacă baza impozabilă > 24.300 lei",
    ],
  },
  {
    id: "crypto",
    label: "Crypto & Investiții",
    capitole: [
      "Capitolul III — Venituri din transferul titlurilor de valoare",
      "Câștiguri nete din tranzacții crypto (câștig minus pierderi)",
      "Câștiguri din acțiuni (dacă nu s-a reținut la sursă)",
      "CASS dacă total venituri pasive > 24.300 lei",
    ],
  },
  {
    id: "strainatate",
    label: "Venituri din străinătate",
    capitole: [
      "Capitolul special — Venituri obținute din România de nerezidenți / din străinătate",
      "Verificare convenție de evitare a dublei impuneri",
      "Credit fiscal pentru impozitul plătit în străinătate",
    ],
  },
];

const CHECKLIST = [
  { id: "spv", label: "Cont SPV activ (verificat că pot accede)" },
  { id: "cif", label: "CIF/CNP corect completat" },
  { id: "semn", label: "Semnătură electronică sau token disponibil" },
  { id: "sume", label: "Sumele calculate și verificate" },
  { id: "cont", label: "Cont bancar IBAN corect pentru restituiri" },
  { id: "bonif", label: "Am verificat dacă pot beneficia de bonificația 3% (termen 15 apr)" },
];

function CalculatorBonificatie() {
  const [venitNet, setVenitNet] = useState("");
  const val = parseFloat(venitNet) || 0;
  const impozit = Math.round(val * 0.1);
  const bonificatie = Math.round(impozit * 0.03);
  const impozitRedus = impozit - bonificatie;

  return (
    <div style={{
      background: "rgba(234,179,8,0.08)",
      border: "1px solid rgba(234,179,8,0.3)",
      borderRadius: 12,
      padding: "16px 20px",
      marginBottom: 20,
    }}>
      <h4 style={{ margin: "0 0 12px", fontSize: "0.9rem", fontWeight: 700, color: "#78350f" }}>
        💰 Calculator bonificație 3% D212
      </h4>
      <input
        type="number"
        placeholder="Venit net estimat (lei)"
        value={venitNet}
        onChange={e => setVenitNet(e.target.value)}
        style={{
          padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(234,179,8,0.4)",
          background: "rgba(255,255,255,0.8)", width: "100%", marginBottom: 10,
          fontSize: "0.9rem", outline: "none",
        }}
      />
      {val > 0 && (
        <div style={{ fontSize: "0.875rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#374151" }}>
            <span>Impozit estimat (10%)</span>
            <strong>{fmt(impozit)} lei</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#059669" }}>
            <span>Economie bonificație 3%</span>
            <strong>−{fmt(bonificatie)} lei</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", color: "#78350f", fontWeight: 700, borderTop: "1px solid rgba(234,179,8,0.3)", marginTop: 4 }}>
            <span>Impozit redus de plătit</span>
            <span>{fmt(impozitRedus)} lei</span>
          </div>
          <p style={{ margin: "8px 0 0", color: "#92400e", fontSize: "0.8rem" }}>
            Depunând și plătind până pe <strong>15 aprilie 2026</strong>, economisești <strong>{fmt(bonificatie)} lei</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default function GhidD212() {
  const [step, setStep] = useState(0);
  const [tipuri, setTipuri] = useState<Set<TipVenit>>(new Set());
  const [checklist, setChecklist] = useState<Set<string>>(new Set());

  function toggleTip(t: TipVenit) {
    setTipuri(prev => {
      const n = new Set(prev); if (n.has(t)) n.delete(t); else n.add(t); return n;
    });
  }

  function toggleCheck(id: string) {
    setChecklist(prev => {
      const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n;
    });
  }

  const tipuriSelectate = TIP_LABELS.filter(t => tipuri.has(t.id));
  const toateCapitole = tipuriSelectate.flatMap(t => t.capitole);
  const progress = ((step + 1) / 5) * 100;

  const STEPS = [
    "Tipuri venituri",
    "Ce completezi",
    "Calculator bonificație",
    "Checklist pre-depunere",
    "Depunere SPV",
  ];

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 8, color: "#1e293b" }}>
          Ghid Completare D212 — 2026
        </h1>
        <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
          Ghid pas cu pas pentru depunerea Declarației Unice. Termen cu bonificație: <strong style={{ color: "#dc2626" }}>15 aprilie 2026</strong>.
        </p>

        {/* Progress bar */}
        <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: 9999, height: 6, marginBottom: "0.5rem" }}>
          <div style={{ background: "#6366f1", width: `${progress}%`, height: "100%", borderRadius: 9999, transition: "width 0.3s" }} />
        </div>
        <div style={{ display: "flex", gap: "6px", marginBottom: "2rem", overflowX: "auto" }}>
          {STEPS.map((s, i) => (
            <span key={i} style={{
              fontSize: "0.72rem", fontWeight: i === step ? 700 : 400,
              color: i <= step ? "#6366f1" : "#9ca3af",
              whiteSpace: "nowrap",
            }}>
              {i + 1}. {s}
            </span>
          ))}
        </div>

        <div style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: "24px",
          minHeight: 300,
        }}>

          {/* Step 0 — Tipuri venituri */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
                Alege tipul veniturilor tale
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TIP_LABELS.map(t => (
                  <label key={t.id} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                    background: tipuri.has(t.id) ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${tipuri.has(t.id) ? "rgba(99,102,241,0.5)" : "rgba(0,0,0,0.08)"}`,
                    transition: "all 0.2s",
                  }}>
                    <input
                      type="checkbox"
                      checked={tipuri.has(t.id)}
                      onChange={() => toggleTip(t.id)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontWeight: tipuri.has(t.id) ? 600 : 400, fontSize: "0.9rem", color: "#374151" }}>
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Ce capitole completezi */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
                Ce capitole completezi în D212
              </h2>
              {tipuriSelectate.length === 0 ? (
                <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nu ai selectat niciun tip de venit. Mergi înapoi la pasul 1.</p>
              ) : (
                tipuriSelectate.map(t => (
                  <div key={t.id} style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#6366f1", marginBottom: 8 }}>{t.label}</h3>
                    <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                      {t.capitole.map((c, i) => (
                        <li key={i} style={{ fontSize: "0.85rem", color: "#374151", marginBottom: 4 }}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Step 2 — Calculator bonificație */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
                Calculator bonificație D212
              </h2>
              <CalculatorBonificatie />
              <div style={{
                background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.25)",
                borderRadius: 10, padding: "12px 16px", fontSize: "0.85rem", color: "#064e3b",
              }}>
                <strong>Cine NU poate beneficia de bonificație:</strong>
                <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
                  <li>Persoanele care închiriază spații comerciale/rezidențiale altor entități juridice</li>
                  <li>Persoanele care nu plătesc integral până pe 15 aprilie</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3 — Checklist */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
                Checklist pre-depunere
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CHECKLIST.map(item => (
                  <label key={item.id} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                    background: checklist.has(item.id) ? "rgba(5,150,105,0.08)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${checklist.has(item.id) ? "rgba(5,150,105,0.35)" : "rgba(0,0,0,0.08)"}`,
                    transition: "all 0.2s",
                  }}>
                    <input
                      type="checkbox"
                      checked={checklist.has(item.id)}
                      onChange={() => toggleCheck(item.id)}
                      style={{ width: 16, height: 16, marginTop: 1 }}
                    />
                    <span style={{
                      fontSize: "0.875rem",
                      color: checklist.has(item.id) ? "#059669" : "#374151",
                      fontWeight: checklist.has(item.id) ? 600 : 400,
                      textDecoration: checklist.has(item.id) ? "line-through" : undefined,
                    }}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 12 }}>
                {checklist.size}/{CHECKLIST.length} completate
              </p>
            </div>
          )}

          {/* Step 4 — Depunere SPV */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
                Depune D212 prin SPV ANAF
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: 10, padding: "14px 16px",
                }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4338ca", marginBottom: 8 }}>
                    Pași de urmat:
                  </p>
                  <ol style={{ margin: 0, paddingLeft: 18, fontSize: "0.85rem", color: "#374151", lineHeight: 1.7 }}>
                    <li>Accesează <strong>SPV (Spațiul Privat Virtual)</strong> pe anaf.ro</li>
                    <li>Alege <strong>Depunere declarații</strong> → <strong>D212</strong></li>
                    <li>Completează formularul online sau încarcă PDF-ul completat</li>
                    <li>Semnează cu certificat digital sau token</li>
                    <li>Plătește sumele calculate (online, la bancă, sau prin ghișeu)</li>
                  </ol>
                </div>
                <a
                  href="https://www.anaf.ro/anaf/internet/RO/servicii-online/spatiu-privat-virtual"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center",
                    background: "#6366f1", color: "#fff",
                    padding: "12px 24px", borderRadius: 10,
                    fontWeight: 700, textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Deschide SPV ANAF →
                </a>
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", textAlign: "center" }}>
                  Termen cu bonificație 3%: <strong style={{ color: "#dc2626" }}>15 aprilie 2026</strong> · Termen normal: 25 mai 2026
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
          <button
            onClick={() => setStep(p => Math.max(0, p - 1))}
            disabled={step === 0}
            style={{
              padding: "10px 24px", borderRadius: 10,
              border: "1px solid rgba(99,102,241,0.3)",
              background: step === 0 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
              color: step === 0 ? "#9ca3af" : "#6366f1",
              fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
            }}
          >
            ← Înapoi
          </button>
          {step < 4 && (
            <button
              onClick={() => setStep(p => Math.min(4, p + 1))}
              style={{
                padding: "10px 24px", borderRadius: 10,
                background: "#6366f1", color: "#fff",
                border: "none", fontWeight: 700, cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Înainte →
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
