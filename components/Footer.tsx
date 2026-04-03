import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <span className={styles.logo}>Focus<span className={styles.logoAccent}>Tax</span></span>
            <p className={styles.desc}>
              Ghid complet al declarațiilor fiscale din România. Gratuit, clar și actualizat.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Link-uri rapide</h4>
            <nav className={styles.links}>
              <Link href="/declaratii">Declarații fiscale</Link>
              <Link href="/calculator">Calculator taxe</Link>
              <Link href="/calculator/forme-juridice">Compară forme juridice</Link>
              <Link href="/calendar">Calendar Fiscal 2026</Link>
              <Link href="/ghiduri">Ghiduri fiscale</Link>
              <Link href="/glosar">Glosar Fiscal</Link>
              <Link href="/ghiduri/impozite-locale-2026">Impozite locale 2026</Link>
              <Link href="/noutati">Noutăți</Link>
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.links}>
              <Link href="/contact">Formular contact</Link>
              <a href="mailto:focustaxro@gmail.com">focustaxro@gmail.com</a>
              <span>Luni – Duminică, 9:00–21:00</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} FocusTax.ro — Claritate fiscală și profesionalism</span>
          <span className={styles.disclaimer}>Informativ. Nu substituie consultanță fiscală autorizată. | Informații actualizate: martie 2026</span>
        </div>
      </div>
    </footer>
  );
}
