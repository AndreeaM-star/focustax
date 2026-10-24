import Link from "next/link";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";
import s from "./ui.module.css";
import { absUrl } from "@/lib/site";

export { Icon };
export type { IconName };
export const ui = s;

type Tone = "neutral" | "brand" | "accent" | "danger" | "info";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`${s.container} ${className ?? ""}`}>{children}</div>;
}

export interface Crumb { label: string; href?: string }

/** Breadcrumbs vizibile + date structurate BreadcrumbList pentru Google */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Acasă", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absUrl(c.href) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      {all.map((c, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <span className={s.crumbSep} aria-hidden>/</span>}
          {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current={i === all.length - 1 ? "page" : undefined}>{c.label}</span>}
        </span>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

export function PageHeader({
  eyebrow, title, lead, crumbs, children,
}: { eyebrow?: ReactNode; title: ReactNode; lead?: ReactNode; crumbs?: Crumb[]; children?: ReactNode }) {
  return (
    <header className={s.pageHeader}>
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
        <h1 className={s.pageTitle}>{title}</h1>
        {lead && <p className={s.pageLead}>{lead}</p>}
        {children && <div className={s.pageActions}>{children}</div>}
      </Container>
    </header>
  );
}

export function Section({ title, lead, action, children, id }: { title?: ReactNode; lead?: ReactNode; action?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section className={s.section} id={id}>
      {(title || action) && (
        <div className={s.sectionHead}>
          <div>
            {title && <h2 className={s.sectionTitle}>{title}</h2>}
            {lead && <p className={s.sectionLead}>{lead}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function ButtonLink({ href, children, variant = "primary", size, icon }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost"; size?: "sm"; icon?: IconName }) {
  const v = variant === "primary" ? s.btnPrimary : variant === "secondary" ? s.btnSecondary : s.btnGhost;
  return (
    <Link href={href} className={`${s.btn} ${v} ${size === "sm" ? s.btnSm : ""}`}>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </Link>
  );
}

export function LinkCard({ href, title, desc, icon, meta = "Deschide", badge }: { href: string; title: ReactNode; desc?: ReactNode; icon?: IconName; meta?: ReactNode; badge?: ReactNode }) {
  return (
    <Link href={href} className={s.linkCard}>
      {(icon || badge) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          {icon && <span className={s.linkCardIcon}><Icon name={icon} /></span>}
          {badge}
        </div>
      )}
      <span className={s.linkCardTitle}>{title}</span>
      {desc && <span className={s.linkCardDesc}>{desc}</span>}
      <span className={s.linkCardMeta}>{meta}<Icon name="arrowRight" size={16} /></span>
    </Link>
  );
}

export function Card({ children, title, className }: { children: ReactNode; title?: ReactNode; className?: string }) {
  return (
    <div className={`${s.card} ${className ?? ""}`}>
      {title && <h3 className={s.cardTitle}>{title}</h3>}
      {children}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`${s.badge} ${tone !== "neutral" ? s[`badge_${tone}`] : ""}`}>{children}</span>;
}

const CALLOUT_ICON: Record<Tone, IconName> = { neutral: "info", brand: "check", accent: "clock", danger: "alert", info: "info" };

export function Callout({ tone = "info", title, children }: { tone?: Tone; title?: ReactNode; children: ReactNode }) {
  return (
    <div className={`${s.callout} ${tone !== "neutral" ? s[`callout_${tone}`] : ""}`} role="note">
      <Icon name={CALLOUT_ICON[tone]} size={18} />
      <div>
        {title && <p className={s.calloutTitle}>{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Stat({ value, label }: { value: ReactNode; label: ReactNode }) {
  return (
    <div className={s.stat}>
      <div className={s.statValue}>{value}</div>
      <div className={s.statLabel}>{label}</div>
    </div>
  );
}

export function Stats({ children }: { children: ReactNode }) {
  return <div className={s.stats}>{children}</div>;
}

export function Main({ children }: { children: ReactNode }) {
  return <main id="continut" className={s.main}>{children}</main>;
}
