"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./manager.module.css";

const navItems = [
  { href: "/manager",          label: "Dashboard",       icon: "📊", exact: true },
  { href: "/manager/facturi",  label: "e-Factura",       icon: "🧾" },
  { href: "/manager/tva",      label: "e-VAT",           icon: "📈" },
  { href: "/manager/banci",    label: "Open Banking",    icon: "🏦" },
  { href: "/manager/hr",       label: "HR & Salarii",    icon: "👥" },
  { href: "/manager/ai",       label: "ANA — Asistent AI", icon: "🤖" },
  { href: "/manager/settings", label: "Setări",          icon: "⚙️" },
];

export default function ManagerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyCui,  setCompanyCui]  = useState("");
  const [checked, setChecked] = useState(false);

  const isSetupPage = pathname === "/manager/setup" || pathname === "/manager/setup/";

  useEffect(() => {
    if (isSetupPage) { setChecked(true); return; }

    const companyId   = localStorage.getItem("focustax_company_id");
    const companyname = localStorage.getItem("focustax_company_name") ?? "";
    const companycui  = localStorage.getItem("focustax_company_cui")  ?? "";

    const INVALID_IDS = ["", "demo", "temp", "null", "undefined"];
    const isInvalid = !companyId || INVALID_IDS.includes(companyId);

    if (isInvalid) {
      localStorage.removeItem("focustax_company_id");
      localStorage.removeItem("focustax_company_name");
      localStorage.removeItem("focustax_company_cui");
      window.location.replace("/manager/setup/");
      return;
    }

    setCompanyName(companyname);
    setCompanyCui(companycui);
    setChecked(true);
  }, [pathname, isSetupPage]);

  if (!checked) return null;

  return (
    <div className={styles.shell}>
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

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
              ? pathname === item.href || pathname === item.href + "/"
              : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
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
          {companyName && (
            <Link href="/manager/settings" className={styles.firmaBadge} onClick={() => setMobileOpen(false)}>
              <div className={styles.firmaAvatar}>{companyName.charAt(0).toUpperCase()}</div>
              <div>
                <span className={styles.firmaName}>{companyName}</span>
                <span className={styles.firmaCui}>CUI: {companyCui || "—"}</span>
              </div>
            </Link>
          )}
          <Link href="/" className={styles.backToSite}>← Înapoi la focustax.ro</Link>
        </div>
      </aside>

      <div className={styles.contentWrap}>
        <div className={styles.mobileTopbar}>
          <button className={styles.menuBtn} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Meniu">
            {mobileOpen ? "✕" : "☰"}
          </button>
          <span className={styles.mobileTitle}>Focus<span>Tax</span> Manager</span>
        </div>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
