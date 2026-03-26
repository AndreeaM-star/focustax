"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Angajat {
  id: string;
  nume: string;
  functie: string;
  brutLunar: number;
  dataAngajare: string;
  nrCopii: number;
  pontaj: number; // zile lucrate din 21
}

const seedAngajati: Angajat[] = [
  { id: "1", nume: "Ion Popescu", functie: "Developer Senior", brutLunar: 8500, dataAngajare: "2023-03-01", nrCopii: 1, pontaj: 21 },
  { id: "2", nume: "Maria Ionescu", functie: "Project Manager", brutLunar: 9200, dataAngajare: "2022-06-15", nrCopii: 2, pontaj: 20 },
  { id: "3", nume: "Andrei Georgescu", functie: "Designer UX", brutLunar: 6800, dataAngajare: "2024-01-10", nrCopii: 0, pontaj: 21 },
  { id: "4", nume: "Elena Dumitrescu", functie: "Account Manager", brutLunar: 5500, dataAngajare: "2023-09-01", nrCopii: 0, pontaj: 19 },
  { id: "5", nume: "Mihai Stanescu", functie: "DevOps Engineer", brutLunar: 10200, dataAngajare: "2021-11-20", nrCopii: 3, pontaj: 21 },
];

// Romanian salary calculation 2026
function calcSalariu(brutBaza: number, nrCopii: number, pontaj: number = 21) {
  const zileTotale = 21;
  const brut = Math.round(brutBaza * (pontaj / zileTotale));

  // CAS 25% angajat
  const cas = Math.round(brut * 0.25);

  // CASS 10% angajat
  const cass = Math.round(brut * 0.10);

  // Deducere personala (simplificata 2026)
  let deducere = 0;
  if (brut <= 1957) { // salariul minim 2026 estimat
    deducere = 460;
  } else if (brut <= 3600) {
    deducere = Math.max(0, 460 - Math.round(0.2 * (brut - 1957)));
  }
  // Supliment copii
  deducere += nrCopii * 200;

  // Baza impozit
  const bazaImpozit = Math.max(0, brut - cas - cass - deducere);

  // Impozit venit 10%
  const impozit = Math.round(bazaImpozit * 0.10);

  const net = brut - cas - cass - impozit;

  // Costuri angajator
  const casAngajator    = Math.round(brut * 0.04); // CAM 4%
  const totalAngajator  = brut + casAngajator;

  return { brut, cas, cass, deducere, impozit, net, casAngajator, totalAngajator };
}

const emptyAngajat = {
  nume: "", functie: "", brutLunar: "", dataAngajare: "", nrCopii: 0, pontaj: 21,
};

