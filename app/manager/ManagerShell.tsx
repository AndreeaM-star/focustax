"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyCui, setCompanyCui] = useState("");

  useEffect(() => {
    // allow setup page without company
    if (pathname === "/manager/setup") return;

    const companyId = localStorage.getItem("focustax_company_id");
    const companyname = localStorage.getItem("focustax_company_name");
    const companycui = localStorage.getItem("focustax_company_cui");

    if (companyname) setCompanyName(companyname);
    if (companycui) setCompanyCui(companycui);

    // Prevent fallback to demo value
    const shouldReset =
      !companyId ||
      companyId === "demo" ||
      companyId === "temp" ||
      (companyname && companyname.toLowerCase().includes("demo"));

    if (shouldReset) {
      localStorage.removeItem("focustax_company_id");
      localStorage.removeItem("focustax_company_name");
      localStorage.removeItem("focustax_company_cui");
      router.push("/manager/setup");
      return;
    }
  }, [pathname, router]);

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
            <div className={styles.firmaAvatar}>{companyName.charAt(0)}</div>
            <div>
              <span className={styles.firmaName}>{companyName}</span>
              <span className={styles.firmaCui}>CUI: {companyCui}</span>
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
