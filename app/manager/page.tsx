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

interface Tranzactie {
  id: string;
  tip: string;
  suma: number;
  data: string;
}

interface Company {
  id: string;
  nume: string;
  cui: string;
}

const quickActions = [
  { label: "Emite Factură", icon: "🧾", href: "/manager/facturi" },
  { label: "Calculează Salariu", icon: "👥", href: "/manager/hr" },
  { label: "Interoghează ANA", icon: "🤖", href: "/manager/ai" },
  { label: "Raport TVA", icon: "📊", href: "/manager/tva" },
  { label: "Conturi bancare", icon: "🏦", href: "/manager/banci" },
];

const anafSystems = [
  { name: "e-Factura", status: "activ", dot: "green" },
  { name: "e-VAT", status: "activ", dot: "green" },
  { name: "e-Transport", status: "activ", dot: "green" },
  { name: "SPV", status: "luat în considerare", dot: "amber" },
  { name: "Open Banking", status: "conectat", dot: "green" },
];

export default function Dashboard() {
  const [facturi, setFacturi] = useState<Factura[]>([]);
  const [angajati, setAngajati] = useState<Angajat[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = localStorage.getItem("focustax_company_id");
        const companyName = localStorage.getItem("focustax_company_name") || "";
        const companyCui = localStorage.getItem("focustax_company_cui") || "";

        if (!companyId) {
          window.location.href = "/manager/setup";
          return;
        }

        setCompany({
          id: companyId,
          nume: companyName || "Companie necunoscută",
          cui: companyCui || companyId,
        });

        const facturiRes = await fetch(`/api/facturi?company_id=${encodeURIComponent(companyId)}`);
        const facturiData = await facturiRes.json();
        setFacturi(Array.isArray(facturiData) ? facturiData.slice(0, 5) : []);

        const angajatiRes = await fetch(`/api/angajati?company_id=${encodeURIComponent(companyId)}`);
        const angajatiData = await angajatiRes.json();
        setAngajati(Array.isArray(angajatiData) ? angajatiData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const totalValoare = facturi.reduce((s, f) => s + f.valoare, 0);
  const totalTVA = facturi.reduce((s, f) => s + f.tva, 0);
  const validate = facturi.filter((f) => f.status === "validata").length;

  const stats = [
    {
      label: "Facturi Emise",
      value: `${facturi.length} documente`,
      meta: `${validate} validate`,
      icon: "🧾",
      trend: "+8%",
      up: true,
      href: "/manager/facturi",
    },
    {
      label: "TVA Total",
      value: `${totalTVA.toLocaleString()} lei`,
      meta: "Colectat în luna curentă",
      icon: "📊",
      trend: "+12%",
      up: true,
      href: "/manager/tva",
    },
    {
      label: "Angajati Activi",
      value: `${angajati.length} pers.`,
      meta: angajati.length > 0 ? `Salariu total: ${(angajati.reduce((s, a) => s + a.brut_lunar, 0)).toLocaleString()} lei` : "Adaugă angajați",
      icon: "👥",
      trend: "0%",
      up: false,
      href: "/manager/hr",
    },
    {
      label: "Venituri (Mar)",
      value: `${totalValoare.toLocaleString()} lei`,
      meta: "Total nefacturate",
      icon: "📈",
      trend: "+5%",
      up: true,
      href: null,
    },
  ];

  const alerts = [
    {
      type: "info",
      icon: "👋",
      msg: `Bine ai venit, ${company?.nume || "Manager"}! Configurația inițială e completă.`,
      action: null,
    },
    ...facturi.length === 0 ? [{
      type: "warning",
      icon: "💡",
      msg: "Nicio factură încă. Începe prin a emite prima factură.",
      action: "Emite factură",
    }] : [],
    {
      type: "info",
      icon: "🤖",
      msg: "ANA AI e gata să te ajute. Întreabă orice despre Codul Fiscal.",
      action: null,
    },
  ];

  const activities = [
    facturi[0] && {
      time: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
      icon: "🧾",
      text: `Ultimă factură: ${facturi[0]?.numar} (${facturi[0]?.valoare} lei)`,
      type: "success",
    },
    {
      time: "Setup completat",
      icon: "✅",
      text: "Compania ta a fost configurată cu succes!",
      type: "success",
    },
  ].filter(Boolean);

  if (loading) {
    return <div className={styles.page}>Se încarcă...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageDate}>{new Date().toLocaleDateString("ro-RO", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}</p>
          <h1 className={styles.pageTitle}>Bună, {company?.nume || "Manager"}</h1>
        </div>
        <div className={styles.headerStatus}>
          <span className={styles.statusPulse} />
          <span className={styles.statusText}>Sisteme active</span>
        </div>
      </div>

      {/* Alerts / Briefing */}
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
          {alerts.map((a, i) => (
            <div
              key={i}
              className={`${styles.alert} ${styles[`alert${a.type.charAt(0).toUpperCase() + a.type.slice(1)}`]}`}
            >
              <span className={styles.alertIcon}>{a.icon}</span>
              <span className={styles.alertMsg}>{a.msg}</span>
              {a.action && (
                <Link href="/manager/facturi" className={styles.alertBtn}>
                  {a.action}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={styles.statCard}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {s.href ? (
              <Link href={s.href} className={styles.statCardInner}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={`${styles.statTrend} ${s.up ? styles.trendUp : styles.trendDown}`}>
                    {s.trend}
                  </span>
                </div>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statMeta}>{s.meta}</span>
              </Link>
            ) : (
              <div className={styles.statCardInner}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={`${styles.statTrend} ${s.up ? styles.trendUp : styles.trendDown}`}>
                    {s.trend}
                  </span>
                </div>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statMeta}>{s.meta}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main content: activity + sidebar */}
      <div className={styles.mainGrid}>
        {/* Activity Feed */}
        <div className={styles.activitySection}>
          <h2 className={styles.sectionTitle}>Activitate recentă</h2>
          <div className={styles.activityList}>
            {activities.map((a, i) => (
              <div key={i} className={`${styles.activityItem} ${styles[`act${a.type.charAt(0).toUpperCase() + a.type.slice(1)}`]}`}>
                <span className={styles.activityTime}>{a.time}</span>
                <span className={styles.activityIcon}>{a.icon}</span>
                <span className={styles.activityText}>{a.text}</span>
              </div>
            ))}
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
            <Link href="/sisteme" className={styles.widgetLink}>
              Detalii sisteme →
            </Link>
          </div>

          {/* ANA hint */}
          <Link href="/manager/ai" className={styles.anaHint}>
            <span className={styles.anaHintIcon}>🤖</span>
            <div>
              <strong>ANA AI</strong>
              <p>Asistență din guri privind impozitare și legislație</p>
            </div>
            <span className={styles.anaArrow}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
