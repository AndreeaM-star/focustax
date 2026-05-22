import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.separator} aria-hidden />
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.colBrand}>
            <span className={styles.logo}>Focus<span className={styles.logoAccent}>Tax</span></span>
            <p className={styles.desc}>
              Ghid complet al sistemului fiscal din România. Calculatoare, ghiduri și termene. Gratuit, clar, actualizat 2026.
            </p>
            <div className={styles.socialRow}>
              <a href="mailto:focustaxro@gmail.com" className={styles.socialBtn} aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Calculatoare</h4>
            <nav className={styles.links}>
              <Link href="/calculator">Calculator salariu</Link>
              <Link href="/calculator?tab=pfa">Calculator PFA</Link>
              <Link href="/calculator?tab=firma">Calculator SRL</Link>
              <Link href="/calculator?tab=crypto">Crypto & Investiții</Link>
              <Link href="/calculator/forme-juridice">Compară forme juridice</Link>
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Ghiduri & Declarații</h4>
            <nav className={styles.links}>
              <Link href="/ghiduri">Toate ghidurile</Link>
              <Link href="/ghiduri/d212-ghid-completare">Ghid D212 2026</Link>
              <Link href="/ghiduri/facilitati-fiscale">Facilități IT / Construcții</Link>
              <Link href="/ghiduri/impozite-locale-2026">Impozite locale 2026</Link>
              <Link href="/declaratii">Declarații fiscale</Link>
              <Link href="/glosar">Glosar Fiscal</Link>
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Resurse</h4>
            <nav className={styles.links}>
              <Link href="/calendar">Calendar Fiscal 2026</Link>
              <Link href="/comparatii">Comparații europene</Link>
              <Link href="/sisteme">Sisteme ANAF</Link>
              <Link href="/noutati">Noutăți fiscale</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/manager">Manager 2026</Link>
            </nav>
          </div>

        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} FocusTax.ro — Claritate fiscală pentru toți</span>
          <span className={styles.disclaimer}>
            Informativ. Nu substituie consultanță fiscală autorizată. Actualizat mai 2026.
          </span>
        </div>
      </div>
    </footer>
  );
}
