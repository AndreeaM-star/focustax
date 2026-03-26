"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./manager.module.css";

const navItems = [
  { href: "/manager", label: "Dashboard", icon: "📊", exact: true },
  { href: "/manager/facturi", label: "e-Factura", icon: "🧾" },
  { href: "/manager/tva", label: "e-VAT", icon: "📈" },
  { href: "/manager/banci", label: "Open Banking", icon: "🏦" },
  { href: "/manager/hr", label: "HR & Salarii", icon: "👥" },
  { href: "/manager/ai", label: "ANA — Asistent AI", icon: "🤖" },
];

export default function ManagerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.shell}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarLogo}>
          <Link href="/" className={styles.logoLink} onClick={() => setMobileOpen(false)}>
            Focus<span>Tax</span>
          </Link>
          <span className={styles.managerBadge}>Manager</span>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {isActive && <span className={styles.navDot} />}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.firmaBadge}>
            <div className={styles.firmaAvatar}>D</div>
            <div>
              <span className={styles.firmaName}>Demo SRL</span>
              <span className={styles.firmaCui}>CUI: RO12345678</span>
            </div>
          </div>
          <Link href="/" className={styles.backToSite}>
            ← Înapoi la focustax.ro
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className={styles.contentWrap}>
        {/* Mobile topbar */}
        <div className={styles.mobileTopbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meniu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
          <span className={styles.mobileTitle}>
            Focus<span>Tax</span> Manager
          </span>
        </div>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
