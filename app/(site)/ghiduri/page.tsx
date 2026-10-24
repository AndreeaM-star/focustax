import type { Metadata } from "next";
import { Container, PageHeader, Section, LinkCard, Main, Badge } from "@/components/ui";
import { ghiduri } from "./[slug]/data";
import { absUrl } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Ghiduri fiscale 2026: PFA, SRL, TVA, dividende, chirii",
  description: "Ghiduri pas cu pas pentru contribuabilii din România, actualizate 2026: cum îți deschizi un PFA, CAS și CASS, micro vs profit, dividende, TVA, chirii, Declarația unică.",
  alternates: { canonical: absUrl("/ghiduri") },
};

const SPECIALE = [
  { href: "/ghiduri/d212-ghid-completare", titlu: "Declarația unică D212, pas cu pas", desc: "Completarea interactivă a declarației: venituri, CAS, CASS și estimarea pentru anul următor." },
  { href: "/ghiduri/impozite-locale-2026", titlu: "Impozite locale 2026", desc: "Calculează impozitul pe clădiri și pe mașină după noile reguli." },
  { href: "/ghiduri/facilitati-fiscale", titlu: "Facilități fiscale", desc: "Scutiri și reduceri pentru IT, construcții, agricultură și alte domenii." },
];

const ORDINE = ["PFA & II", "SRL & Microîntreprinderi", "TVA", "Persoane Fizice"];

export default function GhiduriPage() {
  const toate = Object.values(ghiduri);
  const rang = (c: string) => (ORDINE.includes(c) ? ORDINE.indexOf(c) : ORDINE.length);
  const categorii = Array.from(new Set(toate.map((g) => g.categorie))).sort((a, b) => rang(a) - rang(b));

  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Ghiduri" }]}
        eyebrow="Ghiduri fiscale · 2026"
        title="Ghiduri fiscale, explicate pe înțeles"
        lead={`${toate.length + SPECIALE.length} ghiduri practice pentru PFA, firme, salariați și persoane fizice, cu exemple de calcul după regulile din 2026.`}
      />
      <Container>
        <Section title="Ghiduri interactive">
          <div className={s.grid}>
            {SPECIALE.map((g) => <LinkCard key={g.href} href={g.href} title={g.titlu} desc={g.desc} icon="sparkles" badge={<Badge tone="brand">interactiv</Badge>} meta="Deschide" />)}
          </div>
        </Section>

        {categorii.map((cat) => (
          <Section key={cat} title={cat}>
            <div className={s.grid}>
              {toate.filter((g) => g.categorie === cat).map((g) => (
                <LinkCard key={g.slug} href={`/ghiduri/${g.slug}`} title={g.titlu} desc={g.desc} icon="book" meta="Citește ghidul" />
              ))}
            </div>
          </Section>
        ))}
      </Container>
    </Main>
  );
}
