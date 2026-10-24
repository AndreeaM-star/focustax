import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, PageHeader, Section, ButtonLink, Main } from "@/components/ui";
import { NOUTATI, getNoutate, lunaAn } from "@/lib/noutati";
import { absUrl } from "@/lib/site";
import s from "../noutati.module.css";

export function generateStaticParams() {
  return NOUTATI.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNoutate(slug);
  if (!n) return {};
  const descriere = n.desc.replace(/\s+/g, " ").slice(0, 155);
  return {
    title: n.titlu,
    description: descriere,
    alternates: { canonical: absUrl(`/noutati/${slug}`) },
    openGraph: { title: n.titlu, description: descriere, type: "article", url: absUrl(`/noutati/${slug}`) },
  };
}

export default async function NoutatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNoutate(slug);
  if (!n) notFound();

  const alte = NOUTATI.filter((x) => x.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.titlu,
    datePublished: `${n.iso}-01`,
    dateModified: `${n.iso}-01`,
    inLanguage: "ro-RO",
    mainEntityOfPage: absUrl(`/noutati/${slug}`),
    author: { "@type": "Organization", name: "FocusTax" },
    publisher: { "@type": "Organization", name: "FocusTax", logo: { "@type": "ImageObject", url: absUrl("/icon.svg").replace(/\/$/, "") } },
  };

  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Noutăți", href: "/noutati" }, { label: n.titlu }]}
        eyebrow={<>{n.tag} · {lunaAn(n.iso)}</>}
        title={n.titlu}
      />
      <Container>
        <article className={s.article}>
          <div className={s.articleBody}>
            {n.desc.split(/\n\n+/).map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className={s.more}>
            {n.link && <ButtonLink href={n.link} icon="arrowRight">Citește ghidul complet</ButtonLink>}
            <ButtonLink href="/noutati" variant="secondary">Toate noutățile</ButtonLink>
          </div>
        </article>

        <Section title="Alte noutăți">
          <ul className={s.list} style={{ marginTop: 0 }}>
            {alte.map((x) => (
              <li key={x.slug}>
                <a href={`/noutati/${x.slug}/`} className={s.item}>
                  <span className={s.date}>{lunaAn(x.iso)}</span>
                  <div><h3 className={s.title}>{x.titlu}</h3></div>
                  <span />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Main>
  );
}
