"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbarArea}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          Focus<span>Tax</span>
        </Link>

        <nav className={`${styles.navbarMenu} ${menuOpen ? styles.open : ""}`} aria-label="Navigare principală">
          <Link href="/declaratii" onClick={() => setMenuOpen(false)}>Declarații</Link>
          <Link href="/ghiduri" onClick={() => setMenuOpen(false)}>Ghiduri</Link>
          <Link href="/noutati" onClick={() => setMenuOpen(false)}>Noutăți</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        <div className={styles.navbarRight}>
          <Link href="/calculator" className={styles.ctaBtn}>
            Calculator Taxe
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Deschide meniu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
