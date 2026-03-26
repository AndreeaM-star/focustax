"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

type Status = "validata" | "in_asteptare" | "respinsa" | "draft";

interface Factura {
  id: string;
  numar: string;
  client: string;
  cuiClient: string;
  valoare: number;
  tva: number;
  data: string;
  scadenta: string;
  status: Status;
  descriere: string;
}

const seed: Factura[] = [
  { id: "1", numar: "F2026-0847", client: "Alpha Tech SRL", cuiClient: "RO44556677", valoare: 3200, tva: 608, data: "2026-03-26", scadenta: "2026-04-25", status: "validata", descriere: "Servicii consultanță IT" },
  { id: "2", numar: "F2026-0846", client: "Beta Construct SA", cuiClient: "RO11223344", valoare: 12450, tva: 2365.5, data: "2026-03-25", scadenta: "2026-04-24", status: "validata", descriere: "Materiale construcții" },
  { id: "3", numar: "F2026-0845", client: "Gamma Logistic SRL", cuiClient: "RO88990011", valoare: 5800, tva: 1102, data: "2026-03-24", scadenta: "2026-04-23", status: "in_asteptare", descriere: "Transport marfă" },
  { id: "4", numar: "F2026-0844", client: "Delta Food SRL", cuiClient: "RO22334455", valoare: 940, tva: 84.6, data: "2026-03-23", scadenta: "2026-04-22", status: "in_asteptare", descriere: "Produse alimentare (TVA 9%)" },
  { id: "5", numar: "F2026-0843", client: "Epsilon Media SRL", cuiClient: "RO66778899", valoare: 2100, tva: 399, data: "2026-03-22", scadenta: "2026-04-21", status: "respinsa", descriere: "Servicii publicitate" },
];

const statusConfig: Record<Status, { label: string; color: string }> = {
  validata:      { label: "Validată ANAF", color: "green" },
  in_asteptare:  { label: "În așteptare", color: "amber" },
  respinsa:      { label: "Respinsă", color: "red" },
  draft:         { label: "Draft", color: "gray" },
};

const coteTV = [{ label: "19% standard", val: 19 }, { label: "9% redusă (alim.)", val: 9 }, { label: "5% redusă (cărți)", val: 5 }];

function useInvoices() {
  const [facturi, setFacturi] = useState<Factura[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ft_facturi");
      if (saved) setFacturi(JSON.parse(saved));
      else setFacturi(seed);
    } catch {
      setFacturi(seed);
    }
  }, []);

  const save = (list: Factura[]) => {
    setFacturi(list);
    localStorage.setItem("ft_facturi", JSON.stringify(list));
  };

  const add = (f: Omit<Factura, "id" | "numar" | "status">) => {
    const nextNum = (facturi.length + 848).toString().padStart(4, "0");
    const newF: Factura = {
      ...f,
      id: Date.now().toString(),
      numar: `F2026-${nextNum}`,
      status: "in_asteptare",
    };
    const next = [newF, ...facturi];
    save(next);
    // Simulate ANAF validation after 3 seconds
    setTimeout(() => {
      setFacturi((prev) => {
        const updated = prev.map((x) =>
          x.id === newF.id ? { ...x, status: "validata" as Status } : x
        );
        localStorage.setItem("ft_facturi", JSON.stringify(updated));
        return updated;
      });
    }, 3000);
    return newF;
  };

  const remove = (id: string) => save(facturi.filter((f) => f.id !== id));

  return { facturi, add, remove };
}

const emptyForm = {
  client: "",
  cuiClient: "",
  valoare: "",
  cotaTVA: 19,
  data: new Date().toISOString().slice(0, 10),
  scadenta: "",
  descriere: "",
};

