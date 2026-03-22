"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.navbarArea} ${scrolled ? styles.navbarScrolled : ""}`}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo} onClick={() => setMenuOpen(false)}>
          Focus<span>Tax</span>
        </Link>

        <nav className={`${styles.navbarMenu} ${menuOpen ? styles.open : ""}`} aria-label="Navigare principală">
          <Link href="/declaratii" onClick={() => setMenuOpen(false)} className={pathname.startsWith("/declaratii") ? styles.activ : ""}>Declarații</Link>
          <Link href="/ghiduri" onClick={() => setMenuOpen(false)} className={pathname.startsWith("/ghiduri") ? styles.activ : ""}>Ghiduri</Link>
          <Link href="/comparatii" onClick={() => setMenuOpen(false)} className={pathname.startsWith("/comparatii") ? styles.activ : ""}>Comparații</Link>
          <Link href="/noutati" onClick={() => setMenuOpen(false)} className={pathname === "/noutati" ? styles.activ : ""}>Noutăți</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className={pathname === "/contact" ? styles.activ : ""}>Contact</Link>
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
