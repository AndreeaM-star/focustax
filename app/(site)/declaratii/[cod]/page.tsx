import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, Callout, Icon, Badge } from "@/components/ui";
import { declaratii, INLOCUITE } from "./data";
import { absUrl } from "@/lib/site";
import s from "./page.module.css";

const CALCULATOR: Record<string, { href: string; label: string }> = {
  d300: { href: "/calculator/tva", label: "Calculator TVA" },
  d301: { href: "/calculator/tva", label: "Calculator TVA" },
  d212: { href: "/calculator/pfa", label: "Calculator PFA" },
  d112: { href: "/calculator/salariu", label: "Calculator salariu" },
  d101: { href: "/calculator/srl", label: "Calculator SRL" },
  d100: { href: "/calculator/srl", label: "Calculator SRL" },
};

export function generateStaticParams() {
  return Object.keys(declaratii).map((cod) => ({ cod }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ cod: string }> }): Promise<Metadata> {
  const { cod } = await params;
  const d = declaratii[cod.toLowerCase()];
  if (!d) return {};
  return {
    title: `${d.cod}: ${d.titlu.replace(/^Formularul \d+\s*—?\s*/, "") || d.titlu} — termen și completare 2026`,
    description: `${d.subtitle} Termen: ${d.termen}.`,
    alternates: { canonical: absUrl(`/declaratii/${cod.toLowerCase()}`) },
  };
}

export default async function DeclaratiePage({ params }: { params: Promise<{ cod: string }> }) {
  const { cod } = await params;
  const key = cod.toLowerCase();
  const d = declaratii[key];
  if (!d) notFound();

  const inlocuita = INLOCUITE[key];
  const calc = CALCULATOR[key];
  const inrudite = Object.entries(declaratii).filter(([k, x]) => k !== key && x.categorie === d.categorie).slice(0, 4);

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Declarații", href: "/declaratii" }, { label: d.cod }]}
        eyebrow={<>{d.categorie} · {d.cod}</>}
        title={d.titlu}
        lead={d.subtitle}
      />
      <Container>
        {inlocuita && (
          <div style={{ marginBottom: 24 }}>
            <Callout tone="danger" title={`Formular înlocuit de ${inlocuita}`}>
              Pentru veniturile din ultimii ani nu se mai depune {d.cod}: informațiile se declară în Declarația unică.{" "}
              <Link href={`/declaratii/${inlocuita.toLowerCase()}`} style={{ textDecoration: "underline" }}>Vezi {inlocuita}</Link>.
            </Callout>
          </div>
        )}

        <dl className={s.facts}>
          <div><dt><Icon name="calendar" size={16} />Periodicitate</dt><dd>{d.periodicitate}</dd></div>
          <div><dt><Icon name="clock" size={16} />Termen</dt><dd>{d.termen}</dd></div>
          <div><dt><Icon name="server" size={16} />Depunere</dt><dd>{d.depunere}</dd></div>
          <div><dt><Icon name="file" size={16} />Durată estimată</dt><dd>{d.durata}</dd></div>
        </dl>

        <div className={s.layout}>
          <div>
            <section className={s.section}>
              <h2>Pe scurt</h2>
              <ul className={s.points}>{d.legislatie.map((l) => <li key={l}>{l}</li>)}</ul>
            </section>

            <section className={s.section}>
              <h2>Ce conține formularul</h2>
              <div className={s.chapters}>
                {d.capitole.map((c, i) => (
                  <details key={c.id} open={i === 0}>
                    <summary><span className={s.chapId}>{c.id}</span>{c.titlu.replace(/^[A-Z0-9]+\s*—\s*/, "")}</summary>
                    <ul>{c.continut.map((x) => <li key={x}>{x}</li>)}</ul>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className={s.aside}>
            {(d.linkWebFormular || d.linkDescarcare) && (
              <div className={s.box}>
                <p className={s.boxTitle}>Formular oficial ANAF</p>
                {d.linkWebFormular && (
                  <a href={d.linkWebFormular} target="_blank" rel="noopener noreferrer" className={s.extLink}>
                    <Icon name="external" size={16} />Completează online
                  </a>
                )}
                {d.linkDescarcare && (
                  <a href={d.linkDescarcare} target="_blank" rel="noopener noreferrer" className={s.extLink}>
                    <Icon name="download" size={16} />Descarcă PDF
                  </a>
                )}
              </div>
            )}
            {calc && (
              <Link href={calc.href} className={s.calcBox}>
                <Icon name="calculator" />
                <span><strong>{calc.label}</strong><small>Calculează sumele de declarat</small></span>
                <Icon name="arrowRight" size={16} />
              </Link>
            )}
            {inrudite.length > 0 && (
              <div className={s.box}>
                <p className={s.boxTitle}>Alte declarații · {d.categorie}</p>
                <ul className={s.rel}>
                  {inrudite.map(([k, x]) => (
                    <li key={k}>
                      <Link href={`/declaratii/${k}`}><b>{x.cod}</b> {x.titlu.replace(/^Formularul \d+\s*—?\s*/, "")}</Link>
                      {INLOCUITE[k] && <Badge>înlocuită</Badge>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </main>
  );
}
