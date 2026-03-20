"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbarArea}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          Focus<span>Tax</span>
        </Link>

        <nav className={styles.navbarMenu}>
          <Link href="/">Acasă</Link>
          <Link href="/declaratii">Declarații</Link>
          <Link href="/ghiduri">Ghiduri</Link>
          <Link href="/noutati">Noutăți</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className={styles.navbarRight}>
          <button>Căutare 🔎</button>
        </div>
      </div>
    </header>
  );
}
