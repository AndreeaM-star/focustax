"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface FormData {
  // Company
  nume: string;
  cui: string;
  formaJuridica: string;
  capitalSocial: string;
  adresa: string;
  telefon: string;
  email: string;

  // Banking
  bancaPrincipala: string;
  iban: string;

  // Contact
  contactNume: string;
  contactTelefon: string;
  contactEmail: string;
}

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<FormData>({
    nume: "",
    cui: "",
    formaJuridica: "SRL",
    capitalSocial: "",
    adresa: "",
    telefon: "",
    email: "",
    bancaPrincipala: "",
    iban: "",
    contactNume: "",
    contactTelefon: "",
    contactEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.nume.trim() || !form.cui.trim()) {
      setError("Nume și CUI sunt obligatorii");
      return;
    }

    setLoading(true);

    try {
      // Create company
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nume: form.nume,
          cui: form.cui,
          forma_juridica: form.formaJuridica,
          capital_social: form.capitalSocial ? parseFloat(form.capitalSocial) : null,
          adresa: form.adresa,
          telefon: form.telefon,
          email: form.email,
          banca_principala: form.bancaPrincipala,
          iban: form.iban,
          contact_nume: form.contactNume,
          contact_telefon: form.contactTelefon,
          contact_email: form.contactEmail,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Eroare la crearea companiei");
      }

      const company = await res.json();

      // Save to localStorage to mark setup as complete
      localStorage.setItem("focustax_company_id", company.id);
      localStorage.setItem("focustax_company_name", company.nume);
      localStorage.setItem("focustax_company_cui", company.cui || form.cui);

      setSuccess("🎉 Companie configurată cu succes!");
      setTimeout(() => {
        router.push("/manager");
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Eroare necunoscută";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Setup placeholder, to be replaced later with real company info
    localStorage.setItem("focustax_company_id", "temp");
    localStorage.setItem("focustax_company_name", "Companie temporară");
    localStorage.setItem("focustax_company_cui", "")
    router.push("/manager");
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>Se salvează datele...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>⚙️ Configurare Inițială</h1>
          <p>
            Completează detaliile companiei tale pentru a începe. Poți actualiza datele
            oricând din setări.
          </p>
        </div>

        {error && <div className={styles.error}>❌ {error}</div>}
        {success && <div className={styles.success}>✅ {success}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Company Info */}
          <div>
            <div className={styles.sectionTitle}>📋 Date Companie</div>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Nume Companie *</label>
                <input type="text" name="nume" value={form.nume} onChange={handleChange} placeholder="ex: My SRL" required />
              </div>
              <div className={styles.field}>
                <label>CUI *</label>
                <input type="text" name="cui" value={form.cui} onChange={handleChange} placeholder="ex: RO12345678" required />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Forma Juridică</label>
                <select name="formaJuridica" value={form.formaJuridica} onChange={handleChange}>
                  <option>SRL</option>
                  <option>SA</option>
                  <option>PFA</option>
                  <option>II</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Capital Social</label>
                <input type="number" name="capitalSocial" value={form.capitalSocial} onChange={handleChange} placeholder="ex: 10000" />
              </div>
            </div>

            <div className={styles.fieldGroup + " " + styles.full}>
              <div className={styles.field}>
                <label>Adresa</label>
                <textarea name="adresa" value={form.adresa} onChange={handleChange} placeholder="Str. Exemplu 1, București" />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Telefon</label>
                <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} placeholder="ex: +40 21 123 4567" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ex: contact@companie.ro" />
              </div>
            </div>
          </div>

          {/* Banking */}
          <div>
            <div className={styles.sectionTitle}>🏦 Conturi Bancare</div>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Bancă Principală</label>
                <input type="text" name="bancaPrincipala" value={form.bancaPrincipala} onChange={handleChange} placeholder="ex: BT" />
              </div>
              <div className={styles.field}>
                <label>IBAN</label>
                <input type="text" name="iban" value={form.iban} onChange={handleChange} placeholder="ROxx XXXX XXXX XXXX XXXX XXXX" />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className={styles.sectionTitle}>👤 Contact Principal</div>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Nume Contact</label>
                <input type="text" name="contactNume" value={form.contactNume} onChange={handleChange} placeholder="ex: Ion Manager" />
              </div>
              <div className={styles.field}>
                <label>Email Contact</label>
                <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="ex: manager@companie.ro" />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Telefon Contact</label>
                <input type="tel" name="contactTelefon" value={form.contactTelefon} onChange={handleChange} placeholder="ex: +40 722 123 456" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? "Se salvează..." : "✓ Salvează & Continuă"}
            </button>
          </div>

          <div className={styles.skipText}>
            Vrei să incepi cu date demo?{" "}
            <span className={styles.skipLink} onClick={handleSkip}>
              Skip Setup
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
