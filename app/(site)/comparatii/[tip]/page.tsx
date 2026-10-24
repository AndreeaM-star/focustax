import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section, Stats, Stat, Callout, LinkCard } from "@/components/ui";
import { COMPARATII, COMPARATII_IDS } from "./data";
import { absUrl } from "@/lib/site";
import CompareBars from "./CompareBars";
import s from "./comparatii.module.css";

export function generateStaticParams() {
  return COMPARATII_IDS.map((tip) => ({ tip }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ tip: string }> }): Promise<Metadata> {
  const { tip } = await params;
  const c = COMPARATII[tip];
  if (!c) return {};
  return {
    title: `${c.titlu}: România comparată cu Europa`,
    description: c.descriere,
    alternates: { canonical: absUrl(`/comparatii/${tip}`) },
  };
}

const fmt = (v: number, u: string) => `${v.toLocaleString("ro-RO", { maximumFractionDigits: 2 })}${u === "%" ? "%" : ` ${u}`}`;

export default async function ComparatiePage({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params;
  const c = COMPARATII[tip];
  if (!c) notFound();

  const europa = c.tari.filter((t) => t.zona !== "extra-europa").sort((a, b) => b.cotaStandard - a.cotaStandard);
  const ro = c.tari.find((t) => t.esteRomania);
  const loc = ro ? europa.findIndex((t) => t.esteRomania) + 1 : 0;
  const alte = COMPARATII_IDS.filter((x) => x !== tip).slice(0, 3);

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Comparații", href: "/comparatii" }, { label: c.titlu }]}
        eyebrow="Comparație europeană"
        title={c.titlu}
        lead={c.descriere}
      />
      <Container>
        <Stats>
          {ro && <Stat value={fmt(ro.cotaStandard, c.unitateMasura)} label="România" />}
          <Stat value={fmt(c.mediuEuropean, c.unitateMasura)} label="Media europeană" />
          {ro && <Stat value={`${loc} din ${europa.length}`} label="Locul României în Europa (de la cea mai mare)" />}
        </Stats>

        <Section title="Țară cu țară">
          <CompareBars tari={c.tari} unitate={c.unitateMasura} medie={c.mediuEuropean} />
        </Section>

        <div className={s.text}>
          <Section title="Situația din România">
            <Callout tone="brand">{c.contextRomania}</Callout>
          </Section>
          <Section title="Pe scurt, istoria">
            <p className={s.p}>{c.istorie}</p>
          </Section>
          {c.fapteInteresante.length > 0 && (
            <Section title="De știut">
              <ul className={s.facts}>{c.fapteInteresante.map((f) => <li key={f}>{f}</li>)}</ul>
            </Section>
          )}
        </div>

        <Section title="Alte comparații">
          <div className={s.grid}>
            {alte.map((id) => <LinkCard key={id} href={`/comparatii/${id}`} title={COMPARATII[id].titlu} desc={COMPARATII[id].descriere} icon="globe" meta="Compară" />)}
          </div>
        </Section>
      </Container>
    </main>
  );
}
