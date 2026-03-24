import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPARATII, COMPARATII_IDS } from "./data";
import ComparatiiClient from "./ComparatiiClient";

export function generateStaticParams() {
  return COMPARATII_IDS.map((tip) => ({ tip }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tip: string }>;
}): Promise<Metadata> {
  const { tip } = await params;
  const date = COMPARATII[tip];
  if (!date) return { title: "Comparații | FocusTax" };
  return {
    title: `${date.titlu} — Comparații Europene | FocusTax`,
    description: date.descriere,
  };
}

export default async function ComparatieTipPage({
  params,
}: {
  params: Promise<{ tip: string }>;
}) {
  const { tip } = await params;
  const date = COMPARATII[tip];
  if (!date) notFound();
  return (
    <>
      <Navbar />
      <ComparatiiClient date={date} />
      <Footer />
    </>
  );
}
