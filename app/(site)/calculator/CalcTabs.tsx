"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { NAV_CALCULATOARE } from "@/lib/nav";
import s from "./calculator.module.css";

/** Bară de navigare între calculatoare — linkuri reale, indexabile */
export default function CalcTabs() {
  const pathname = (usePathname() ?? "").replace(/\/$/, "");
  return (
    <nav className={s.tabs} aria-label="Calculatoare">
      <div className={s.tabsInner}>
        {NAV_CALCULATOARE.map((c) => {
          const active = pathname === c.href;
          return (
            <Link key={c.href} href={c.href} className={`${s.tab} ${active ? s.tabActive : ""}`} aria-current={active ? "page" : undefined}>
              {c.icon && <Icon name={c.icon} size={16} />}
              {c.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
