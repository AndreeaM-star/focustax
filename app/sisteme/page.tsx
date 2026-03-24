import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { sisteme } from "./[sistem]/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sisteme Informatice ANAF | FocusTax",
  description: "Ghid complet pentru sistemele informatice ANAF: e-Factura, SPV, RO e-TVA, RO e-Transport, One Stop Shop și altele.",
  openGraph: { title: "Sisteme ANAF 2026 | FocusTax", description: "Toate sistemele digitale ANAF explicate: ce sunt, cine e obligat, cum funcționează." },
};

export default function SistemePage() {
  const sistemeLista = Object.values(sisteme);
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.hero}>
          <span className={styles.heroIcon}>🖥️</span>
          <h1 className={styles.title}>Sisteme <span className={styles.titleAccent}>Informatice ANAF</span></h1>
          <p className={styles.subtitle}>Platformele digitale prin care interacționezi cu ANAF — de la e-Factura la SPV și RO e-Transport.</p>
        </div>
        <div className={styles.grid}>
          {sistemeLista.map((s, i) => (
            <Link key={s.id} href={`/sisteme/${s.id}`} className={styles.card} style={{ animationDelay: `${i * 80}ms` }}>
              <span className={styles.cardEmoji}>{s.emoji}</span>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitlu}>{s.titlu}</h2>
                <p className={styles.cardDesc}>{s.descriereScurta}</p>
                {s.obligatoriuDin && <span className={styles.cardBadge}>Obligatoriu din {s.obligatoriuDin}</span>}
              </div>
              <span className={styles.cardArrow}>→</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
