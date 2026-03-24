import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sisteme, SISTEME_IDS } from "./data";
import styles from "./sistem.module.css";

export function generateStaticParams() {
  return SISTEME_IDS.map((sistem) => ({ sistem }));
}

export async function generateMetadata({ params }: { params: Promise<{ sistem: string }> }): Promise<Metadata> {
  const { sistem } = await params;
  const s = sisteme[sistem];
  if (!s) return { title: "Sistem ANAF | FocusTax" };
  return {
    title: `${s.titlu} — Sisteme ANAF | FocusTax`,
    description: s.descriereScurta,
  };
}

export default async function SistemPage({ params }: { params: Promise<{ sistem: string }> }) {
  const { sistem } = await params;
  const s = sisteme[sistem];
  if (!s) notFound();

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/sisteme" className={styles.breadcrumbLink}>Sisteme ANAF</a>
          <span className={styles.breadcrumbSep}>›</span>
          <span>{s.titlu}</span>
        </div>

        {/* Header */}
        <div className={styles.header} style={{ borderColor: s.culoare + "40" }}>
          <span className={styles.headerEmoji}>{s.emoji}</span>
          <div>
            <span className={styles.badge} style={{ background: s.culoare + "20", color: s.culoare, borderColor: s.culoare + "40" }}>{s.badge}</span>
            {s.obligatoriuDin && <span className={styles.obligatoriuBadge}>Obligatoriu din {s.obligatoriuDin}</span>}
            <h1 className={styles.title} style={{ color: s.culoare }}>{s.titlu}</h1>
            <p className={styles.subtitle}>{s.descriere}</p>
          </div>
        </div>

        {/* Cine e obligat */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👥 Cine este obligat</h2>
          <div className={styles.card}>
            <ul className={styles.lista}>
              {s.cineEObligat.map((item, i) => (
                <li key={i} className={styles.listaItem}>
                  <span className={styles.listaDot} style={{ background: s.culoare }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cum functioneaza */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>⚙️ Cum funcționează</h2>
          <div className={styles.pasiFlex}>
            {s.cumFunctioneaza.map((p, i) => (
              <div key={i} className={styles.pas}>
                <div className={styles.pasNum} style={{ background: s.culoare }}>{i + 1}</div>
                <div>
                  <strong className={styles.pasTitlu}>{p.pas}</strong>
                  <p className={styles.pasDesc}>{p.descriere}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📅 Istoric implementare</h2>
          <div className={styles.timeline}>
            {s.timeline.map((t, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineAn} style={{ background: s.culoare }}>{t.an}</div>
                <div className={styles.timelineEveniment}>{t.eveniment}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sanctiuni */}
        {s.sanctiuni && s.sanctiuni.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>⚠️ Sancțiuni</h2>
            <div className={styles.sanctiuniCard}>
              <ul className={styles.lista}>
                {s.sanctiuni.map((sanct, i) => (
                  <li key={i} className={styles.listaItem}>
                    <span className={styles.listaDot} style={{ background: "#dc2626" }}>!</span>
                    <span>{sanct}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Sfaturi */}
        {s.sfaturi && s.sfaturi.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>💡 Sfaturi practice</h2>
            <div className={styles.card}>
              <ul className={styles.lista}>
                {s.sfaturi.map((sf, i) => (
                  <li key={i} className={styles.listaItem}>
                    <span className={styles.listaDot} style={{ background: "#059669" }}>→</span>
                    <span>{sf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Linkuri oficiale */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🔗 Link-uri oficiale</h2>
          <div className={styles.linkuriGrid}>
            {s.linkuriOficiale.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                <span>{link.titlu}</span>
                <span className={styles.linkArrow}>↗</span>
              </a>
            ))}
          </div>
        </section>

        <a href="/sisteme" className={styles.backBtn}>← Înapoi la Sisteme ANAF</a>
      </main>
      <Footer />
    </>
  );
}
