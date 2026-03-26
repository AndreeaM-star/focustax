"use client";

import Link from "next/link";
import styles from "./page.module.css";

const alerts = [
  {
    type: "success",
    icon: "✅",
    msg: "47 facturi validate de ANAF ieri — 0 erori, 0 respingeri",
    action: null,
  },
  {
    type: "info",
    icon: "💡",
    msg: "Am găsit un furnizor de curent electric cu 15% mai ieftin. Inițiez negocierea?",
    action: "Aprobă negocierea",
  },
  {
    type: "warning",
    icon: "⚠️",
    msg: "Risc depășire prag TVA în ~45 zile la ritmul actual — recomand înregistrare voluntară",
    action: "Înregistrează TVA",
  },
  {
    type: "success",
    icon: "🤖",
    msg: "D112 pregătit și gata de transmis. Salariile se procesează vineri automat.",
    action: null,
  },
];

const stats = [
  {
    label: "Sold Consolidat",
    value: "284.500 lei",
    meta: "BT: 145k · BCR: 92k · Revolut: 47.5k",
    icon: "🏦",
    trend: "+2.3%",
    up: true,
    href: "/manager/banci",
  },
  {
    label: "Facturi Emise (Mar)",
    value: "47 validate",
    meta: "31 primite · 0 erori · 0 restante",
    icon: "🧾",
    trend: "+8%",
    up: true,
    href: "/manager/facturi",
  },
  {
    label: "TVA Colectat (Mar)",
    value: "28.450 lei",
    meta: "Plată până pe 25 Apr · Prag: 300k/an",
    icon: "📊",
    trend: "+12%",
    up: true,
    href: "/manager/tva",
  },
  {
    label: "Profit Net (Mar)",
    value: "42.800 lei",
    meta: "Forecast Apr: ~48.000 lei",
    icon: "📈",
    trend: "+8%",
    up: true,
    href: null,
  },
];

const activities = [
  { time: "08:02", icon: "🧾", text: "Factura #F2026-0847 (3.200 lei) validată de ANAF", type: "success" },
  { time: "07:55", icon: "🏦", text: "Plată primită BT: 12.450 lei — reconciliată automat cu F2026-0839", type: "success" },
  { time: "07:30", icon: "📊", text: "Decontul TVA Februarie precomplet disponibil pe e-VAT", type: "info" },
  { time: "07:00", icon: "🤖", text: "Executive Summary generat și trimis pe email", type: "muted" },
  { time: "Ieri 22:14", icon: "🚛", text: "UIT-2026-4421 generat pentru transportul de mâine", type: "muted" },
  { time: "Ieri 18:30", icon: "📬", text: "Mesaj nou în SPV: Confirmare solicitare rambursare TVA", type: "info" },
  { time: "Ieri 15:10", icon: "👥", text: "Pontaj luna curentă procesat — 12 angajați, 0 absențe nemotivate", type: "success" },
  { time: "Ieri 09:00", icon: "💡", text: "Agent Achiziții: găsit furnizor curent 15% mai ieftin", type: "info" },
];

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
  { name: "SPV", status: "2 mesaje noi", dot: "amber" },
  { name: "Open Banking", status: "sincronizat", dot: "green" },
];

export default function Dashboard() {
  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageDate}>Joi, 26 Martie 2026 · 08:00</p>
          <h1 className={styles.pageTitle}>Bună dimineața, Demo SRL</h1>
        </div>
        <div className={styles.headerStatus}>
          <span className={styles.statusPulse} />
          <span className={styles.statusText}>Toate sistemele active</span>
        </div>
      </div>

      {/* Alerts / Briefing */}
      <div className={styles.briefingBox}>
        <div className={styles.briefingHeader}>
          <div className={styles.briefingDots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotAmber}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.briefingLabel}>Executive Summary · 26 Mar 2026</span>
          <span className={styles.briefingAI}>generat de ANA AI</span>
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
                <button className={styles.alertBtn}>{a.action}</button>
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
              <p>Întreabă orice despre firma ta sau Codul Fiscal</p>
            </div>
            <span className={styles.anaArrow}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
