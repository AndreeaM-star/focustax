import Link from "next/link";
import { NAV_CALCULATOARE, NAV_RESURSE } from "@/lib/nav";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <span className={s.logo}>Focus<span>Tax</span></span>
          <p>Calculatoare și ghiduri fiscale pentru România, scrise pe înțelesul tuturor. Gratuit, fără cont.</p>
          <a href="mailto:focustaxro@gmail.com" className={s.mail}>focustaxro@gmail.com</a>
        </div>

        <nav className={s.col} aria-label="Calculatoare">
          <h2>Calculatoare</h2>
          {NAV_CALCULATOARE.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>

        <nav className={s.col} aria-label="Resurse">
          <h2>Resurse</h2>
          {NAV_RESURSE.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>

        <nav className={s.col} aria-label="Ghiduri populare">
          <h2>Populare</h2>
          <Link href="/ghiduri/d212-ghid-completare">Ghid Declarația unică D212</Link>
          <Link href="/ghiduri/impozite-locale-2026">Impozite locale 2026</Link>
          <Link href="/ghiduri/facilitati-fiscale">Facilități fiscale</Link>
          <Link href="/ghiduri/srl-vs-micro">SRL vs micro</Link>
          <Link href="/declaratii/d300">Decontul de TVA D300</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      <div className={s.bottom}>
        <span>© {new Date().getFullYear()} FocusTax.ro</span>
        <span>
          Informații cu caracter educativ, actualizate la octombrie 2026. Nu înlocuiesc consultanța unui expert contabil sau consultant fiscal.
        </span>
      </div>
    </footer>
  );
}
