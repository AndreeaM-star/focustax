import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.inner}>
          <span className={styles.cod}>404</span>
          <h1 className={styles.titlu}>Pagina nu a fost găsită</h1>
          <p className={styles.desc}>
            Pagina pe care o cauți nu există sau a fost mutată. Întoarce-te acasă sau explorează alte secțiuni.
          </p>
          <div className={styles.butoane}>
            <Link href="/" className={styles.btn}>← Pagina principală</Link>
            <Link href="/calculator" className={styles.btnSecundar}>→ Calculator Taxe</Link>
          </div>

          <div className={styles.suggestions}>
            <p className={styles.suggestionsLabel}>Poate cauți</p>
            <div className={styles.suggestionLinks}>
              <Link href="/ghiduri" className={styles.suggestionLink}>Ghiduri fiscale</Link>
              <Link href="/declaratii" className={styles.suggestionLink}>Declarații ANAF</Link>
              <Link href="/calendar" className={styles.suggestionLink}>Calendar fiscal</Link>
              <Link href="/glosar" className={styles.suggestionLink}>Glosar fiscal</Link>
              <Link href="/noutati" className={styles.suggestionLink}>Noutăți 2026</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
