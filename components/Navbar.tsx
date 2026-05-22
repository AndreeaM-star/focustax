"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const TERMENE_APROAPE = (() => {
  const azi = new Date();
  const termene2026 = [
    { luna: 1, zi: 25 }, { luna: 2, zi: 25 }, { luna: 3, zi: 25 },
    { luna: 4, zi: 15 }, { luna: 4, zi: 25 }, { luna: 5, zi: 25 },
    { luna: 6, zi: 25 }, { luna: 7, zi: 25 }, { luna: 8, zi: 25 },
    { luna: 9, zi: 25 }, { luna: 10, zi: 25 }, { luna: 11, zi: 25 },
    { luna: 12, zi: 25 },
  ];
  return termene2026.some(t => {
    const d = new Date(2026, t.luna - 1, t.zi);
    const diff = (d.getTime() - azi.getTime()) / 86400000;
    return diff >= 0 && diff <= 7;
  });
})();

const calcDropdown = [
  { href: "/calculator", label: "Calculator salariu", icon: "💼" },
  { href: "/calculator?tab=pfa", label: "Calculator PFA", icon: "🧾" },
  { href: "/calculator?tab=firma", label: "Calculator SRL", icon: "🏢" },
  { href: "/calculator?tab=crypto", label: "Crypto & Investiții", icon: "₿" },
  { href: "/calculator/forme-juridice", label: "Compară forme juridice", icon: "⚖️" },
];

