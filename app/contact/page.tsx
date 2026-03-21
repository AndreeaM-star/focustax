"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [trimis, setTrimis] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Mesaj FocusTax de la ${nume}`);
    const body = encodeURIComponent(`Nume: ${nume}\nEmail: ${email}\n\nMesaj:\n${mesaj}`);
    window.location.href = `mailto:contact@focustax.ro?subject=${subject}&body=${body}`;
    setTrimis(true);
  }

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

          {trimis ? (
            <div className={styles.confirmare}>
              <span className={styles.confirmareIcon}>✅</span>
              <h2>Clientul de email s-a deschis!</h2>
              <p>Mesajul a fost pregătit. Trimite-l din aplicația ta de email pentru a ne contacta.</p>
              <button className={styles.btn} onClick={() => setTrimis(false)}>Trimite alt mesaj</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="nume">Nume</label>
                <input
                  id="nume"
                  type="text"
                  placeholder="Numele tău"
                  value={nume}
                  onChange={e => setNume(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@exemplu.ro"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mesaj">Mesaj</label>
                <textarea
                  id="mesaj"
                  rows={5}
                  placeholder="Scrie mesajul tău aici..."
                  value={mesaj}
                  onChange={e => setMesaj(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.btn}>Trimite mesajul</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
