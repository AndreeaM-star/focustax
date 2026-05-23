"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

function d212ZileRamase(): number {
  const termen = new Date(2026, 4, 25);
  const azi = new Date(); azi.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((termen.getTime() - azi.getTime()) / 86400000));
}

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
  { id: "bonif", label: "Am notat că bonificația 3% (termen 15 apr. 2026) a expirat — termen curent: 25 mai 2026" },
];

const STEPS = [
  "Tipuri venituri",
  "Ce completezi",
  "Calculator bonificație",
  "Checklist pre-depunere",
  "Depunere SPV",
];

function CalculatorBonificatie() {
  const [venitNet, setVenitNet] = useState("");
  const val = parseFloat(venitNet) || 0;
  const impozit = Math.round(val * 0.1);
  const bonificatie = Math.round(impozit * 0.03);
  const impozitRedus = impozit - bonificatie;

  return (
    <div className={styles.bonCalc}>
      <div className={styles.bonCalcTitle}>💰 Calculator bonificație 3% D212</div>
      <input
        type="number"
        placeholder="Venit net estimat (lei)"
        value={venitNet}
        onChange={e => setVenitNet(e.target.value)}
        className={styles.input}
        style={{ marginBottom: 10 }}
      />
      {val > 0 && (
        <>
          <div className={styles.bonRow}>
            <span>Impozit estimat (10%)</span>
            <strong>{fmt(impozit)} lei</strong>
          </div>
          <div className={styles.bonRow} style={{ color: "#059669" }}>
            <span>Economie bonificație 3%</span>
            <strong>−{fmt(bonificatie)} lei</strong>
          </div>
          <div className={styles.bonTotal}>
            <span>Impozit redus de plătit</span>
            <span>{fmt(impozitRedus)} lei</span>
          </div>
          <p className={styles.bonNote}>
            Bonificația 3% era disponibilă până pe <strong>15 aprilie 2026</strong> (termen expirat). Economie posibilă era <strong>{fmt(bonificatie)} lei</strong>.
          </p>
        </>
      )}
    </div>
  );
}

export default function GhidD212() {
  const zile = d212ZileRamase();
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
  const progress = ((step + 1) / 5) * 100;

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Ghid Completare <span className={styles.titleAccent}>D212</span> 2026
          </h1>
          <p className={styles.subtitle}>
            Wizard interactiv pas cu pas pentru depunerea Declarației Unice.
          </p>
          {zile > 0 && (
            <div className={styles.urgentBadge}>
              ⚡ Termen depunere D212: 25 mai 2026 — mai ai {zile === 1 ? "1 zi" : `${zile} zile`}!
            </div>
          )}
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.stepLabels}>
          {STEPS.map((s, i) => (
            <span
              key={i}
              className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ""} ${i < step ? styles.stepLabelDone : ""}`}
            >
              {i + 1}. {s}
            </span>
          ))}
        </div>

        <div className={styles.stepPanel}>

          {step === 0 && (
            <>
              <h2 className={styles.stepTitle}>Alege tipul veniturilor tale</h2>
              <div className={styles.checkboxList}>
                {TIP_LABELS.map(t => (
                  <label
                    key={t.id}
                    className={`${styles.checkboxItem} ${tipuri.has(t.id) ? styles.checkboxItemActive : ""}`}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={tipuri.has(t.id)}
                      onChange={() => toggleTip(t.id)}
                    />
                    <span className={`${styles.checkboxLabel} ${tipuri.has(t.id) ? styles.checkboxLabelActive : ""}`}>
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className={styles.stepTitle}>Ce capitole completezi în D212</h2>
              {tipuriSelectate.length === 0 ? (
                <p className={styles.emptyState}>Nu ai selectat niciun tip de venit. Mergi înapoi la pasul 1.</p>
              ) : (
                tipuriSelectate.map(t => (
                  <div key={t.id} className={styles.capGroup}>
                    <div className={styles.capGroupTitle}>{t.label}</div>
                    <ul className={styles.capList}>
                      {t.capitole.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                ))
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className={styles.stepTitle}>Calculator bonificație D212</h2>
              <CalculatorBonificatie />
              <div style={{
                background: "rgba(5,150,105,0.08)",
                border: "1px solid rgba(5,150,105,0.25)",
                borderRadius: 10, padding: "12px 16px",
                fontSize: "0.85rem", color: "#064e3b",
              }}>
                <strong>Cine NU poate beneficia de bonificație:</strong>
                <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
                  <li>Persoanele care închiriază spații comerciale/rezidențiale altor entități juridice</li>
                  <li>Persoanele care nu plătesc integral până pe 15 aprilie</li>
                </ul>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className={styles.stepTitle}>Checklist pre-depunere</h2>
              <div className={styles.checklist}>
                {CHECKLIST.map(item => (
                  <label
                    key={item.id}
                    className={`${styles.checkItem} ${checklist.has(item.id) ? styles.checkItemDone : ""}`}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={checklist.has(item.id)}
                      onChange={() => toggleCheck(item.id)}
                    />
                    <span className={`${styles.checkItemText} ${checklist.has(item.id) ? styles.checkItemTextDone : ""}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 12 }}>
                {checklist.size}/{CHECKLIST.length} completate
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className={styles.stepTitle}>Depune D212 prin SPV ANAF</h2>
              <div style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 10, padding: "14px 16px",
                marginBottom: 16,
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
              <div className={styles.spvLinks}>
                <a
                  href="https://www.anaf.ro/anaf/internet/RO/servicii-online/spatiu-privat-virtual"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.spvBtn} ${styles.spvBtnPrimary}`}
                >
                  Deschide SPV ANAF →
                </a>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
                Termen cu bonificație 3%: <strong style={{ color: "#dc2626" }}>15 aprilie 2026</strong> · Termen normal: 25 mai 2026
              </p>
            </>
          )}
        </div>

        <div className={styles.navButtons}>
          <button
            className={styles.btnBack}
            onClick={() => setStep(p => Math.max(0, p - 1))}
            disabled={step === 0}
          >
            ← Înapoi
          </button>
          <span className={styles.stepCounter}>Pasul {step + 1} din {STEPS.length}</span>
          {step < 4 && (
            <button
              className={styles.btnNext}
              onClick={() => setStep(p => Math.min(4, p + 1))}
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
