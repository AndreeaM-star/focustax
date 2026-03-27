"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Company {
  id: string;
  nume: string;
  cui: string;
  forma_juridica: string;
  capital_social?: number;
  adresa?: string;
  telefon?: string;
  email?: string;
  banca_principala?: string;
  iban?: string;
  contact_nume?: string;
  contact_telefon?: string;
  contact_email?: string;
}

export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [form, setForm]       = useState<Partial<Company>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  useEffect(() => {
    const id = localStorage.getItem("focustax_company_id") ?? "";
    if (!id || id === "demo" || id === "temp") {
      window.location.replace("/manager/setup/");
      return;
    }

    fetch(`/api/companies/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCompany(data);
        setForm(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/companies/${company.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Update localStorage with new name/CUI
      localStorage.setItem("focustax_company_name", data.nume);
      localStorage.setItem("focustax_company_cui",  data.cui);

      setCompany(data);
      setSuccess("✅ Datele companiei au fost actualizate cu succes!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Eroare la salvare");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (!confirm("Deconectare din Manager? Vei putea reveni oricând cu aceleași date.")) return;
    localStorage.removeItem("focustax_company_id");
    localStorage.removeItem("focustax_company_name");
    localStorage.removeItem("focustax_company_cui");
    window.location.replace("/manager/setup/");
  };

  if (loading) return (
    <div className={styles.page}>
      <div className={styles.container}><div className={styles.loading}>Se încarcă datele companiei...</div></div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>⚙️ Setări Companie</h1>
          <p>Actualizează datele firmei tale. CUI-ul nu poate fi modificat după înregistrare.</p>
        </div>

        {error   && <div className={styles.error}>❌ {error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form className={styles.form} onSubmit={handleSave}>
          {/* Date companie */}
          <div className={styles.sectionTitle}>📋 Date Companie</div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Nume Companie *</label>
              <input name="nume" value={form.nume ?? ""} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label>CUI <span style={{ color: "#999", fontSize: "0.8em" }}>(nu se poate modifica)</span></label>
              <input value={company?.cui ?? ""} disabled style={{ opacity: 0.5 }} />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Forma Juridică</label>
              <select name="forma_juridica" value={form.forma_juridica ?? "SRL"} onChange={handleChange}>
                <option>SRL</option><option>SA</option><option>PFA</option><option>II</option><option>RA</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Capital Social (lei)</label>
              <input name="capital_social" type="number" value={form.capital_social ?? ""} onChange={handleChange} placeholder="ex: 10000" />
            </div>
          </div>
          <div className={`${styles.fieldGroup} ${styles.full}`}>
            <div className={styles.field}>
              <label>Adresă sediu social</label>
              <textarea name="adresa" value={form.adresa ?? ""} onChange={handleChange} placeholder="Str. Exemplu 1, Cluj-Napoca, jud. Cluj" />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Telefon</label>
              <input name="telefon" value={form.telefon ?? ""} onChange={handleChange} placeholder="+40 21 123 4567" />
            </div>
            <div className={styles.field}>
              <label>Email Companie</label>
              <input name="email" type="email" value={form.email ?? ""} onChange={handleChange} placeholder="contact@companie.ro" />
            </div>
          </div>

          {/* Banking */}
          <div className={styles.sectionTitle}>🏦 Conturi Bancare</div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Bancă Principală</label>
              <input name="banca_principala" value={form.banca_principala ?? ""} onChange={handleChange} placeholder="ex: Banca Transilvania" />
            </div>
            <div className={styles.field}>
              <label>IBAN Principal</label>
              <input name="iban" value={form.iban ?? ""} onChange={handleChange} placeholder="ROxx XXXX XXXX XXXX XXXX XXXX" />
            </div>
          </div>

          {/* Contact */}
          <div className={styles.sectionTitle}>👤 Persoană Contact</div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Nume</label>
              <input name="contact_nume" value={form.contact_nume ?? ""} onChange={handleChange} placeholder="Ion Manager" />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input name="contact_email" type="email" value={form.contact_email ?? ""} onChange={handleChange} placeholder="manager@companie.ro" />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Telefon</label>
              <input name="contact_telefon" value={form.contact_telefon ?? ""} onChange={handleChange} placeholder="+40 722 123 456" />
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary} disabled={saving}>
              {saving ? "Se salvează..." : "💾 Salvează modificările"}
            </button>
          </div>
        </form>

        {/* Danger zone */}
        <div className={styles.dangerZone}>
          <div className={styles.dangerTitle}>⚠️ Zonă periculoasă</div>
          <div className={styles.dangerRow}>
            <div>
              <strong>Deconectare din Manager</strong>
              <p>Te deconectezi din contul curent. Datele rămân în baza de date.</p>
            </div>
            <button className={styles.btnDanger} onClick={handleLogout}>Deconectare</button>
          </div>
        </div>
      </div>
    </div>
  );
}
