import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Vrei claritate în taxe?
            <span className={styles.wealthStyle}>FocusTax</span>
          </h1>
          <p className={styles.heroText}>
            Expertiza de care ai nevoie pentru a naviga cu încredere prin
            legislația fiscală din România.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
