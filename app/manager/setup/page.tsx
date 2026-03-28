"use client";

import { useState, useEffect } from "react";
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

const IBAN_REGEX = /^RO\d{2}[A-Z]{4}\d{16}$/;

export default function SetupPage() {
  const [loading, setLoading]       = useState(false);
  const [cuiLoading, setCuiLoading] = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");
  const [ibanError, setIbanError]   = useState("");
  const [tab, setTab]               = useState<"new" | "existing">("new");
  const [existingToken, setExistingToken] = useState("");
  const [existingLoading, setExistingLoading] = useState(false);
  const [existingError, setExistingError] = useState("");
  const [form, setForm] = useState<FormData>({
    nume: "", cui: "", formaJuridica: "SRL", capitalSocial: "",
    adresa: "", telefon: "", email: "",
    bancaPrincipala: "", iban: "",
    contactNume: "", contactTelefon: "", contactEmail: "",
  });

  // If valid session already exists, redirect to manager
  useEffect(() => {
    const token = localStorage.getItem("focustax_session_token");
    const companyId = localStorage.getItem("focustax_company_id");
    if (!token || !companyId) return;

    fetch(`/api/companies/${companyId}`, {
      headers: { "x-session-token": token },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.id && !data.error) {
          window.location.replace("/manager/");
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "iban" && value && !IBAN_REGEX.test(value.replace(/\s/g, ""))) {
      setIbanError("Format IBAN invalid. Exemplu: RO49BTRL0040008012345678");
    } else if (name === "iban") {
      setIbanError("");
    }
  };

  const lookupCUI = async () => {
    if (!form.cui.trim()) { setError("Introdu CUI-ul mai întâi"); return; }
    setCuiLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/anaf/company-lookup?cui=${form.cui.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "CUI negăsit");
      setForm((prev) => ({
        ...prev,
        nume: data.nume || prev.nume,
        adresa: data.adresa || prev.adresa,
      }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Eroare la căutare CUI");
    } finally {
      setCuiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.nume.trim()) { setError("Numele companiei este obligatoriu"); return; }
    if (!form.cui.trim())  { setError("CUI-ul este obligatoriu"); return; }
    if (form.iban && !IBAN_REGEX.test(form.iban.replace(/\s/g, ""))) {
      setError("IBAN invalid"); return;
    }

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
          iban:             form.iban.replace(/\s/g, ""),
          contact_nume:     form.contactNume,
          contact_telefon:  form.contactTelefon,
          contact_email:    form.contactEmail,
        }),
      });

      const company = await res.json();
      if (!res.ok) throw new Error(company.error || "Eroare la crearea companiei");

      localStorage.setItem("focustax_company_id",      company.id);
      localStorage.setItem("focustax_company_name",    company.nume);
      localStorage.setItem("focustax_company_cui",     company.cui);
      if (company.session_token) {
        localStorage.setItem("focustax_session_token", company.session_token);
      }

      setSuccess("🎉 Companie configurată cu succes! Se redirecționează...");
      setTimeout(() => { window.location.replace("/manager/"); }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută");
    } finally {
      setLoading(false);
    }
  };

  const handleExistingLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setExistingError("");
    if (!existingToken.trim()) { setExistingError("Introdu token-ul de sesiune"); return; }
    setExistingLoading(true);
    try {
      // Verify token by fetching sessions
      const res = await fetch("/api/sessions/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_token: existingToken.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.company_id) throw new Error(data.error || "Token invalid sau expirat");

      localStorage.setItem("focustax_company_id",      data.company_id);
      localStorage.setItem("focustax_company_name",    data.company_name ?? "");
      localStorage.setItem("focustax_company_cui",     data.company_cui ?? "");
      localStorage.setItem("focustax_session_token",   existingToken.trim());

      window.location.replace("/manager/");
    } catch (err: unknown) {
      setExistingError(err instanceof Error ? err.message : "Eroare");
    } finally {
      setExistingLoading(false);
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
          <p>Introdu datele firmei pentru a accesa dashboard-ul cu e-Factura, HR &amp; Salarii, e-VAT și ANA — asistentul AI fiscal.</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === "new" ? styles.tabActive : ""}`} onClick={() => setTab("new")} type="button">
            Firmă nouă
          </button>
          <button className={`${styles.tab} ${tab === "existing" ? styles.tabActive : ""}`} onClick={() => setTab("existing")} type="button">
            Am deja cont
          </button>
        </div>

        {tab === "existing" ? (
          <div className={styles.existingSection}>
            <p style={{ fontSize: "0.88rem", color: "#64748b", marginBottom: "1.25rem" }}>
              Introdu token-ul de sesiune primit la configurarea firmei pentru a accesa contul existent.
            </p>
            {existingError && <div className={styles.error}>❌ {existingError}</div>}
            <form onSubmit={handleExistingLogin} className={styles.form}>
              <div className={styles.field}>
                <label>Token de sesiune</label>
                <input
                  type="text"
                  value={existingToken}
                  onChange={(e) => setExistingToken(e.target.value)}
                  placeholder="ex: a1b2c3d4-e5f6-..."
                  autoFocus
                />
              </div>
              <div className={styles.actions}>
                <button type="submit" className={styles.btnPrimary} disabled={existingLoading}>
                  {existingLoading ? <><span className={styles.spinner} />Se verifică...</> : "Intră în Manager →"}
                </button>
              </div>
            </form>
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#9ca3af", marginTop: "1rem" }}>
              Nu ai token? <button onClick={() => setTab("new")} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Creează o firmă nouă</button>
            </p>
          </div>
        ) : (
          <>
            {error   && <div className={styles.error}>❌ {error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.sectionTitle}>📋 Date Companie</div>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label>CUI *</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input type="text" name="cui" value={form.cui} onChange={handleChange}
                      placeholder="ex: RO12345678" required style={{ flex: 1 }} />
                    <button type="button" onClick={lookupCUI} disabled={cuiLoading}
                      style={{ padding: "0.65rem 0.9rem", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, color: "#1d4ed8", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {cuiLoading ? "..." : "🔍 Caută"}
                    </button>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.2rem" }}>Completează CUI și apasă Caută pentru date automate din ANAF</span>
                </div>
                <div className={styles.field}>
                  <label>Nume Companie *</label>
                  <input type="text" name="nume" value={form.nume} onChange={handleChange}
                    placeholder="ex: Acme SRL" required autoFocus />
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
                  <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} placeholder="+40 21 123 4567" />
                </div>
                <div className={styles.field}>
                  <label>Email Companie</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="contact@companie.ro" />
                </div>
              </div>

              <div className={styles.sectionTitle}>🏦 Cont Bancar Principal</div>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label>Bancă</label>
                  <input type="text" name="bancaPrincipala" value={form.bancaPrincipala} onChange={handleChange} placeholder="ex: Banca Transilvania" />
                </div>
                <div className={styles.field}>
                  <label>IBAN</label>
                  <input type="text" name="iban" value={form.iban} onChange={handleChange}
                    placeholder="RO49 BTRL xxxx xxxx xxxx xxxx"
                    style={ibanError ? { borderColor: "#ef4444" } : {}} />
                  {ibanError && <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.2rem" }}>{ibanError}</span>}
                </div>
              </div>

              <div className={styles.sectionTitle}>👤 Persoană de Contact</div>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label>Nume</label>
                  <input type="text" name="contactNume" value={form.contactNume} onChange={handleChange} placeholder="Ion Manager" />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="manager@companie.ro" />
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label>Telefon</label>
                  <input type="tel" name="contactTelefon" value={form.contactTelefon} onChange={handleChange} placeholder="+40 722 123 456" />
                </div>
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.btnPrimary} disabled={loading}>
                  {loading ? <><span className={styles.spinner} />Se salvează...</> : "Intră în Manager →"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
