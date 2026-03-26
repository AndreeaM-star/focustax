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

const ANAF_AUTH_URL =
  `https://logincert.anaf.ro/anaf-oauth2/v1/authorize` +
  `?response_type=code` +
  `&client_id=3a0d365ab88e7f6c772fa28a9cdfbe217d354e0e366fc569` +
  `&redirect_uri=https%3A%2F%2Fwww.focustax.ro%2Fmanager%2F` +
  `&token_content_type=jwt`;

const quickActions = [
  { label: "Emite Factură",      icon: "🧾", href: "/manager/facturi" },
  { label: "Calculează Salariu", icon: "👥", href: "/manager/hr" },
  { label: "Interoghează ANA",   icon: "🤖", href: "/manager/ai" },
  { label: "Raport TVA",         icon: "📊", href: "/manager/tva" },
  { label: "Conturi bancare",    icon: "🏦", href: "/manager/banci" },
];

export default function Dashboard() {
  const [facturi, setFacturi] = useState<Factura[]>([]);
  const [angajati, setAngajati] = useState<Angajat[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [anafStatus, setAnafStatus] = useState<AnafStatus>({ connected: false });
  const [anafLoading, setAnafLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle ANAF OAuth callback — extract ?code= from URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      // Remove code from URL immediately
      window.history.replaceState({}, document.title, "/manager/");
      // Exchange code for token
      setAnafLoading(true);
      fetch("/api/anaf/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
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

    // Load company from localStorage
    const companyId   = localStorage.getItem("focustax_company_id");
    const companyName = localStorage.getItem("focustax_company_name") || "";
    const companyCui  = localStorage.getItem("focustax_company_cui") || "";

    const isDemo =
      !companyId ||
      companyId === "demo" ||
      companyId === "temp" ||
      companyName.toLowerCase().includes("demo");

    if (isDemo && !code) {
      localStorage.removeItem("focustax_company_id");
      localStorage.removeItem("focustax_company_name");
      localStorage.removeItem("focustax_company_cui");
      window.location.href = "/manager/setup";
      return;
    }

    setCompany({ id: companyId ?? "", nume: companyName || "Companie necunoscută", cui: companyCui });

    Promise.all([
      fetch(`/api/facturi?company_id=${companyId}`).then((r) => r.json()),
      fetch(`/api/angajati?company_id=${companyId}`).then((r) => r.json()),
      fetch("/api/anaf/exchange").then((r) => r.json()),
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
    await fetch("/api/anaf/exchange", { method: "DELETE" });
    setAnafStatus({ connected: false });
  };

  // Computed stats
  const totalValoare = facturi.reduce((s, f) => s + Number(f.valoare), 0);
  const totalTVA     = facturi.reduce((s, f) => s + Number(f.tva), 0);
  const validate     = facturi.filter((f) => f.status === "validata").length;

  const stats = [
    { label: "Facturi Emise",   value: `${facturi.length} doc.`,           meta: `${validate} validate`, icon: "🧾", trend: "+8%",  up: true,  href: "/manager/facturi" },
    { label: "TVA Total",       value: `${totalTVA.toLocaleString()} lei`,  meta: "Colectat luna curentă", icon: "📊", trend: "+12%", up: true,  href: "/manager/tva" },
    { label: "Angajați Activi", value: `${angajati.length} pers.`,
      meta: angajati.length > 0 ? `Fond brut: ${angajati.reduce((s, a) => s + a.brut_lunar, 0).toLocaleString()} lei` : "Adaugă angajați",
      icon: "👥", trend: "0%", up: false, href: "/manager/hr" },
    { label: "Venituri (Mar)",  value: `${totalValoare.toLocaleString()} lei`, meta: "Total facturi emise", icon: "📈", trend: "+5%",  up: true,  href: null },
  ];

  const anafSystems = [
    { name: "e-Factura",    status: anafStatus.connected ? "conectat" : "neconectat", dot: anafStatus.connected ? "green" : "amber" },
    { name: "e-VAT",        status: "activ",   dot: "green" },
    { name: "e-Transport",  status: "activ",   dot: "green" },
    { name: "SPV",          status: "în lucru", dot: "amber" },
    { name: "Open Banking", status: "conectat", dot: "green" },
  ];

  if (loading && !anafLoading) {
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
        <div className={styles.briefingBox} style={{ borderColor: "#f59e0b" }}>
          <div style={{ padding: "0.75rem 1rem", color: "#92400e" }}>
            ⏳ Se procesează autorizarea ANAF...
          </div>
        </div>
      )}
      {!anafLoading && !anafStatus.connected && (
        <div className={styles.briefingBox} style={{ borderColor: "#f59e0b" }}>
          <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.95rem" }}>
              🔐 <strong>Conectare ANAF</strong> — autorizează accesul la e-Factura, e-VAT și SPV
            </span>
            <a
              href={ANAF_AUTH_URL}
              className={styles.statusText}
              style={{ background: "#1d4ed8", color: "#fff", padding: "0.4rem 1rem", borderRadius: "6px", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}
            >
              Conectare ANAF →
            </a>
          </div>
        </div>
      )}
      {!anafLoading && anafStatus.connected && (
        <div className={styles.briefingBox} style={{ borderColor: "#22c55e" }}>
          <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.95rem" }}>
              ✅ <strong>ANAF conectat</strong>
              {anafStatus.cui && ` — CUI: ${anafStatus.cui}`}
              {anafStatus.expires_at && ` · Expiră: ${new Date(anafStatus.expires_at).toLocaleDateString("ro-RO")}`}
            </span>
            <button onClick={disconnectAnaf}
              style={{ background: "transparent", border: "1px solid #dc2626", color: "#dc2626", padding: "0.3rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}>
              Deconectare
            </button>
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
                  <span className={`${styles.statTrend} ${s.up ? styles.trendUp : styles.trendDown}`}>{s.trend}</span>
                </div>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statMeta}>{s.meta}</span>
              </Link>
            ) : (
              <div className={styles.statCardInner}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={`${styles.statTrend} ${s.up ? styles.trendUp : styles.trendDown}`}>{s.trend}</span>
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
              <a href={ANAF_AUTH_URL} className={styles.widgetLink}>
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