const ghiduriDropdown = [
  { href: "/ghiduri/d212-ghid-completare", label: "Ghid D212 2026", icon: "📋" },
  { href: "/ghiduri/facilitati-fiscale", label: "Facilități IT / Construcții", icon: "🎯" },
  { href: "/ghiduri/impozite-locale-2026", label: "Impozite locale 2026", icon: "🏠" },
  { href: "/ghiduri", label: "Toate ghidurile", icon: "📚" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [ghiduriOpen, setGhiduriOpen] = useState(false);
  const pathname = usePathname();
  const calcRef = useRef<HTMLDivElement>(null);
  const ghiduriRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (calcRef.current && !calcRef.current.contains(e.target as Node)) setCalcOpen(false);
      if (ghiduriRef.current && !ghiduriRef.current.contains(e.target as Node)) setGhiduriOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setCalcOpen(false);
    setGhiduriOpen(false);
  };

  return (
    <>
      <header className={`${styles.navbarArea} ${scrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navbarContainer}>

          <Link href="/" className={styles.navbarLogo} onClick={close}>
            Focus<span>Tax</span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Navigare principală">

            {/* Calculatoare dropdown */}
            <div ref={calcRef} className={styles.dropdownWrapper}>
              <button
                className={`${styles.navLink} ${pathname.startsWith("/calculator") ? styles.activ : ""}`}
                onClick={() => { setCalcOpen(o => !o); setGhiduriOpen(false); }}
                aria-expanded={calcOpen}
              >
                Calculatoare
                <svg className={`${styles.chevron} ${calcOpen ? styles.chevronOpen : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {calcOpen && (
                <div className={styles.dropdown} role="menu">
                  {calcDropdown.map(item => (
                    <Link key={item.href} href={item.href} className={styles.dropdownItem} onClick={close} role="menuitem">
                      <span className={styles.dropdownIcon}>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ghiduri dropdown */}
            <div ref={ghiduriRef} className={styles.dropdownWrapper}>
              <button
                className={`${styles.navLink} ${pathname.startsWith("/ghiduri") ? styles.activ : ""}`}
                onClick={() => { setGhiduriOpen(o => !o); setCalcOpen(false); }}
                aria-expanded={ghiduriOpen}
              >
                Ghiduri
                <svg className={`${styles.chevron} ${ghiduriOpen ? styles.chevronOpen : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {ghiduriOpen && (
                <div className={styles.dropdown} role="menu">
                  {ghiduriDropdown.map(item => (
                    <Link key={item.href} href={item.href} className={styles.dropdownItem} onClick={close} role="menuitem">
                      <span className={styles.dropdownIcon}>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/declaratii" onClick={close} className={`${styles.navLink} ${pathname.startsWith("/declaratii") ? styles.activ : ""}`}>Declarații</Link>
            <Link href="/comparatii" onClick={close} className={`${styles.navLink} ${pathname.startsWith("/comparatii") ? styles.activ : ""}`}>Comparații</Link>
            <Link href="/sisteme" onClick={close} className={`${styles.navLink} ${pathname.startsWith("/sisteme") ? styles.activ : ""}`}>Sisteme</Link>
            <Link href="/calendar" onClick={close} className={`${styles.navLink} ${pathname === "/calendar" ? styles.activ : ""}`}>
              Calendar
              {TERMENE_APROAPE && <span className={styles.calendarDot} aria-label="Termen iminent" />}
            </Link>
            <Link href="/glosar" onClick={close} className={`${styles.navLink} ${pathname === "/glosar" ? styles.activ : ""}`}>Glosar</Link>
            <Link href="/noutati" onClick={close} className={`${styles.navLink} ${pathname === "/noutati" ? styles.activ : ""}`}>Noutăți</Link>
          </nav>

          <div className={styles.navbarRight}>
            <Link href="/manager" className={`${styles.managerBtn} ${pathname.startsWith("/manager") ? styles.managerBtnActive : ""}`} onClick={close}>
              Manager
            </Link>
            <Link href="/calculator" className={styles.ctaBtn} onClick={close}>
              <span className={styles.ctaBtnShimmer} aria-hidden />
              Calculator Taxe
            </Link>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Închide meniu" : "Deschide meniu"}
              aria-expanded={menuOpen}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className={styles.drawerOverlay} onClick={close} aria-hidden />
      )}

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`} aria-hidden={!menuOpen}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerLogo}>Focus<span>Tax</span></span>
          <button className={styles.drawerClose} onClick={close} aria-label="Închide meniu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className={styles.drawerNav}>
          <Link href="/calculator" className={`${styles.drawerLink} ${pathname.startsWith("/calculator") ? styles.drawerLinkActive : ""}`} onClick={close}>💼 Calculator Taxe</Link>
          <Link href="/calculator/forme-juridice" className={`${styles.drawerLink} ${pathname === "/calculator/forme-juridice" ? styles.drawerLinkActive : ""}`} onClick={close}>⚖️ Compară forme juridice</Link>
          <div className={styles.drawerDivider} />
          <Link href="/ghiduri" className={`${styles.drawerLink} ${pathname.startsWith("/ghiduri") ? styles.drawerLinkActive : ""}`} onClick={close}>📚 Ghiduri Fiscale</Link>
          <Link href="/declaratii" className={`${styles.drawerLink} ${pathname.startsWith("/declaratii") ? styles.drawerLinkActive : ""}`} onClick={close}>📄 Declarații</Link>
          <Link href="/comparatii" className={`${styles.drawerLink} ${pathname.startsWith("/comparatii") ? styles.drawerLinkActive : ""}`} onClick={close}>🌍 Comparații</Link>
          <Link href="/sisteme" className={`${styles.drawerLink} ${pathname.startsWith("/sisteme") ? styles.drawerLinkActive : ""}`} onClick={close}>🔧 Sisteme ANAF</Link>
          <Link href="/calendar" className={`${styles.drawerLink} ${pathname === "/calendar" ? styles.drawerLinkActive : ""}`} onClick={close}>
            📅 Calendar Fiscal
            {TERMENE_APROAPE && <span className={styles.calendarDotSmall}>•</span>}
          </Link>
          <Link href="/glosar" className={`${styles.drawerLink} ${pathname === "/glosar" ? styles.drawerLinkActive : ""}`} onClick={close}>📖 Glosar Fiscal</Link>
          <Link href="/noutati" className={`${styles.drawerLink} ${pathname === "/noutati" ? styles.drawerLinkActive : ""}`} onClick={close}>📰 Noutăți</Link>
          <div className={styles.drawerDivider} />
          <Link href="/contact" className={`${styles.drawerLink} ${pathname === "/contact" ? styles.drawerLinkActive : ""}`} onClick={close}>✉️ Contact</Link>
          <Link href="/manager" className={`${styles.drawerLink} ${styles.drawerLinkManager} ${pathname.startsWith("/manager") ? styles.drawerLinkActive : ""}`} onClick={close}>⚡ Manager 2026</Link>
        </nav>
      </div>
    </>
  );
}
