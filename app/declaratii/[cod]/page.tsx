import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { declaratii } from "./data";
import DeclaratieClient from "./DeclaratieClient";

export function generateStaticParams() {
  return Object.keys(declaratii).map((cod) => ({ cod }));
}

export async function generateMetadata({ params }: { params: Promise<{ cod: string }> }) {
  const { cod } = await params;
  const data = declaratii[cod.toLowerCase()];
  if (!data) return {};
  return {
    title: `${data.cod} | FocusTax`,
    description: data.subtitle,
  };
}

export default async function DeclaratiePage({ params }: { params: Promise<{ cod: string }> }) {
  const { cod } = await params;
  const data = declaratii[cod.toLowerCase()];

  if (!data) notFound();

  return (
    <>
      <Navbar />
      <DeclaratieClient data={data} />
      <Footer />
    </>
  );
}
