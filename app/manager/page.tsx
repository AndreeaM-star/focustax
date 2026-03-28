"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Factura {
  id: string;
  numar: string;
  client: string;
  valoare: number;
  tva: number;
  data: string;
  status: string;
}

interface Angajat {
  id: string;
  nume: string;
  brut_lunar: number;
  pontaj: number;
}

interface Company {
  id: string;
  nume: string;
  cui: string;
}

interface AnafStatus {
  connected: boolean;
  expires_at?: string;
  cui?: string;
}

const ANAF_BASE_URL =
  `https://logincert.anaf.ro/anaf-oauth2/v1/authorize` +
  `?response_type=code` +
  `&client_id=ea20061fb8e2ee3ef2d1d2e058dbbe217d354e0e1ac8c669` +
  `&redirect_uri=https%3A%2F%2Fwww.focustax.ro%2Fmanager%2F` +
  `&token_content_type=jwt`;

const quickActions = [
  { label: "Emite Factură",      icon: "🧾", href: "/manager/facturi" },
  { label: "Calculează Salariu", icon: "👥", href: "/manager/hr" },
  { label: "Întreabă ANA",       icon: "🤖", href: "/manager/ai" },
  { label: "Raport TVA",         icon: "📊", href: "/manager/tva" },
  { label: "Conturi bancare",    icon: "🏦", href: "/manager/banci" },
];

