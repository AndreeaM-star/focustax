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
  };
}

export default async function GhidPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = ghiduri[slug];
  if (!data) notFound();

  return (
    <>
      <Navbar />
      <GhidClient data={data} />
      <Footer />
    </>
  );
}
