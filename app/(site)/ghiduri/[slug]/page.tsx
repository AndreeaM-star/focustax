import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, Callout, LinkCard, Icon, Section } from "@/components/ui";
import { ghiduri } from "./data";
import { absUrl } from "@/lib/site";
import { fmtLei } from "@/lib/fiscal";
import s from "./ghid.module.css";

const CALCULATOR_PENTRU: Record<string, { href: string; label: string }> = {
  "inregistrare-pfa": { href: "/calculator/pfa", label: "Calculator PFA" },
  "sistem-real-norma": { href: "/calculator/pfa", label: "Calculator PFA" },
  "contributii-sociale": { href: "/calculator/pfa", label: "Calculator PFA" },
  "d212-pfa": { href: "/calculator/pfa", label: "Calculator PFA" },
  "srl-vs-micro": { href: "/calculator/srl", label: "Calculator SRL" },
  "sponsorizari": { href: "/calculator/srl", label: "Calculator SRL" },
  "dividende": { href: "/calculator/dividende", label: "Calculator dividende" },
  "inregistrare-tva": { href: "/calculator/tva", label: "Calculator TVA" },
  "impozit-chirii": { href: "/calculator/chirii", label: "Calculator chirii" },
  "salarii-retineri": { href: "/calculator/salariu", label: "Calculator salariu" },
  "investitii-broker-strain-d212": { href: "/calculator/declaratie-unica", label: "Calculator Declarația unică" },
  "cass-venituri-pasive": { href: "/calculator/declaratie-unica", label: "Calculator Declarația unică" },
  "crypto-impozit-dac8": { href: "/calculator/crypto", label: "Calculator crypto" },
};

const ACTUALIZAT = "2026-10-25";

export function generateStaticParams() {
  return Object.keys(ghiduri).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = ghiduri[slug];
  if (!g) return {};
  return {
    title: `${g.titlu} (2026)`,
    description: g.desc,
    alternates: { canonical: absUrl(`/ghiduri/${slug}`) },
    openGraph: { title: g.titlu, description: g.desc, type: "article", url: absUrl(`/ghiduri/${slug}`) },
  };
}

export default async function GhidPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = ghiduri[slug];
  if (!g) notFound();

  const calc = CALCULATOR_PENTRU[slug];
  const declaratii = g.declaratiiAferente.filter((d, i, a) => a.findIndex((x) => x.cod === d.cod) === i);
  const alte = Object.values(ghiduri).filter((x) => x.slug !== slug && x.categorie === g.categorie).slice(0, 3);
  const maxBar = g.chart ? Math.max(...g.chart.bare.map((b) => b.value), 1) : 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.titlu,
    description: g.desc,
    inLanguage: "ro-RO",
    dateModified: ACTUALIZAT,
    mainEntityOfPage: absUrl(`/ghiduri/${slug}`),
    author: { "@type": "Organization", name: "FocusTax", url: absUrl("/") },
    publisher: { "@type": "Organization", name: "FocusTax", url: absUrl("/") },
  };

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Ghiduri", href: "/ghiduri" }, { label: g.titlu }]}
        eyebrow={<>{g.categorie} · actualizat octombrie 2026</>}
        title={g.titlu}
        lead={g.desc}
      />
      <Container>
        <div className={s.layout}>
          <article className={s.article}>
            {g.sectiuni.map((sec, i) => (
              <section key={sec.titlu} id={`s${i + 1}`} className={s.section}>
                <h2>{sec.titlu}</h2>
                <ul className={s.points}>
                  {sec.continut.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </section>
            ))}

            {g.timeline && g.timeline.length > 0 && (
              <section className={s.section}>
                <h2>Pașii, pe scurt</h2>
                <ol className={s.timeline}>
                  {g.timeline.map((t) => (
                    <li key={t.pas}>
                      <div className={s.tlHead}><strong>{t.titlu}</strong><span>{t.durata}</span></div>
                      <p>{t.detaliu}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {g.chart && (
              <section className={s.section}>
                <h2>{g.chart.titlu}</h2>
                <div className={s.chart}>
                  {g.chart.bare.map((b) => (
                    <div key={b.label} className={s.chartRow}>
                      <span className={s.chartLabel}>{b.label}</span>
                      <span className={s.chartTrack}><span style={{ width: `${(b.value / maxBar) * 100}%` }} /></span>
                      <span className={s.chartVal}>{fmtLei(b.value)}{g.chart!.unitate?.startsWith("lei") ? " lei" : ""}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {g.atentie.length > 0 && (
              <section className={s.section}>
                <Callout tone="accent" title="De reținut">
                  <ul className={s.attn}>{g.atentie.map((a) => <li key={a}>{a}</li>)}</ul>
                </Callout>
              </section>
            )}
          </article>

          <aside className={s.aside}>
            <div className={s.box}>
              <p className={s.boxTitle}>În acest ghid</p>
              <ol className={s.toc}>
                {g.sectiuni.map((sec, i) => <li key={sec.titlu}><a href={`#s${i + 1}`}>{sec.titlu}</a></li>)}
              </ol>
            </div>
            {calc && (
              <Link href={calc.href} className={s.calcBox}>
                <Icon name="calculator" />
                <span><strong>{calc.label}</strong><small>Calculează pentru situația ta</small></span>
                <Icon name="arrowRight" size={16} />
              </Link>
            )}
            {declaratii.length > 0 && (
              <div className={s.box}>
                <p className={s.boxTitle}>Declarații legate</p>
                <ul className={s.decl}>
                  {declaratii.map((d) => (
                    <li key={d.cod}><Link href={d.href}><b>{d.cod}</b> {d.nume}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {alte.length > 0 && (
          <Section title="Alte ghiduri din aceeași categorie">
            <div className={s.related}>
              {alte.map((x) => <LinkCard key={x.slug} href={`/ghiduri/${x.slug}`} title={x.titlu} desc={x.desc} icon="book" meta="Citește" />)}
            </div>
          </Section>
        )}
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