export default function Dashboard() {
  const [facturi, setFacturi] = useState<Factura[]>([]);
  const [angajati, setAngajati] = useState<Angajat[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [anafStatus, setAnafStatus] = useState<AnafStatus>({ connected: false });
  const [anafLoading, setAnafLoading] = useState(false);
  const [anafDenied, setAnafDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [anafAuthUrl, setAnafAuthUrl] = useState(ANAF_BASE_URL);

  useEffect(() => {
    // Handle ANAF OAuth callback — extract ?code= or ?error= from URL
    const params = new URLSearchParams(window.location.search);
    const code  = params.get("code");
    const oauthError = params.get("error");

    // Always clean URL params
    if (code || oauthError) {
      window.history.replaceState({}, document.title, "/manager/");
    }

    if (oauthError) {
      setAnafStatus({ connected: false });
      if (oauthError === "access_denied") setAnafDenied(true);
    }

    // Load company from localStorage (ManagerShell already verified it)
    const companyId   = localStorage.getItem("focustax_company_id") ?? "";
    const companyName = localStorage.getItem("focustax_company_name") ?? "";
    const companyCui  = localStorage.getItem("focustax_company_cui") ?? "";
    const sessionToken = localStorage.getItem("focustax_session_token") ?? "";

    if (!companyId && !code) {
      window.location.replace("/manager/setup/");
      return;
    }

    setCompany({ id: companyId, nume: companyName || "Companie necunoscută", cui: companyCui });

    // Compute ANAF auth URL with state param containing companyId
    if (companyId) {
      const stateParam = btoa(JSON.stringify({ cid: companyId }));
      setAnafAuthUrl(`${ANAF_BASE_URL}&state=${encodeURIComponent(stateParam)}`);
    }

    const authHeaders: Record<string, string> = {};
    if (sessionToken) authHeaders["x-session-token"] = sessionToken;

    if (code) {
      // Exchange code for token
      setAnafLoading(true);
      fetch("/api/anaf/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ code, companyId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.ok) {
            setAnafStatus({ connected: true, expires_at: data.expiresAt, cui: data.cui });
          }
        })
        .catch(console.error)
        .finally(() => setAnafLoading(false));
    }

    Promise.all([
      fetch("/api/facturi", { headers: authHeaders }).then((r) => r.json()),
      fetch("/api/angajati", { headers: authHeaders }).then((r) => r.json()),
      fetch("/api/anaf/exchange", { headers: authHeaders }).then((r) => r.json()),
    ])
      .then(([f, a, anaf]) => {
        setFacturi(Array.isArray(f) ? f.slice(0, 5) : []);
        setAngajati(Array.isArray(a) ? a : []);
        setAnafStatus(anaf);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const disconnectAnaf = async () => {
    if (!confirm("Deconectezi ANAF? Vei pierde accesul la e-Factura până la reconectare.")) return;
    const sessionToken = localStorage.getItem("focustax_session_token") ?? "";
    const authHeaders: Record<string, string> = {};
    if (sessionToken) authHeaders["x-session-token"] = sessionToken;
    await fetch("/api/anaf/exchange", { method: "DELETE", headers: authHeaders });
    setAnafStatus({ connected: false });
  };

  // Computed stats
  const currMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const lunaLabel = new Date().toLocaleString("ro-RO", { month: "short" });
  const lunaDisplay = lunaLabel.charAt(0).toUpperCase() + lunaLabel.slice(1);

  const facturiCurr = facturi.filter((f) => f.data?.startsWith(currMonth));
  const totalValoare = facturiCurr.reduce((s, f) => s + Number(f.valoare), 0);
  const totalTVA     = facturiCurr.reduce((s, f) => s + Number(f.tva), 0);
  const validate     = facturi.filter((f) => f.status === "validata").length;

  const stats = [
    { label: "Facturi Emise",          value: `${facturi.length} doc.`,           meta: `${validate} validate`, icon: "🧾", href: "/manager/facturi" },
    { label: "TVA Colectat",           value: `${totalTVA.toLocaleString()} lei`,  meta: "Luna curentă", icon: "📊", href: "/manager/tva" },
    { label: "Angajați Activi",        value: `${angajati.length} pers.`,
      meta: angajati.length > 0 ? `Fond brut: ${angajati.reduce((s, a) => s + a.brut_lunar, 0).toLocaleString()} lei` : "Adaugă angajați",
      icon: "👥", href: "/manager/hr" },
    { label: `Venituri (${lunaDisplay})`, value: `${totalValoare.toLocaleString()} lei`, meta: "Fără TVA, luna curentă", icon: "📈", href: null },
  ];

  const anafSystems = [
    { name: "e-Factura",    status: anafStatus.connected ? "conectat" : "neconectat", dot: anafStatus.connected ? "green" : "amber" },
    { name: "e-VAT",        status: anafStatus.connected ? "conectat" : "neconfigurat", dot: anafStatus.connected ? "green" : "amber" },
    { name: "e-Transport",  status: anafStatus.connected ? "conectat" : "neconfigurat", dot: anafStatus.connected ? "green" : "amber" },
    { name: "SPV",          status: anafStatus.connected ? "conectat" : "neconfigurat", dot: anafStatus.connected ? "green" : "amber" },
    { name: "Open Banking", status: "neconfigurat", dot: "amber" },
  ];

  if (loading) {
    return <div className={styles.page}>Se încarcă...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageDate}>
            {new Date().toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            {new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <h1 className={styles.pageTitle}>Bună, {company?.nume || "Manager"}</h1>
        </div>
        <div className={styles.headerStatus}>
          <span className={styles.statusPulse} />
          <span className={styles.statusText}>Sisteme active</span>
        </div>
      </div>

      {/* ANAF OAuth banner */}
      {anafLoading && (
        <div className={styles.anafCard} style={{ borderColor: "#f59e0b", background: "rgba(251,191,36,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#92400e", padding: "0.25rem 0" }}>
            <span style={{ fontSize: "1.3rem" }}>⏳</span>
            <div>
              <div style={{ fontWeight: 600 }}>Se procesează autorizarea ANAF...</div>
              <div style={{ fontSize: "0.82rem", opacity: 0.75, marginTop: "0.15rem" }}>Așteptați, schimbăm codul de autorizare cu token de acces.</div>
            </div>
          </div>
        </div>
      )}

      {!anafLoading && anafStatus.connected && (
        <div className={styles.anafCard} style={{ borderColor: "#22c55e", background: "rgba(34,197,94,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
            <span style={{ fontSize: "1.5rem" }}>✅</span>
            <div>
              <div style={{ fontWeight: 700, color: "#15803d" }}>ANAF conectat</div>
              <div style={{ fontSize: "0.82rem", color: "#166534", marginTop: "0.15rem" }}>
                {anafStatus.cui && `CUI: ${anafStatus.cui} · `}
                {anafStatus.expires_at
                  ? `Token valabil până la ${new Date(anafStatus.expires_at).toLocaleDateString("ro-RO")}`
                  : "e-Factura, e-VAT și SPV active"}
              </div>
            </div>
          </div>
          <button onClick={disconnectAnaf}
            style={{ background: "transparent", border: "1px solid #dc2626", color: "#dc2626", padding: "0.35rem 0.9rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, flexShrink: 0 }}>
            Deconectare
          </button>
        </div>
      )}

      {!anafLoading && !anafStatus.connected && (
        <div className={styles.anafCard} style={{ borderColor: anafDenied ? "#f97316" : "#3b82f6", background: anafDenied ? "rgba(249,115,22,0.05)" : "rgba(59,130,246,0.05)", flexDirection: "column", alignItems: "stretch", gap: "1rem" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{anafDenied ? "⚠️" : "🔐"}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: anafDenied ? "#c2410c" : "#1e40af" }}>
                  {anafDenied ? "Autorizare refuzată — verifică pașii de mai jos" : "Conectează-te la ANAF"}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.1rem" }}>
                  {anafDenied ? "ANAF necesită un certificat digital calificat (token USB)" : "Accesează e-Factura, e-VAT și SPV — durează 30 de secunde"}
                </div>
              </div>
            </div>
            <a href={anafAuthUrl}
              style={{ background: anafDenied ? "#ea580c" : "#1d4ed8", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", whiteSpace: "nowrap", flexShrink: 0 }}>
              {anafDenied ? "Încearcă din nou →" : "Conectare ANAF →"}
            </a>
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {(anafDenied ? [
              { num: "1", icon: "🔌", title: "Verifică tokenul USB", desc: "Asigură-te că tokenul cu certificatul e conectat fizic la PC" },
              { num: "2", icon: "💻", title: "Software token deschis", desc: "SafeNet / eToken trebuie să ruleze în system tray (colț dreapta-jos)" },
              { num: "3", icon: "🦊", title: "Folosește Firefox", desc: "Chrome nu recunoaște întotdeauna certificatele românești — Firefox e mai sigur" },
            ] : [
              { num: "1", icon: "🔌", title: "Conectează tokenul USB", desc: "Tokenul cu certificatul digital trebuie pluguit la PC" },
              { num: "2", icon: "🦊", title: "Deschide în Firefox", desc: "Firefox are compatibilitate maximă cu certificatele românești" },
              { num: "3", icon: "✅", title: "Autorizare automată", desc: "Click pe buton → selectezi certificatul la ANAF → gata, revii în dashboard" },
            ]).map((step) => (
              <div key={step.num} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", gap: "0.75rem", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.8)" }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{step.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: "0.2rem" }}>{step.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ fontSize: "0.78rem", color: "#9ca3af", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "0.75rem" }}>
            Nu ai certificat digital? Obține unul de la{" "}
            <a href="https://www.certsign.ro" target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontWeight: 600 }}>certSIGN</a>
            {" "}sau{" "}
            <a href="https://www.digisign.ro" target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontWeight: 600 }}>DigiSign</a>
            {" "}(~50–70 EUR/an, obligatoriu oricum pentru e-Factura în România).
          </div>
        </div>
      )}

      {/* Briefing / status */}
      <div className={styles.briefingBox}>
        <div className={styles.briefingHeader}>
          <div className={styles.briefingDots}>
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.briefingLabel}>Status Companie</span>
          <span className={styles.briefingAI}>configurat</span>
        </div>
        <div className={styles.alertsList}>
          <div className={`${styles.alert} ${styles.alertInfo}`}>
            <span className={styles.alertIcon}>👋</span>
            <span className={styles.alertMsg}>
              Bine ai venit, <strong>{company?.nume || "Manager"}</strong>! Platforma este activă.
            </span>
          </div>
          {facturi.length === 0 && (
            <div className={`${styles.alert} ${styles.alertWarning}`}>
              <span className={styles.alertIcon}>💡</span>
              <span className={styles.alertMsg}>Nicio factură încă. Emite prima factură acum.</span>
              <Link href="/manager/facturi" className={styles.alertBtn}>Emite factură</Link>
            </div>
          )}
          <div className={`${styles.alert} ${styles.alertInfo}`}>
            <span className={styles.alertIcon}>🤖</span>
            <span className={styles.alertMsg}>ANA AI e gata — întreabă orice despre Codul Fiscal.</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={s.label} className={styles.statCard} style={{ animationDelay: `${i * 60}ms` }}>
            {s.href ? (
              <Link href={s.href} className={styles.statCardInner}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon}>{s.icon}</span>
                </div>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statMeta}>{s.meta}</span>
              </Link>
            ) : (
              <div className={styles.statCardInner}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon}>{s.icon}</span>
                </div>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statMeta}>{s.meta}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Activity + sidebar */}
      <div className={styles.mainGrid}>
        {/* Activity Feed */}
        <div className={styles.activitySection}>
          <h2 className={styles.sectionTitle}>Activitate recentă</h2>
          <div className={styles.activityList}>
            {facturi.slice(0, 4).map((f) => (
              <div key={f.id} className={`${styles.activityItem} ${styles.actSuccess}`}>
                <span className={styles.activityTime}>{f.data}</span>
                <span className={styles.activityIcon}>🧾</span>
                <span className={styles.activityText}>
                  {f.numar} · {f.client} · {Number(f.valoare).toLocaleString()} lei
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", opacity: 0.7 }}>
                    [{f.status === "validata" ? "✓ validată" : f.status === "in_asteptare" ? "⏳" : "✗"}]
                  </span>
                </span>
              </div>
            ))}
            {facturi.length === 0 && (
              <div className={styles.activityItem}>
                <span className={styles.activityText} style={{ opacity: 0.6 }}>Nicio activitate încă.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          {/* Quick Actions */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Acțiuni rapide</h3>
            <div className={styles.quickActions}>
              {quickActions.map((q) => (
                <Link key={q.label} href={q.href} className={styles.quickAction}>
                  <span>{q.icon}</span>
                  <span>{q.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ANAF Systems status */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Status Sisteme ANAF</h3>
            <div className={styles.systemsList}>
              {anafSystems.map((s) => (
                <div key={s.name} className={styles.systemRow}>
                  <span className={styles.systemName}>{s.name}</span>
                  <div className={styles.systemStatus}>
                    <span className={`${styles.systemDot} ${styles[`dot${s.dot.charAt(0).toUpperCase() + s.dot.slice(1)}`]}`} />
                    <span className={styles.systemStatusText}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
            {!anafStatus.connected && (
              <a href={anafAuthUrl} className={styles.widgetLink}>
                Conectare ANAF →
              </a>
            )}
          </div>

          {/* ANA hint */}
          <Link href="/manager/ai" className={styles.anaHint}>
            <span className={styles.anaHintIcon}>🤖</span>
            <div>
              <strong>ANA AI</strong>
              <p>Asistență privind impozitare și legislație</p>
            </div>
            <span className={styles.anaArrow}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
