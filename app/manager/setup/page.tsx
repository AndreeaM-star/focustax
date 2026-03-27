"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface FormData {
  nume: string;
  cui: string;
  formaJuridica: string;
  capitalSocial: string;
  adresa: string;
  telefon: string;
  email: string;
  bancaPrincipala: string;
  iban: string;
  contactNume: string;
  contactTelefon: string;
  contactEmail: string;
}

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<FormData>({
    nume: "", cui: "", formaJuridica: "SRL", capitalSocial: "",
    adresa: "", telefon: "", email: "",
    bancaPrincipala: "", iban: "",
    contactNume: "", contactTelefon: "", contactEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.nume.trim()) { setError("Numele companiei este obligatoriu"); return; }
    if (!form.cui.trim())  { setError("CUI-ul este obligatoriu"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nume:             form.nume.trim(),
          cui:              form.cui.trim().toUpperCase(),
          forma_juridica:   form.formaJuridica,
          capital_social:   form.capitalSocial ? parseFloat(form.capitalSocial) : null,
          adresa:           form.adresa,
          telefon:          form.telefon,
          email:            form.email,
          banca_principala: form.bancaPrincipala,
          iban:             form.iban,
          contact_nume:     form.contactNume,
          contact_telefon:  form.contactTelefon,
          contact_email:    form.contactEmail,
        }),
      });

      const company = await res.json();
      if (!res.ok) throw new Error(company.error || "Eroare la crearea companiei");

      localStorage.setItem("focustax_company_id",   company.id);
      localStorage.setItem("focustax_company_name", company.nume);
      localStorage.setItem("focustax_company_cui",  company.cui);

      setSuccess("🎉 Companie configurată cu succes! Se redirecționează...");
      setTimeout(() => { window.location.replace("/manager/"); }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoRow}>
            <span className={styles.logoText}>Focus<span>Tax</span></span>
            <span className={styles.badge}>Manager</span>
          </div>
          <h1>Configurează firma ta</h1>
          <p>
            Introdu datele firmei pentru a accesa dashboard-ul cu e-Factura,
            HR &amp; Salarii, e-VAT și ANA — asistentul AI fiscal.
          </p>
        </div>

        {error   && <div className={styles.error}>❌ {error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Company Info */}
          <div className={styles.sectionTitle}>📋 Date Companie</div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Nume Companie *</label>
              <input type="text" name="nume" value={form.nume} onChange={handleChange}
                placeholder="ex: Acme SRL" required autoFocus />
            </div>
            <div className={styles.field}>
              <label>CUI *</label>
              <input type="text" name="cui" value={form.cui} onChange={handleChange}
                placeholder="ex: RO12345678" required />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Forma Juridică</label>
              <select name="formaJuridica" value={form.formaJuridica} onChange={handleChange}>
                <option>SRL</option><option>SA</option><option>PFA</option><option>II</option><option>RA</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Capital Social (lei)</label>
              <input type="number" name="capitalSocial" value={form.capitalSocial} onChange={handleChange}
                placeholder="ex: 10000" min="0" />
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.full}`}>
            <div className={styles.field}>
              <label>Adresă Sediu Social</label>
              <textarea name="adresa" value={form.adresa} onChange={handleChange}
                placeholder="Str. Exemplu 1, Cluj-Napoca, jud. Cluj" />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Telefon</label>
              <input type="tel" name="telefon" value={form.telefon} onChange={handleChange}
                placeholder="+40 21 123 4567" />
            </div>
            <div className={styles.field}>
              <label>Email Companie</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="contact@companie.ro" />
            </div>
          </div>

          {/* Banking */}
          <div className={styles.sectionTitle}>🏦 Cont Bancar Principal</div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Bancă</label>
              <input type="text" name="bancaPrincipala" value={form.bancaPrincipala} onChange={handleChange}
                placeholder="ex: Banca Transilvania" />
            </div>
            <div className={styles.field}>
              <label>IBAN</label>
              <input type="text" name="iban" value={form.iban} onChange={handleChange}
                placeholder="RO49 BTRL xxxx xxxx xxxx xxxx" />
            </div>
          </div>

          {/* Contact */}
          <div className={styles.sectionTitle}>👤 Persoană de Contact</div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Nume</label>
              <input type="text" name="contactNume" value={form.contactNume} onChange={handleChange}
                placeholder="Ion Manager" />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange}
                placeholder="manager@companie.ro" />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Telefon</label>
              <input type="tel" name="contactTelefon" value={form.contactTelefon} onChange={handleChange}
                placeholder="+40 722 123 456" />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  Se salvează...
                </>
              ) : (
                "Intră în Manager →"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
