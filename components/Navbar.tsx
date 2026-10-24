"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV_CALCULATOARE, NAV_RESURSE, type NavItem } from "@/lib/nav";
import s from "./Navbar.module.css";

function Menu({ label, items, active }: { label: string; items: NavItem[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className={s.menu} ref={ref} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={`${s.link} ${active ? s.active : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
      >
        {label}
        <Icon name="chevronDown" size={14} className={open ? s.chevOpen : s.chev} />
      </button>
      <div className={`${s.panel} ${open ? s.panelOpen : ""}`}>
        <div className={s.panelGrid}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={s.panelItem}>
              {it.icon && <span className={s.panelIcon}><Icon name={it.icon} size={18} /></span>}
              <span>
                <span className={s.panelLabel}>{it.label}</span>
                {it.desc && <span className={s.panelDesc}>{it.desc}</span>}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setDrawer(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  const is = (p: string) => pathname === p || pathname.startsWith(`${p}/`);

  return (
    <>
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={s.inner}>
        <Link href="/" className={s.logo} aria-label="FocusTax — pagina principală">
          <span className={s.logoMark} aria-hidden>F</span>
          <span>Focus<span className={s.logoAccent}>Tax</span></span>
        </Link>

        <nav className={s.nav} aria-label="Navigare principală">
          <Menu label="Calculatoare" items={NAV_CALCULATOARE} active={is("/calculator")} />
          <Link href="/ghiduri" className={`${s.link} ${is("/ghiduri") ? s.active : ""}`}>Ghiduri</Link>
          <Link href="/declaratii" className={`${s.link} ${is("/declaratii") ? s.active : ""}`}>Declarații</Link>
          <Link href="/calendar" className={`${s.link} ${is("/calendar") ? s.active : ""}`}>Calendar</Link>
          <Link href="/noutati" className={`${s.link} ${is("/noutati") ? s.active : ""}`}>Noutăți</Link>
          <Menu label="Resurse" items={NAV_RESURSE.filter((r) => !["/ghiduri", "/declaratii", "/calendar", "/noutati"].includes(r.href))} active={is("/comparatii") || is("/sisteme") || is("/glosar")} />
        </nav>

        <div className={s.right}>
          <ThemeToggle />
          <Link href="/manager" className={s.manager}>Manager</Link>
          <Link href="/calculator/salariu" className={s.cta}>
            <Icon name="calculator" size={16} />
            Calculează
          </Link>
          <button type="button" className={s.burger} onClick={() => setDrawer(true)} aria-label="Deschide meniul" aria-expanded={drawer}>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>
    </header>

      <div className={`${s.overlay} ${drawer ? s.overlayOpen : ""}`} onClick={() => setDrawer(false)} aria-hidden />
      <aside className={`${s.drawer} ${drawer ? s.drawerOpen : ""}`} aria-hidden={!drawer} aria-label="Meniu">
        <div className={s.drawerHead}>
          <span className={s.logo}><span>Focus<span className={s.logoAccent}>Tax</span></span></span>
          <button type="button" className={s.burger} onClick={() => setDrawer(false)} aria-label="Închide meniul">
            <Icon name="x" size={22} />
          </button>
        </div>
        <p className={s.drawerTitle}>Calculatoare</p>
        {NAV_CALCULATOARE.map((it) => (
          <Link key={it.href} href={it.href} className={`${s.drawerLink} ${pathname === it.href ? s.drawerActive : ""}`} tabIndex={drawer ? 0 : -1}>
            {it.icon && <Icon name={it.icon} size={18} />}{it.label}
          </Link>
        ))}
        <p className={s.drawerTitle}>Resurse</p>
        {NAV_RESURSE.map((it) => (
          <Link key={it.href} href={it.href} className={`${s.drawerLink} ${is(it.href) ? s.drawerActive : ""}`} tabIndex={drawer ? 0 : -1}>
            {it.icon && <Icon name={it.icon} size={18} />}{it.label}
          </Link>
        ))}
        <div className={s.drawerFoot}>
          <Link href="/contact" className={s.drawerLink} tabIndex={drawer ? 0 : -1}><Icon name="mail" size={18} />Contact</Link>
          <Link href="/manager" className={s.drawerLink} tabIndex={drawer ? 0 : -1}><Icon name="chart" size={18} />Manager firmă</Link>
        </div>
      </aside>
    </>
  );
}
