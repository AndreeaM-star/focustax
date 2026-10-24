import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section, Callout, Badge, Icon, LinkCard } from "@/components/ui";
import { sisteme, SISTEME_IDS } from "./data";
import { absUrl } from "@/lib/site";
import s from "./sistem.module.css";

export function generateStaticParams() {
  return SISTEME_IDS.map((sistem) => ({ sistem }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ sistem: string }> }): Promise<Metadata> {
  const { sistem } = await params;
  const x = sisteme[sistem];
  if (!x) return {};
  return {
    title: `${x.titlu}: ce este, cine e obligat și cum funcționează`,
    description: x.descriereScurta,
    alternates: { canonical: absUrl(`/sisteme/${sistem}`) },
  };
}

export default async function SistemPage({ params }: { params: Promise<{ sistem: string }> }) {
  const { sistem } = await params;
  const x = sisteme[sistem];
  if (!x) notFound();
  const alte = SISTEME_IDS.filter((id) => id !== sistem).slice(0, 3);

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Sisteme ANAF", href: "/sisteme" }, { label: x.titlu }]}
        eyebrow={<>{x.badge}{x.obligatoriuDin ? ` · obligatoriu din ${x.obligatoriuDin}` : ""}</>}
        title={x.titlu}
        lead={x.descriere}
      />
      <Container>
        <div className={s.layout}>
          <div>
            <Section title="Cine este obligat">
              <ul className={s.checks}>{x.cineEObligat.map((c) => <li key={c}><Icon name="check" size={18} />{c}</li>)}</ul>
            </Section>

            <Section title="Cum funcționează">
              <ol className={s.steps}>
                {x.cumFunctioneaza.map((p) => (
                  <li key={p.pas}><strong>{p.pas}</strong><p>{p.descriere}</p></li>
                ))}
              </ol>
            </Section>

            {x.sanctiuni && x.sanctiuni.length > 0 && (
              <Section title="Sancțiuni">
                <Callout tone="danger">
                  <ul className={s.plain}>{x.sanctiuni.map((c) => <li key={c}>{c}</li>)}</ul>
                </Callout>
              </Section>
            )}

            {x.sfaturi && x.sfaturi.length > 0 && (
              <Section title="Sfaturi practice">
                <ul className={s.checks}>{x.sfaturi.map((c) => <li key={c}><Icon name="arrowRight" size={18} />{c}</li>)}</ul>
              </Section>
            )}
          </div>

          <aside className={s.aside}>
            <div className={s.box}>
              <p className={s.boxTitle}>Istoric</p>
              <ol className={s.timeline}>
                {x.timeline.map((t) => <li key={t.an + t.eveniment}><Badge tone="brand">{t.an}</Badge><span>{t.eveniment}</span></li>)}
              </ol>
            </div>
            {x.linkuriOficiale.length > 0 && (
              <div className={s.box}>
                <p className={s.boxTitle}>Surse oficiale</p>
                {x.linkuriOficiale.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={s.ext}>
                    <Icon name="external" size={16} />{l.titlu}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>

        <Section title="Alte sisteme ANAF">
          <div className={s.grid}>
            {alte.map((id) => <LinkCard key={id} href={`/sisteme/${id}`} title={sisteme[id].titlu} desc={sisteme[id].descriereScurta} icon="server" meta="Detalii" />)}
          </div>
        </Section>
      </Container>
    </main>
  );
}
