"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { calcSalariu } from "@/lib/salary";

interface Angajat {
  id: string;
  nume: string;
  functie: string;
  brut_lunar: number;
  data_angajare: string;
  nr_copii: number;
  pontaj: number;
}

const emptyForm = { nume: "", functie: "", brutLunar: "", dataAngajare: "", nrCopii: 0, pontaj: 21 };

export default function HRPage() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [angajati, setAngajati]   = useState<Angajat[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [selected, setSelected]   = useState<string | null>(null);
  const [showCalc, setShowCalc]   = useState(false);
  const [calcBrut, setCalcBrut]   = useState("5000");
  const [calcCopii, setCalcCopii] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("focustax_company_id") ?? "";
    if (!id || id === "demo" || id === "temp") {
      window.location.href = "/manager/setup";
      return;
    }
    setCompanyId(id);

    fetch(`/api/angajati?company_id=${id}`)
      .then((r) => r.json())
      .then((d) => setAngajati(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addAngajat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) return;
    const res = await fetch("/api/angajati", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_id: companyId,
        nume: form.nume,
        functie: form.functie,
        brutLunar: Number(form.brutLunar),
        dataAngajare: form.dataAngajare,
        nrCopii: form.nrCopii,
        pontaj: form.pontaj,
      }),
    });
    const nou = await res.json();
    if (!nou.error) {
      setAngajati((prev) => [nou, ...prev]);
      setShowForm(false);
      setForm(emptyForm);
    }
  };

  const removeAngajat = async (id: string) => {
    await fetch(`/api/angajati?id=${id}`, { method: "DELETE" });
    setAngajati((prev) => prev.filter((a) => a.id !== id));
  };

  if (loading) return <div className={styles.page}>Se încarcă angajații...</div>;

  const totalBrut  = angajati.reduce((s, a) => s + calcSalariu(a.brut_lunar, a.nr_copii, a.pontaj).brut, 0);
  const totalNet   = angajati.reduce((s, a) => s + calcSalariu(a.brut_lunar, a.nr_copii, a.pontaj).net, 0);
  const totalAngaj = angajati.reduce((s, a) => s + calcSalariu(a.brut_lunar, a.nr_copii, a.pontaj).totalAngajator, 0);
  const calcResult = calcSalariu(Number(calcBrut) || 0, calcCopii);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>HR & Salarii</h1>
          <p className={styles.pageSubtitle}>Calculator salariu net România 2026 · CAS 25% · CASS 10% · Impozit 10%</p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnSecondary} onClick={() => setShowCalc(!showCalc)}>🧮 Calculator rapid</button>
          <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>+ Angajat nou</button>
        </div>
      </div>

      {showCalc && (
        <div className={styles.quickCalc}>
          <h3 className={styles.calcTitle}>🧮 Calculator Salariu Net — România 2026</h3>
          <div className={styles.calcRow}>
            <label className={styles.calcLabel}>Salariu brut (lei)
              <input className={styles.calcInput} type="number" value={calcBrut} onChange={(e) => setCalcBrut(e.target.value)} min="0" />
            </label>
            <label className={styles.calcLabel}>Nr. copii în întreținere
              <input className={styles.calcInput} type="number" value={calcCopii} onChange={(e) => setCalcCopii(Number(e.target.value))} min="0" max="10" />
            </label>
          </div>
          {Number(calcBrut) > 0 && (
            <div className={styles.calcResults}>
              <div className={styles.calcRow2}>
                <div className={styles.calcItem}><span className={styles.calcItemLabel}>Salariu brut</span><span className={styles.calcItemValue}>{calcResult.brut.toLocaleString("ro-RO")} lei</span></div>
                <div className={`${styles.calcItem} ${styles.calcDeduction}`}><span className={styles.calcItemLabel}>CAS 25%</span><span className={styles.calcItemValue}>−{calcResult.cas.toLocaleString("ro-RO")} lei</span></div>
                <div className={`${styles.calcItem} ${styles.calcDeduction}`}><span className={styles.calcItemLabel}>CASS 10%</span><span className={styles.calcItemValue}>−{calcResult.cass.toLocaleString("ro-RO")} lei</span></div>
                <div className={`${styles.calcItem} ${styles.calcDeduction}`}><span className={styles.calcItemLabel}>Impozit 10%</span><span className={styles.calcItemValue}>−{calcResult.impozit.toLocaleString("ro-RO")} lei</span></div>
                <div className={`${styles.calcItem} ${styles.calcNet}`}><span className={styles.calcItemLabel}>SALARIU NET</span><span className={styles.calcItemValueBig}>{calcResult.net.toLocaleString("ro-RO")} lei</span></div>
              </div>
              <div className={styles.calcAngajator}><span>Cost total angajator (cu CAM 4%):</span><strong>{calcResult.totalAngajator.toLocaleString("ro-RO")} lei</strong></div>
            </div>
          )}
        </div>
      )}

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}><span className={styles.summaryNum}>{angajati.length}</span><span className={styles.summaryLabel}>Angajați activi</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryNum}>{totalBrut.toLocaleString("ro-RO")} lei</span><span className={styles.summaryLabel}>Total fond brut/lună</span></div>
        <div className={styles.summaryCard}><span className={`${styles.summaryNum} ${styles.numGreen}`}>{totalNet.toLocaleString("ro-RO")} lei</span><span className={styles.summaryLabel}>Total net de plată</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryNum}>{totalAngaj.toLocaleString("ro-RO")} lei</span><span className={styles.summaryLabel}>Cost total angajator</span></div>
      </div>

      <div className={styles.employeeList}>
        {angajati.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", opacity: 0.6 }}>
            <div style={{ fontSize: "2rem" }}>👥</div>
            <p>Niciun angajat adăugat. Apasă „+ Angajat nou" pentru a începe.</p>
          </div>
        )}
        {angajati.map((a) => {
          const calc = calcSalariu(a.brut_lunar, a.nr_copii, a.pontaj);
          const isSelected = selected === a.id;
          return (
            <div key={a.id} className={`${styles.employeeCard} ${isSelected ? styles.employeeCardSelected : ""}`}>
              <div className={styles.employeeHeader} onClick={() => setSelected(isSelected ? null : a.id)}>
                <div className={styles.employeeLeft}>
                  <div className={styles.avatar}>{a.nume.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
                  <div>
                    <div className={styles.employeeName}>{a.nume}</div>
                    <div className={styles.employeeFunctie}>{a.functie}</div>
                  </div>
                </div>
                <div className={styles.employeeRight}>
                  <div className={styles.employeeBrut}>{calc.brut.toLocaleString("ro-RO")} lei brut</div>
                  <div className={styles.employeeNet}>→ {calc.net.toLocaleString("ro-RO")} lei net</div>
                  {a.pontaj < 21 && <div className={styles.pontajWarn}>⚠ Pontaj: {a.pontaj}/21 zile</div>}
                </div>
                <span className={styles.expandIcon}>{isSelected ? "▲" : "▼"}</span>
              </div>
              {isSelected && (
                <div className={styles.salaryDetails}>
                  <div className={styles.salaryGrid}>
                    <div className={styles.salaryRow}><span>Salariu brut</span><span className={styles.salaryVal}>{calc.brut.toLocaleString("ro-RO")} lei</span></div>
                    <div className={`${styles.salaryRow} ${styles.deductRow}`}><span>CAS 25%</span><span>−{calc.cas.toLocaleString("ro-RO")} lei</span></div>
                    <div className={`${styles.salaryRow} ${styles.deductRow}`}><span>CASS 10%</span><span>−{calc.cass.toLocaleString("ro-RO")} lei</span></div>
                    {calc.deducere > 0 && (
                      <div className={`${styles.salaryRow} ${styles.deductRow} ${styles.benefitRow}`}>
                        <span>Deducere personală{a.nr_copii > 0 ? ` (+${a.nr_copii} copii)` : ""}</span>
                        <span>−{calc.deducere.toLocaleString("ro-RO")} lei</span>
                      </div>
                    )}
                    <div className={`${styles.salaryRow} ${styles.deductRow}`}><span>Impozit 10%</span><span>−{calc.impozit.toLocaleString("ro-RO")} lei</span></div>
                    <div className={`${styles.salaryRow} ${styles.netRow}`}><span><strong>SALARIU NET</strong></span><span><strong>{calc.net.toLocaleString("ro-RO")} lei</strong></span></div>
                  </div>
                  <div className={styles.angajatorBox}><span>Cost angajator (+ CAM 4%):</span><strong>{calc.totalAngajator.toLocaleString("ro-RO")} lei/lună</strong></div>
                  <div className={styles.employeeActions}>
                    <span className={styles.employeeMeta}>Angajat din: {a.data_angajare} · Pontaj: {a.pontaj}/21</span>
                    <button className={styles.deleteBtn} onClick={() => removeAngajat(a.id)}>🗑 Elimină</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}><h2>Angajat nou</h2><button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button></div>
            <form className={styles.form} onSubmit={addAngajat}>
              <div className={styles.formRow}>
                <label className={styles.label}>Nume complet *<input className={styles.input} value={form.nume} onChange={(e) => setForm({ ...form, nume: e.target.value })} placeholder="Ion Popescu" required /></label>
                <label className={styles.label}>Funcție *<input className={styles.input} value={form.functie} onChange={(e) => setForm({ ...form, functie: e.target.value })} placeholder="Developer Senior" required /></label>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Salariu brut lunar (lei) *<input className={styles.input} type="number" value={form.brutLunar} onChange={(e) => setForm({ ...form, brutLunar: e.target.value })} placeholder="5000" required min="0" /></label>
                <label className={styles.label}>Nr. copii în întreținere<input className={styles.input} type="number" value={form.nrCopii} onChange={(e) => setForm({ ...form, nrCopii: Number(e.target.value) })} min="0" max="15" /></label>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Data angajării<input className={styles.input} type="date" value={form.dataAngajare} onChange={(e) => setForm({ ...form, dataAngajare: e.target.value })} /></label>
                <label className={styles.label}>Zile pontaj (din 21)<input className={styles.input} type="number" value={form.pontaj} onChange={(e) => setForm({ ...form, pontaj: Number(e.target.value) })} min="0" max="21" /></label>
              </div>
              {form.brutLunar && Number(form.brutLunar) > 0 && (() => {
                const r = calcSalariu(Number(form.brutLunar), form.nrCopii, form.pontaj);
                return <div className={styles.tvaPreview}>Preview: Net = <strong>{r.net.toLocaleString("ro-RO")} lei</strong> · Cost angajator: <strong>{r.totalAngajator.toLocaleString("ro-RO")} lei</strong></div>;
              })()}
              <div className={styles.d112Note}>🤖 D112 va fi generat automat în ziua de 25 a lunii.</div>
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)}>Anulează</button>
                <button type="submit" className={styles.btnPrimary}>Adaugă angajat →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
