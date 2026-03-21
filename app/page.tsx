import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <span className={styles.pill}>GHID FISCAL ROMÂNIA</span>
          <h1 className={styles.heroTitle}>
            Taxele tale,
            <span className={styles.heroItalic}>Simplificate.</span>
          </h1>
          <p className={styles.heroText}>
            Înțelege ce declarații trebuie să depui și când.
            Gratuit, clar și construit pentru sistemul fiscal din România.
          </p>
          <div className={styles.heroCTA}>
            <Link href="/declaratii" className={styles.btnPrimary}>
              Vezi Declarațiile →
            </Link>
            <Link href="/calculator" className={styles.btnSecondary}>
              Calculator Taxe →
            </Link>
          </div>
          <span className={styles.noCost}>FĂRĂ CONT NECESAR</span>
        </section>

        <section className={styles.sistemFiscal}>
          <div className={styles.sistemFiscalInner}>
            <h2 className={styles.sistemTitlu}>Sistemul fiscal din România</h2>
            <p className={styles.sistemIntro}>
              România aplică un sistem fiscal mixt, cu impozitare atât la nivel de persoană fizică, cât și juridică.
              Principalele obligații fiscale sunt gestionate de ANAF (Agenția Națională de Administrare Fiscală).
            </p>
            <div className={styles.sistemGrid}>
              <div className={styles.sistemCard}>
                <div className={styles.sistemCardIcon}>💼</div>
                <h3>Impozit pe Venit</h3>
                <p>
                  Persoanele fizice plătesc 10% impozit pe venit din activități independente, chirii,
                  dividende și alte surse. Declarația Unică (D212) se depune anual până pe 25 mai.
                </p>
              </div>
              <div className={styles.sistemCard}>
                <div className={styles.sistemCardIcon}>🏢</div>
                <h3>Impozit pe Profit</h3>
                <p>
                  Societățile comerciale (SRL, SA) plătesc 16% impozit pe profit. Microîntreprinderile
                  pot opta pentru impozit pe cifra de afaceri de 1% sau 3%.
                </p>
              </div>
              <div className={styles.sistemCard}>
                <div className={styles.sistemCardIcon}>🧾</div>
                <h3>TVA</h3>
                <p>
                  Cota standard de TVA este 19%. Există cote reduse de 9% (alimente, medicamente,
                  turism) și 5% (cărți, locuințe sociale). Înregistrarea este obligatorie peste 300.000 lei.
                </p>
              </div>
              <div className={styles.sistemCard}>
                <div className={styles.sistemCardIcon}>🛡️</div>
                <h3>Contribuții Sociale</h3>
                <p>
                  CAS (pensii) — 25% și CASS (sănătate) — 10% se aplică veniturilor din muncă
                  și activități independente. PFA-urile le declară prin D212 și D112.
                </p>
              </div>
              <div className={styles.sistemCard}>
                <div className={styles.sistemCardIcon}>📅</div>
                <h3>Termene de Plată</h3>
                <p>
                  Obligațiile fiscale au termene stricte: lunar (TVA, salarii), trimestrial
                  (microîntreprinderi) sau anual (impozit profit, D212). Întârzierile atrag penalități.
                </p>
              </div>
              <div className={styles.sistemCard}>
                <div className={styles.sistemCardIcon}>⚖️</div>
                <h3>ANAF & Conformare</h3>
                <p>
                  ANAF administrează toate obligațiile fiscale. Declarațiile se depun online prin
                  SPV (Spațiul Privat Virtual) sau fizic la ghișeu. Neconformarea atrage amenzi și dobânzi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
