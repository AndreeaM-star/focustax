import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPARATII } from "./[tip]/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Comparații Fiscale Europene | FocusTax",
  description:
    "Compară cotele de TVA, impozit pe venit, impozit pe profit și contribuții sociale din România cu restul Europei. Date actualizate cu grafice și analize.",
  keywords: ["comparatii fiscale", "tva europa", "impozit venit comparatie", "impozit profit europa", "contributii sociale"],
};

const CARDURI = [
  {
    id: "tva",
    culoare: "#2563eb",
    culoareBg: "rgba(37,99,235,0.15)",
    culoareBorder: "rgba(37,99,235,0.35)",
    culoareGlow: "rgba(37,99,235,0.25)",
  },
  {
    id: "impozit-venit",
    culoare: "#059669",
    culoareBg: "rgba(5,150,105,0.15)",
    culoareBorder: "rgba(5,150,105,0.35)",
    culoareGlow: "rgba(5,150,105,0.25)",
  },
  {
    id: "impozit-profit",
    culoare: "#7c3aed",
    culoareBg: "rgba(124,58,237,0.15)",
    culoareBorder: "rgba(124,58,237,0.35)",
    culoareGlow: "rgba(124,58,237,0.25)",
  },
  {
    id: "contributii-sociale",
    culoare: "#d97706",
    culoareBg: "rgba(217,119,6,0.15)",
    culoareBorder: "rgba(217,119,6,0.35)",
    culoareGlow: "rgba(217,119,6,0.25)",
  },
  {
    id: "dividende",
    culoare: "#dc2626",
    culoareBg: "rgba(220,38,38,0.15)",
    culoareBorder: "rgba(220,38,38,0.35)",
    culoareGlow: "rgba(220,38,38,0.25)",
  },
  {
    id: "prag-tva",
    culoare: "#059669",
    culoareBg: "rgba(5,150,105,0.15)",
    culoareBorder: "rgba(5,150,105,0.35)",
    culoareGlow: "rgba(5,150,105,0.25)",
  },
  {
    id: "impozit-avere",
    culoare: "#7c3aed",
    culoareBg: "rgba(124,58,237,0.15)",
    culoareBorder: "rgba(124,58,237,0.35)",
    culoareGlow: "rgba(124,58,237,0.25)",
  },
];

export default function ComparatiiPage() {
  return (
    <>
    <Navbar />
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroIcon}>🌍</span>
        <h1 className={styles.title}>
          Comparații <span className={styles.titleAccent}>Fiscale Europene</span>
        </h1>
        <p className={styles.subtitle}>
          Unde se situează România față de celelalte state europene? Explorează datele despre TVA, impozit pe venit, impozit pe profit și contribuții sociale.
        </p>
      </div>

      <div className={styles.grid}>
        {CARDURI.map((c, i) => {
          const tip = COMPARATII[c.id];
          const romania = tip.tari.find((t) => t.esteRomania);
          return (
            <Link
              key={c.id}
              href={`/comparatii/${c.id}`}
              className={styles.card}
              style={
                {
                  "--card-color": c.culoare,
                  "--card-bg": c.culoareBg,
                  "--card-border": c.culoareBorder,
                  "--card-glow": c.culoareGlow,
                  animationDelay: `${i * 100}ms`,
                } as React.CSSProperties
              }
            >
              <div className={styles.cardIcon}>{tip.emoji}</div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitlu} style={{ color: c.culoare }}>
                  {tip.titlu}
                </h2>
                <p className={styles.cardDescriere}>{tip.descriere}</p>
                <div className={styles.cardStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>România</span>
                    <span className={styles.statVal} style={{ color: c.culoare }}>
                      {romania?.cotaStandard}%
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Media EU</span>
                    <span className={styles.statVal}>{tip.mediuEuropean}%</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Țări</span>
                    <span className={styles.statVal}>{tip.tari.length}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardArrow} style={{ color: c.culoare }}>
                →
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Datele sunt actualizate pentru martie 2026. Cotele pot varia în funcție de regimul fiscal ales și de situația specifică a contribuabilului. Informații confirmate pe 25 martie 2026.
        </p>
      </div>
    </main>
    <Footer />
    </>
  );
}