export default function FacturiPage() {
  const { facturi, add, remove } = useInvoices();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filterStatus, setFilterStatus] = useState<Status | "toate">("toate");
  const [newlyAdded, setNewlyAdded] = useState<string | null>(null);

  const totalValoare = facturi.reduce((s, f) => s + f.valoare, 0);
  const totalTVA     = facturi.reduce((s, f) => s + f.tva, 0);
  const validate     = facturi.filter((f) => f.status === "validata").length;

  const filtered = filterStatus === "toate"
    ? facturi
    : facturi.filter((f) => f.status === filterStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(form.valoare) || 0;
    const tva = val * (form.cotaTVA / 100);
    const scadenta = form.scadenta || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const nf = add({
      client: form.client,
      cuiClient: form.cuiClient,
      valoare: val,
      tva,
      data: form.data,
      scadenta,
      descriere: form.descriere,
    });
    setNewlyAdded(nf.id);
    setShowForm(false);
    setForm(emptyForm);
    setTimeout(() => setNewlyAdded(null), 4000);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>e-Factura</h1>
          <p className={styles.pageSubtitle}>Emite, transmite și urmărește facturile — ANAF validare automată</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>
          + Factură nouă
        </button>
      </div>

      {/* Notification strip */}
      {newlyAdded && (
        <div className={styles.notif}>
          ⏳ Factură trimisă la ANAF — validare în curs... Vei vedea statusul actualizat în câteva secunde.
        </div>
      )}

      {/* Summary stats */}
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
          <span className={styles.summaryNum}>
            {totalValoare.toLocaleString("ro-RO", { maximumFractionDigits: 0 })} lei
          </span>
          <span className={styles.summaryLabel}>Valoare totală</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryNum}>
            {totalTVA.toLocaleString("ro-RO", { maximumFractionDigits: 0 })} lei
          </span>
          <span className={styles.summaryLabel}>TVA total</span>
        </div>
      </div>

      {/* Filter */}
      <div className={styles.filterRow}>
        {(["toate", "validata", "in_asteptare", "respinsa", "draft"] as const).map((s) => (
          <button
            key={s}
            className={`${styles.filterBtn} ${filterStatus === s ? styles.filterBtnActive : ""}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === "toate" ? "Toate" : statusConfig[s]?.label || s}
          </button>
        ))}
      </div>

      {/* Invoice list */}
      <div className={styles.invoiceList}>
        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            <span>📄</span>
            <p>Nicio factură în această categorie.</p>
          </div>
        )}
        {filtered.map((f) => {
          const sc = statusConfig[f.status];
          const isNew = f.id === newlyAdded;
          return (
            <div
              key={f.id}
              className={`${styles.invoiceCard} ${isNew ? styles.invoiceCardNew : ""}`}
            >
              <div className={styles.invoiceTop}>
                <div>
                  <span className={styles.invoiceNum}>{f.numar}</span>
                  <span className={`${styles.statusBadge} ${styles[`status_${sc.color}`]}`}>
                    {isNew && f.status === "in_asteptare" ? "⏳ Validare ANAF..." : sc.label}
                  </span>
                </div>
                <div className={styles.invoiceValue}>
                  <span className={styles.invoiceAmount}>
                    {f.valoare.toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei
                  </span>
                  <span className={styles.invoiceTVA}>
                    + {f.tva.toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei TVA
                  </span>
                </div>
              </div>
              <div className={styles.invoiceDetails}>
                <span className={styles.invoiceClient}>🏢 {f.client}</span>
                <span className={styles.invoiceCUI}>CUI: {f.cuiClient}</span>
              </div>
              <div className={styles.invoiceDesc}>{f.descriere}</div>
              <div className={styles.invoiceFooter}>
                <span>📅 Emisă: {f.data}</span>
                <span>⏱ Scadentă: {f.scadenta}</span>
                <button
                  className={styles.deleteBtn}
                  onClick={() => remove(f.id)}
                  title="Șterge factura"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New invoice modal */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Factură nouă</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Client *
                  <input
                    className={styles.input}
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="Numele firmei cliente"
                    required
                  />
                </label>
                <label className={styles.label}>
                  CUI Client
                  <input
                    className={styles.input}
                    value={form.cuiClient}
                    onChange={(e) => setForm({ ...form, cuiClient: e.target.value })}
                    placeholder="RO12345678"
                  />
                </label>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Valoare (fără TVA) *
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.valoare}
                    onChange={(e) => setForm({ ...form, valoare: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </label>
                <label className={styles.label}>
                  Cotă TVA
                  <select
                    className={styles.input}
                    value={form.cotaTVA}
                    onChange={(e) => setForm({ ...form, cotaTVA: Number(e.target.value) })}
                  >
                    {coteTV.map((c) => (
                      <option key={c.val} value={c.val}>{c.label}</option>
                    ))}
                  </select>
                </label>
              </div>
              {form.valoare && (
                <div className={styles.tvaPreview}>
                  TVA calculat: <strong>
                    {(parseFloat(form.valoare) * form.cotaTVA / 100).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei
                  </strong>
                  &nbsp;· Total cu TVA: <strong>
                    {(parseFloat(form.valoare) * (1 + form.cotaTVA / 100)).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} lei
                  </strong>
                </div>
              )}
              <div className={styles.formRow}>
                <label className={styles.label}>
                  Data emiterii
                  <input
                    className={styles.input}
                    type="date"
                    value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })}
                  />
                </label>
                <label className={styles.label}>
                  Data scadenței
                  <input
                    className={styles.input}
                    type="date"
                    value={form.scadenta}
                    onChange={(e) => setForm({ ...form, scadenta: e.target.value })}
                  />
                </label>
              </div>
              <label className={styles.label}>
                Descriere servicii/produse *
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={form.descriere}
                  onChange={(e) => setForm({ ...form, descriere: e.target.value })}
                  placeholder="Ex: Servicii consultanță IT lunile Martie 2026"
                  required
                  rows={3}
                />
              </label>
              <div className={styles.anafNote}>
                🔐 Factura va fi transmisă automat în sistemul e-Factura ANAF și validată în 5 zile lucrătoare.
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)}>
                  Anulează
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  Emite și trimite la ANAF →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
