"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

type Status = "validata" | "in_asteptare" | "respinsa" | "draft";

interface Factura {
  id: string;
  numar: string;
  client: string;
  cui_client?: string;
  valoare: number;
  tva: number;
  data: string;
  scadenta?: string;
  status: Status;
  descriere?: string;
}

const statusConfig: Record<Status, { label: string; color: string }> = {
  validata:     { label: "Validată ANAF", color: "green" },
  in_asteptare: { label: "În așteptare",  color: "amber" },
  respinsa:     { label: "Respinsă",      color: "red" },
  draft:        { label: "Draft",         color: "gray" },
};

const coteTV = [
  { label: "19% standard",      val: 19 },
  { label: "9% redusă (alim.)", val: 9 },
  { label: "5% redusă (cărți)", val: 5 },
];

const emptyForm = {
  client: "", cui_client: "", valoare: "", cotaTVA: 19,
  data: new Date().toISOString().slice(0, 10), scadenta: "", descriere: "",
};

export default function FacturiPage() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [facturi, setFacturi]     = useState<Factura[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [filterStatus, setFilterStatus] = useState<Status | "toate">("toate");
  const [newlyAdded, setNewlyAdded]     = useState<string | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("focustax_company_id") ?? "";
    if (!id || id === "demo" || id === "temp") {
      window.location.href = "/manager/setup";
      return;
    }
    setCompanyId(id);

    fetch(`/api/facturi?company_id=${id}`)
      .then((r) => r.json())
      .then((d) => setFacturi(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) return;
    setErr("");
    const val = parseFloat(form.valoare) || 0;
    const tva = val * (form.cotaTVA / 100);
    const scadenta = form.scadenta || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

    try {
      const res = await fetch("/api/facturi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id: companyId,
          client: form.client,
          cui_client: form.cui_client,
          valoare: val,
          tva,
          data: form.data,
          scadenta,
          descriere: form.descriere,
        }),
      });
      const nf = await res.json();
      if (nf.error) throw new Error(nf.error);
      setFacturi((prev) => [nf, ...prev]);
      setNewlyAdded(nf.id);
      setShowForm(false);
      setForm(emptyForm);
      setTimeout(() => setNewlyAdded(null), 4000);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Eroare la salvare");
    }
  };

  const remove = async (id: string) => {
    await fetch(`/api/facturi?id=${id}`, { method: "DELETE" });
    setFacturi((prev) => prev.filter((f) => f.id !== id));
  };

  const totalValoare = facturi.reduce((s, f) => s + Number(f.valoare), 0);
  const totalTVA     = facturi.reduce((s, f) => s + Number(f.tva), 0);
  const validate     = facturi.filter((f) => f.status === "validata").length;
  const filtered     = filterStatus === "toate" ? facturi : facturi.filter((f) => f.status === filterStatus);

  if (loading) return <div className={styles.page}>Se încarcă facturile...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>e-Factura</h1>
          <p className={styles.pageSubtitle}>Emite, transmite și urmărește facturile — ANAF validare automată</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>+ Factură nouă</button>
      </div>

      {newlyAdded && (
        <div className={styles.notif}>
          ⏳ Factură trimisă la ANAF — validare în curs... Statusul se actualizează în câteva secunde.
        </div>
      )}

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>{facturi.length}</span>
          <span className={styles.summaryLabel}>Total facturi</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={`${styles.summaryNum} ${styles.numGreen}`}>{validate}</span>
          <span className={styles.summaryLabel}>Validate ANAF</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>{totalValoare.toLocaleString("ro-RO", { maximumFractionDigits: 0 })} lei</span>
          <span className={styles.summaryLabel}>Valoare totală</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>{totalTVA.toLocaleString("ro-RO", { maximumFractionDigits: 0 })} lei</span>
          <span className={styles.summaryLabel}>TVA total</span>
        </div>
      </div>

      <div className={styles.filterRow}>
        {(["toate", "validata", "in_asteptare", "respinsa", "draft"] as const).map((s) => (
          <button key={s}
            className={`${styles.filterBtn} ${filterStatus === s ? styles.filterBtnActive : ""}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === "toate" ? "Toate" : statusConfig[s]?.label || s}
          </button>
        ))}
      </div>

      <div className={styles.invoiceList}>
        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            <span>📄</span>
            <p>Nicio factură. Emite prima factură cu butonul de sus.</p>
          </div>
        )}
        {filtered.map((f) => {
          const sc = statusConfig[f.status];
          const isNew = f.id === newlyAdded;
          return (
            <div key={f.id} className={`${styles.invoiceCard} ${isNew ? styles.invoiceCardNew : ""}`}>
              <div className={styles.invoiceTop}>
                <div>
                  <span className={styles.invoiceNum}>{f.numar}</span>
                  <span className={`${styles.statusBadge} ${styles[`status_${sc.color}`]}`}>
                    {isNew && f.status === "in_asteptare" ? "⏳ Validare ANAF..." : sc.label}
                  </span>
                </div>
                <div className={styles.invoiceValue}>
                  <span className={styles.invoiceAmount}>{Number(f.valoare).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei</span>
                  <span className={styles.invoiceTVA}>+ {Number(f.tva).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei TVA</span>
                </div>
              </div>
              <div className={styles.invoiceDetails}>
                <span className={styles.invoiceClient}>🏢 {f.client}</span>
                <span className={styles.invoiceCUI}>CUI: {f.cui_client || "-"}</span>
              </div>
              <div className={styles.invoiceDesc}>{f.descriere}</div>
              <div className={styles.invoiceFooter}>
                <span>📅 Emisă: {f.data}</span>
                <span>⏱ Scadentă: {f.scadenta}</span>
                <button className={styles.deleteBtn} onClick={() => remove(f.id)} title="Șterge">🗑</button>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Factură nouă</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>
            {err && <div style={{ color: "#dc2626", padding: "0.5rem 1rem", fontSize: "0.85rem" }}>❌ {err}</div>}
            <form className={styles.form} onSubmit={add}>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Client *
                  <input className={styles.input} value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Numele firmei cliente" required />
                </label>
                <label className={styles.label}>
                  CUI Client
                  <input className={styles.input} value={form.cui_client} onChange={(e) => setForm({ ...form, cui_client: e.target.value })} placeholder="RO12345678" />
                </label>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Valoare (fără TVA) *
                  <input className={styles.input} type="number" min="0" step="0.01" value={form.valoare} onChange={(e) => setForm({ ...form, valoare: e.target.value })} placeholder="0.00" required />
                </label>
                <label className={styles.label}>
                  Cotă TVA
                  <select className={styles.input} value={form.cotaTVA} onChange={(e) => setForm({ ...form, cotaTVA: Number(e.target.value) })}>
                    {coteTV.map((c) => <option key={c.val} value={c.val}>{c.label}</option>)}
                  </select>
                </label>
              </div>
              {form.valoare && (
                <div className={styles.tvaPreview}>
                  TVA: <strong>{(parseFloat(form.valoare) * form.cotaTVA / 100).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei</strong>
                  &nbsp;· Total cu TVA: <strong>{(parseFloat(form.valoare) * (1 + form.cotaTVA / 100)).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei</strong>
                </div>
              )}
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Data emiterii
                  <input className={styles.input} type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
                </label>
                <label className={styles.label}>
                  Data scadenței
                  <input className={styles.input} type="date" value={form.scadenta} onChange={(e) => setForm({ ...form, scadenta: e.target.value })} />
                </label>
              </div>
              <label className={styles.label}>
                Descriere *
                <textarea className={`${styles.input} ${styles.textarea}`} value={form.descriere} onChange={(e) => setForm({ ...form, descriere: e.target.value })} placeholder="Ex: Servicii consultanță IT Martie 2026" required rows={3} />
              </label>
              <div className={styles.anafNote}>
                🔐 Factura va fi transmisă automat în e-Factura ANAF și validată în 5 zile lucrătoare.
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)}>Anulează</button>
                <button type="submit" className={styles.btnPrimary}>Emite și trimite la ANAF →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