export default function HRPage() {
  const [angajati, setAngajati] = useState<Angajat[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAngajat);
  const [selected, setSelected] = useState<string | null>(null);
  const [showCalc, setShowCalc] = useState(false);
  const [calcBrut, setCalcBrut] = useState("5000");
  const [calcCopii, setCalcCopii] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ft_angajati");
      setAngajati(saved ? JSON.parse(saved) : seedAngajati);
    } catch { setAngajati(seedAngajati); }
  }, []);

  const saveAngajati = (list: Angajat[]) => {
    setAngajati(list);
    localStorage.setItem("ft_angajati", JSON.stringify(list));
  };

  const addAngajat = (e: React.FormEvent) => {
    e.preventDefault();
    const nou: Angajat = {
      id: Date.now().toString(),
      nume: form.nume,
      functie: form.functie,
      brutLunar: Number(form.brutLunar),
      dataAngajare: form.dataAngajare,
      nrCopii: form.nrCopii,
      pontaj: form.pontaj,
    };
    saveAngajati([nou, ...angajati]);
    setShowForm(false);
    setForm(emptyAngajat);
  };

  const removeAngajat = (id: string) => {
    saveAngajati(angajati.filter((a) => a.id !== id));
    if (selected === id) setSelected(null);
  };

  const totalBrut  = angajati.reduce((s, a) => s + calcSalariu(a.brutLunar, a.nrCopii, a.pontaj).brut, 0);
  const totalNet   = angajati.reduce((s, a) => s + calcSalariu(a.brutLunar, a.nrCopii, a.pontaj).net, 0);
  const totalAngaj = angajati.reduce((s, a) => s + calcSalariu(a.brutLunar, a.nrCopii, a.pontaj).totalAngajator, 0);

  const selectedAngajat = angajati.find((a) => a.id === selected);
  const calcSelected = selectedAngajat
    ? calcSalariu(selectedAngajat.brutLunar, selectedAngajat.nrCopii, selectedAngajat.pontaj)
    : null;

  // Quick calculator
  const calcResult = calcSalariu(Number(calcBrut) || 0, calcCopii);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>HR & Salarii</h1>
          <p className={styles.pageSubtitle}>
            Calculator salariu net România 2026 · CAS 25% · CASS 10% · Impozit 10%
          </p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnSecondary} onClick={() => setShowCalc(!showCalc)}>
            🧮 Calculator rapid
          </button>
          <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>
            + Angajat nou
          </button>
        </div>
      </div>

      {/* Quick Calculator */}
      {showCalc && (
        <div className={styles.quickCalc}>
          <h3 className={styles.calcTitle}>🧮 Calculator Salariu Net — România 2026</h3>
          <div className={styles.calcRow}>
            <label className={styles.calcLabel}>
              Salariu brut (lei)
              <input
                className={styles.calcInput}
                type="number"
                value={calcBrut}
                onChange={(e) => setCalcBrut(e.target.value)}
                min="0"
              />
            </label>
            <label className={styles.calcLabel}>
              Nr. copii în întreținere
              <input
                className={styles.calcInput}
                type="number"
                value={calcCopii}
                onChange={(e) => setCalcCopii(Number(e.target.value))}
                min="0"
                max="10"
              />
            </label>
          </div>
          {calcBrut && Number(calcBrut) > 0 && (
            <div className={styles.calcResults}>
              <div className={styles.calcRow2}>
                <div className={styles.calcItem}>
                  <span className={styles.calcItemLabel}>Salariu brut</span>
                  <span className={styles.calcItemValue}>{calcResult.brut.toLocaleString("ro-RO")} lei</span>
                </div>
                <div className={`${styles.calcItem} ${styles.calcDeduction}`}>
                  <span className={styles.calcItemLabel}>CAS 25%</span>
                  <span className={styles.calcItemValue}>−{calcResult.cas.toLocaleString("ro-RO")} lei</span>
                </div>
                <div className={`${styles.calcItem} ${styles.calcDeduction}`}>
                  <span className={styles.calcItemLabel}>CASS 10%</span>
                  <span className={styles.calcItemValue}>−{calcResult.cass.toLocaleString("ro-RO")} lei</span>
                </div>
                <div className={`${styles.calcItem} ${styles.calcDeduction}`}>
                  <span className={styles.calcItemLabel}>Impozit venit 10%</span>
                  <span className={styles.calcItemValue}>−{calcResult.impozit.toLocaleString("ro-RO")} lei</span>
                </div>
                <div className={`${styles.calcItem} ${styles.calcNet}`}>
                  <span className={styles.calcItemLabel}>SALARIU NET</span>
                  <span className={styles.calcItemValueBig}>{calcResult.net.toLocaleString("ro-RO")} lei</span>
                </div>
              </div>
              <div className={styles.calcAngajator}>
                <span>Cost total angajator (cu CAM 4%):</span>
                <strong>{calcResult.totalAngajator.toLocaleString("ro-RO")} lei</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>{angajati.length}</span>
          <span className={styles.summaryLabel}>Angajați activi</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>{totalBrut.toLocaleString("ro-RO")} lei</span>
          <span className={styles.summaryLabel}>Total fond brut/lună</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={`${styles.summaryNum} ${styles.numGreen}`}>{totalNet.toLocaleString("ro-RO")} lei</span>
          <span className={styles.summaryLabel}>Total net de plată</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>{totalAngaj.toLocaleString("ro-RO")} lei</span>
          <span className={styles.summaryLabel}>Cost total angajator</span>
        </div>
      </div>

      {/* Employees */}
      <div className={styles.employeeList}>
        {angajati.map((a) => {
          const calc = calcSalariu(a.brutLunar, a.nrCopii, a.pontaj);
          const isSelected = selected === a.id;
          return (
            <div key={a.id} className={`${styles.employeeCard} ${isSelected ? styles.employeeCardSelected : ""}`}>
              <div className={styles.employeeHeader} onClick={() => setSelected(isSelected ? null : a.id)}>
                <div className={styles.employeeLeft}>
                  <div className={styles.avatar}>
                    {a.nume.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className={styles.employeeName}>{a.nume}</div>
                    <div className={styles.employeeFunctie}>{a.functie}</div>
                  </div>
                </div>
                <div className={styles.employeeRight}>
                  <div className={styles.employeeBrut}>{calc.brut.toLocaleString("ro-RO")} lei brut</div>
                  <div className={styles.employeeNet}>→ {calc.net.toLocaleString("ro-RO")} lei net</div>
                  {a.pontaj < 21 && (
                    <div className={styles.pontajWarn}>⚠ Pontaj: {a.pontaj}/21 zile</div>
                  )}
                </div>
                <span className={styles.expandIcon}>{isSelected ? "▲" : "▼"}</span>
              </div>

              {isSelected && (
                <div className={styles.salaryDetails}>
                  <div className={styles.salaryGrid}>
                    <div className={styles.salaryRow}>
                      <span>Salariu brut</span>
                      <span className={styles.salaryVal}>{calc.brut.toLocaleString("ro-RO")} lei</span>
                    </div>
                    <div className={`${styles.salaryRow} ${styles.deductRow}`}>
                      <span>CAS (25% angajat)</span>
                      <span>−{calc.cas.toLocaleString("ro-RO")} lei</span>
                    </div>
                    <div className={`${styles.salaryRow} ${styles.deductRow}`}>
                      <span>CASS (10% angajat)</span>
                      <span>−{calc.cass.toLocaleString("ro-RO")} lei</span>
                    </div>
                    {calc.deducere > 0 && (
                      <div className={`${styles.salaryRow} ${styles.deductRow} ${styles.benefitRow}`}>
                        <span>Deducere personală{a.nrCopii > 0 ? ` (+${a.nrCopii} copii)` : ""}</span>
                        <span>−{calc.deducere.toLocaleString("ro-RO")} lei (din baza)</span>
                      </div>
                    )}
                    <div className={`${styles.salaryRow} ${styles.deductRow}`}>
                      <span>Impozit venit (10%)</span>
                      <span>−{calc.impozit.toLocaleString("ro-RO")} lei</span>
                    </div>
                    <div className={`${styles.salaryRow} ${styles.netRow}`}>
                      <span><strong>SALARIU NET</strong></span>
                      <span><strong>{calc.net.toLocaleString("ro-RO")} lei</strong></span>
                    </div>
                  </div>
                  <div className={styles.angajatorBox}>
                    <span>Cost angajator (+ CAM 4%):</span>
                    <strong>{calc.totalAngajator.toLocaleString("ro-RO")} lei/lună</strong>
                  </div>
                  <div className={styles.employeeActions}>
                    <span className={styles.employeeMeta}>
                      Angajat din: {a.dataAngajare} · Pontaj: {a.pontaj}/21 zile
                    </span>
                    <button className={styles.deleteBtn} onClick={() => removeAngajat(a.id)}>
                      🗑 Elimină
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add employee modal */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Angajat nou</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form className={styles.form} onSubmit={addAngajat}>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Nume complet *
                  <input className={styles.input} value={form.nume}
                    onChange={(e) => setForm({ ...form, nume: e.target.value })}
                    placeholder="Ion Popescu" required />
                </label>
                <label className={styles.label}>
                  Funcție *
                  <input className={styles.input} value={form.functie}
                    onChange={(e) => setForm({ ...form, functie: e.target.value })}
                    placeholder="Developer Senior" required />
                </label>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Salariu brut lunar (lei) *
                  <input className={styles.input} type="number" value={form.brutLunar}
                    onChange={(e) => setForm({ ...form, brutLunar: e.target.value })}
                    placeholder="5000" required min="0" />
                </label>
                <label className={styles.label}>
                  Nr. copii în întreținere
                  <input className={styles.input} type="number" value={form.nrCopii}
                    onChange={(e) => setForm({ ...form, nrCopii: Number(e.target.value) })}
                    min="0" max="15" />
                </label>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Data angajării
                  <input className={styles.input} type="date" value={form.dataAngajare}
                    onChange={(e) => setForm({ ...form, dataAngajare: e.target.value })} />
                </label>
                <label className={styles.label}>
                  Zile pontaj (din 21)
                  <input className={styles.input} type="number" value={form.pontaj}
                    onChange={(e) => setForm({ ...form, pontaj: Number(e.target.value) })}
                    min="0" max="21" />
                </label>
              </div>
              {form.brutLunar && Number(form.brutLunar) > 0 && (() => {
                const r = calcSalariu(Number(form.brutLunar), form.nrCopii, form.pontaj);
                return (
                  <div className={styles.tvaPreview}>
                    Preview: Net = <strong>{r.net.toLocaleString("ro-RO")} lei</strong>
                    &nbsp;· Cost angajator: <strong>{r.totalAngajator.toLocaleString("ro-RO")} lei</strong>
                  </div>
                );
              })()}
              <div className={styles.d112Note}>
                🤖 D112 va fi generat automat în ziua de 25 a lunii și transmis la ANAF.
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)}>
                  Anulează
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  Adaugă angajat →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
