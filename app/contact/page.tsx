import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact | FocusTax",
  description: "Contactează echipa FocusTax pentru întrebări fiscale și sugestii.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          Ai o întrebare despre o declarație fiscală sau o sugestie pentru FocusTax?
          Scrie-ne și îți răspundem cât mai rapid.
        </p>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <span className={styles.icon}>📧</span>
              <div>
                <h3>Email</h3>
                <p>contact@focustax.ro</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.icon}>⏰</span>
              <div>
                <h3>Program răspuns</h3>
                <p>Luni – Vineri, 9:00 – 18:00</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.icon}>📍</span>
              <div>
                <h3>Locație</h3>
                <p>România</p>
              </div>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nume">Nume</label>
              <input id="nume" type="text" placeholder="Numele tău" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="email@exemplu.ro" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mesaj">Mesaj</label>
              <textarea id="mesaj" rows={5} placeholder="Scrie mesajul tău aici..." />
            </div>
            <button type="submit" className={styles.btn}>Trimite mesajul</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
