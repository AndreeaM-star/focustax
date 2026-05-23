import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ghiduri } from "./data";
import GhidClient from "./GhidClient";

export function generateStaticParams() {
  return Object.keys(ghiduri).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = ghiduri[slug];
  if (!data) return {};
  return {
    title: `${data.titlu} | FocusTax`,
    description: data.desc,
    twitter: { card: "summary_large_image", title: `${data.titlu} | FocusTax`, description: data.desc },
    alternates: { canonical: `https://focustax.ro/ghiduri/${slug}` },
  };
}

export default async function GhidPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = ghiduri[slug];
  if (!data) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "FocusTax", "item": "https://focustax.ro" },
      { "@type": "ListItem", "position": 2, "name": "Ghiduri Fiscale", "item": "https://focustax.ro/ghiduri" },
      { "@type": "ListItem", "position": 3, "name": data.titlu, "item": `https://focustax.ro/ghiduri/${slug}` },
    ],
  };

  const faqJsonLd = data.sectiuni.length >= 2 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.sectiuni.slice(0, 6).map((s) => ({
      "@type": "Question",
      "name": s.titlu,
      "acceptedAnswer": { "@type": "Answer", "text": s.continut.join(" ") },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Navbar />
      <GhidClient data={data} />
      <Footer />
    </>
  );
}
