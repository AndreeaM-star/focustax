import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <span className={styles.cod}>404</span>
        <h1 className={styles.titlu}>Pagina nu a fost găsită</h1>
        <p className={styles.desc}>
          Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className={styles.butoane}>
          <Link href="/" className={styles.btn}>← Înapoi la pagina principală</Link>
          <Link href="/calculator" className={styles.btnSecundar}>→ Calculator Taxe</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
