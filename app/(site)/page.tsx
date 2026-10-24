import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, LinkCard, ButtonLink, Badge, Icon, Main } from "@/components/ui";
import { NAV_CALCULATOARE } from "@/lib/nav";
import { NOUTATI, lunaAn } from "@/lib/noutati";
import { urmatoareleTermene, formatData, zileRamase } from "@/lib/calendar";
import { salariuMinim, COTE, PLAFOANE, fmtLei } from "@/lib/fiscal";
import { absUrl } from "@/lib/site";
import QuickCalc from "./QuickCalc";
import s from "./page.module.css";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: "FocusTax — calculatoare de taxe și ghiduri fiscale pentru România (2026)" },
  description:
    "Calculează salariul net, taxele PFA, impozitul SRL, dividendele, chiriile și TVA-ul după regulile fiscale din 2026. Ghiduri, declarații ANAF și calendar fiscal, gratuit.",
  alternates: { canonical: absUrl("/") },
};

const GHIDURI_POPULARE = [
  { href: "/ghiduri/d212-ghid-completare", title: "Declarația unică D212", desc: "Cine depune, ce completezi și cum calculezi CAS/CASS." },
  { href: "/ghiduri/srl-vs-micro", title: "SRL: micro sau profit?", desc: "Când merită impozitul de 1% pe venit și când cel de 16% pe profit." },
  { href: "/ghiduri/inregistrare-pfa", title: "Cum îți deschizi un PFA", desc: "Acte, costuri, pași la Registrul Comerțului și ANAF." },
  { href: "/ghiduri/inregistrare-tva", title: "TVA explicat", desc: "Plafon, cote, TVA la încasare și decontul D300." },
];

export default function HomePage() {
  const smin = salariuMinim();
  const termene = urmatoareleTermene(new Date(), 5);
  const noutati = NOUTATI.slice(0, 4);

  return (
    <Main>
      <section className={s.hero}>
        <Container className={s.heroGrid}>
          <div>
            <p className={s.heroEyebrow}><span className={s.dot} />Actualizat cu legislația din octombrie 2026</p>
            <h1 className={s.heroTitle}>Taxele din România, <em>calculate corect</em> și explicate simplu.</h1>
            <p className={s.heroLead}>
              Calculatoare pentru salariu, PFA, SRL, dividende, chirii și TVA, ghiduri pas cu pas și toate termenele ANAF.
              Gratuit, fără cont.
            </p>
            <div className={s.heroActions}>
              <ButtonLink href="/calculator/salariu" icon="arrowRight">Calculează acum</ButtonLink>
              <ButtonLink href="/calculator/forme-juridice" variant="secondary">PFA, SRL sau salariat?</ButtonLink>
            </div>
            <dl className={s.facts}>
              <div><dt>Salariu minim</dt><dd>{fmtLei(smin)} lei</dd></div>
              <div><dt>TVA standard</dt><dd>{COTE.TVA_STANDARD * 100}%</dd></div>
              <div><dt>Dividende</dt><dd>{COTE.DIVIDENDE * 100}%</dd></div>
              <div><dt>Micro</dt><dd>{COTE.MICRO * 100}%</dd></div>
              <div><dt>Plafon TVA</dt><dd>{fmtLei(PLAFOANE.TVA_INREGISTRARE)} lei</dd></div>
            </dl>
          </div>
          <QuickCalc />
        </Container>
      </section>

      <Container>
        <Section title="Calculatoare" lead="Alege situația ta. Toate calculele folosesc cotele și plafoanele în vigoare.">
          <div className={s.calcGrid}>
            {NAV_CALCULATOARE.map((c) => (
              <LinkCard key={c.href} href={c.href} title={c.label} desc={c.desc} icon={c.icon} meta="Calculează" />
            ))}
          </div>
        </Section>

        <div className={s.split}>
          <Section title="Următoarele termene" action={<ButtonLink href="/calendar" variant="ghost" size="sm" icon="arrowRight">Calendar complet</ButtonLink>}>
            <ol className={s.deadlines}>
              {termene.map((t) => {
                const z = zileRamase(t.data);
                return (
                  <li key={`${t.data}-${t.cod}-${t.titlu}`} className={s.deadline}>
                    <div className={s.deadlineDate}>
                      <span>{new Date(`${t.data}T12:00:00`).getDate()}</span>
                      <small>{new Date(`${t.data}T12:00:00`).toLocaleDateString("ro-RO", { month: "short" })}</small>
                    </div>
                    <div className={s.deadlineBody}>
                      <span className={s.deadlineCode}>{t.cod}</span>
                      {t.link ? <Link href={t.link}>{t.titlu}</Link> : <span>{t.titlu}</span>}
                      <time dateTime={t.data}>{formatData(t.data)}</time>
                    </div>
                    <Badge tone={z <= 3 ? "danger" : z <= 10 ? "accent" : "neutral"}>
                      {z === 0 ? "azi" : z === 1 ? "mâine" : `${z} zile`}
                    </Badge>
                  </li>
                );
              })}
            </ol>
          </Section>

          <Section title="Noutăți fiscale" action={<ButtonLink href="/noutati" variant="ghost" size="sm" icon="arrowRight">Toate</ButtonLink>}>
            <ul className={s.news}>
              {noutati.map((n) => (
                <li key={n.slug}>
                  <Link href={`/noutati/${n.slug}`} className={s.newsItem}>
                    <span className={s.newsMeta}>
                      <Badge tone={n.urgenta === "important" ? "accent" : "neutral"}>{n.tag}</Badge>
                      <span>{lunaAn(n.iso)}</span>
                    </span>
                    <span className={s.newsTitle}>{n.titlu}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <Section title="Ghiduri citite des" action={<ButtonLink href="/ghiduri" variant="ghost" size="sm" icon="arrowRight">Toate ghidurile</ButtonLink>}>
          <div className={s.calcGrid}>
            {GHIDURI_POPULARE.map((g) => <LinkCard key={g.href} href={g.href} title={g.title} desc={g.desc} icon="book" meta="Citește ghidul" />)}
          </div>
        </Section>

        <section className={s.ana}>
          <div>
            <p className={s.anaEyebrow}><Icon name="bot" size={16} /> Asistent fiscal</p>
            <h2>Ai o întrebare care nu încape într-un calculator?</h2>
            <p>ANA răspunde la întrebări despre PFA, SRL, salarii și investiții, pe baza regulilor fiscale din 2026.</p>
          </div>
          <ButtonLink href="/manager/ai" icon="arrowRight">Întreabă-o pe ANA</ButtonLink>
        </section>
      </Container>
    </Main>
  );
}
