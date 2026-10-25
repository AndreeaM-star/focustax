import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section, Stats, Stat, Callout, LinkCard } from "@/components/ui";
import { COMPARATII, COMPARATII_IDS } from "./data";
import { absUrl } from "@/lib/site";
import CompareBars from "./CompareBars";
import SalariiEuropa from "./SalariiEuropa";
import { SALARII_EUROPA, AN_DATE } from "@/lib/salarii-europa";
import { ResultRows } from "@/components/ui/fields";
import sal from "./salarii.module.css";
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
        {tip === "contributii-sociale" ? <CostSalariu /> : (
          <>
            <Stats>
              {ro && <Stat value={fmt(ro.cotaStandard, c.unitateMasura)} label="România" />}
              <Stat value={fmt(c.mediuEuropean, c.unitateMasura)} label="Media europeană" />
              {ro && <Stat value={`${loc} din ${europa.length}`} label="Locul României în Europa (de la cea mai mare)" />}
            </Stats>

            <Section title="Țară cu țară">
              <CompareBars tari={c.tari} unitate={c.unitateMasura} medie={c.mediuEuropean} />
            </Section>
          </>
        )}

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

const lunar = (v: number) => Math.round(v / 12);
const procent = (v: number) => `${(v * 100).toLocaleString("ro-RO", { maximumFractionDigits: 1 })}%`;

/** Comparația costului salariului mediu: cost angajator, taxe și net, în euro */
function CostSalariu() {
  const tari = SALARII_EUROPA;
  const ro = tari.find((t) => t.cod === "RO")!;
  const ordonate = [...tari].sort((a, b) => b.net / b.cost - a.net / a.cost);
  const locRo = ordonate.findIndex((t) => t.cod === "RO") + 1;
  const medie = tari.reduce((a, t) => a + t.net / t.cost, 0) / tari.length;

  return (
    <>
      <Stats>
        <Stat value={`${lunar(ro.net).toLocaleString("ro-RO")} €`} label={`Net în mână în România, pe lună, la salariul mediu brut de ${lunar(ro.brut).toLocaleString("ro-RO")} €`} />
        <Stat value={procent(ro.net / ro.cost)} label="Cât ajunge la angajat din costul total, în România" />
        <Stat value={procent(medie)} label={`Media celor ${tari.length} țări`} />
        <Stat value={`${locRo} din ${tari.length}`} label="Locul României (1 = cel mai mult rămâne în mână)" />
      </Stats>

      <Section title="Salariul mediu, țară cu țară" lead="Pentru fiecare țară: cât plătește angajatorul în total, cât merge la stat și cât rămâne în mâna angajatului. Ultima coloană numerică e comparația corectă între țări.">
        <SalariiEuropa tari={tari} />
      </Section>

      <Section title="Cum am calculat">
        <div className={sal.method}>
          <ol className={sal.formula}>
            <li><b>Salariul brut</b> = salariul mediu brut al țării în {AN_DATE}, pentru o persoană singură, fără copii.</li>
            <li><b>Cost total angajator</b> = salariul brut + contribuțiile plătite de angajator.</li>
            <li><b>Net în mână</b> = salariul brut − contribuțiile angajatului − impozitul pe venit.</li>
            <li><b>Net ÷ cost total</b> = din fiecare 100 € cheltuiți de angajator, câți ajung la angajat. Restul merge la stat. E singurul indicator comparabil între țări, pentru că nu depinde de cine plătește formal contribuțiile.</li>
            <li><b>Net ÷ brut</b> e afișat doar ca reper: pare foarte mic în România pentru că, din 2018, aproape toate contribuțiile sunt trecute pe angajat.</li>
          </ol>
          <div className={sal.example}>
            <h3>Exemplu: România, pe lună</h3>
            <ResultRows rows={[
              { label: "Salariu brut mediu", value: lunar(ro.brut), text: `${lunar(ro.brut).toLocaleString("ro-RO")} €` },
              { label: "+ CAM angajator (2,25%)", value: lunar(ro.contribAngajator), text: `+${lunar(ro.contribAngajator).toLocaleString("ro-RO")} €` },
              { label: "= Cost total angajator", value: lunar(ro.cost), text: `${lunar(ro.cost).toLocaleString("ro-RO")} €`, strong: true },
              { label: "− CAS 25% + CASS 10%", value: lunar(ro.contribAngajat), text: `−${lunar(ro.contribAngajat).toLocaleString("ro-RO")} €`, tone: "neg" },
              { label: "− Impozit 10%", value: lunar(ro.impozit), text: `−${lunar(ro.impozit).toLocaleString("ro-RO")} €`, tone: "neg" },
              { label: "= Net în mână", value: lunar(ro.net), text: `${lunar(ro.net).toLocaleString("ro-RO")} €`, strong: true },
              { label: "Net ÷ cost total", value: 0, text: procent(ro.net / ro.cost) },
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Surse">
        <ul className={sal.sources}>
          <li>Salariu brut, impozit, contribuții angajat și net: <a href="https://ec.europa.eu/eurostat/databrowser/view/earn_nt_net/default/table" target="_blank" rel="noopener noreferrer">Eurostat, earn_nt_net</a> ({AN_DATE}, euro, persoană singură la 100% din salariul mediu).</li>
          <li>Contribuții angajator: <a href="https://taxfoundation.org/data/all/eu/tax-burden-on-labor-europe/" target="_blank" rel="noopener noreferrer">Tax Foundation, Tax Burden on Labor in Europe {AN_DATE}</a> (EUROMOD), aplicate la salariul brut Eurostat. Croația: 16,5% din brut, conform administrației fiscale croate.</li>
          <li>Regatul Unit: calcul FocusTax cu regulile fiscale 2025/26 la salariul mediu OECD de £55.983 pe an, curs 1,17 €/£.</li>
          <li>Sunt valori la salariul mediu. La alte niveluri de salariu procentele diferă, mai ales în țările cu impozit progresiv.</li>
        </ul>
      </Section>
    </>
  );
}
