import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhiduriGrid from "@/components/GhiduriGrid";
import styles from "./page.module.css";

export const metadata = {
  title: "Ghiduri Fiscale România | FocusTax",
  description:
    "Ghiduri practice complete pentru PFA, SRL, microîntreprinderi și persoane fizice din România — înregistrare PFA, contribuții, TVA, dividende și mai mult.",
  openGraph: {
    title: "Ghiduri Fiscale România 2026 | FocusTax",
    description:
      "Cum te înregistrezi ca PFA, CAS și CASS, TVA, impozit chirii — ghiduri pas cu pas, gratuit.",
  },
};

const ghiduri = [
  {
    categorie: "Ghiduri noi 2026",
    culoare: "#dc2626",
    lista: [
      { titlu: "Ghid complet D212 2026", desc: "Wizard interactiv pas cu pas. Termen depunere: 25 mai 2026 (bonificația 3% din 15 apr. a expirat).", slug: "d212-ghid-completare" },
      { titlu: "Facilități fiscale IT, Construcții, Agricultură", desc: "Calculator comparativ cu/fără scutire impozit venit. Condiții eligibilitate.", slug: "facilitati-fiscale" },
      { titlu: "Impozite locale 2026", desc: "Calculator impozit clădiri și autoturisme. Creșteri față de 2025.", slug: "impozite-locale-2026" },
    ],
  },
  {
    categorie: "PFA & II",
    culoare: "#2563eb",
    lista: [
      { titlu: "Cum te înregistrezi ca PFA", desc: "Pași, documente necesare și costuri la ONRC.", slug: "inregistrare-pfa" },
      { titlu: "Sistem real vs normă de venit", desc: "Când este avantajoasă norma și când sistemul real.", slug: "sistem-real-norma" },
      { titlu: "CAS și CASS pentru PFA", desc: "Calcul contribuții, plafoane și termene de plată 2026.", slug: "contributii-sociale" },
      { titlu: "Declarația Unică D212 — ghid complet", desc: "Completare, depunere și bonificație 3% — pas cu pas.", slug: "d212-ghid-completare" },
    ],
  },
  {
    categorie: "SRL & Microîntreprinderi",
    culoare: "#059669",
    lista: [
      { titlu: "SRL vs Microîntreprindere", desc: "Diferențe de impozitare, condiții de încadrare și trecere la profit.", slug: "srl-vs-micro" },
      { titlu: "Dividende: cum se impozitează", desc: "Impozit 16% din 2026, declarare și plată la ANAF.", slug: "dividende" },
      { titlu: "Salarii — de la brut la net", desc: "CAS 25%, CASS 10%, impozit 10% — formulă completă 2026.", slug: "salarii-retineri" },
      { titlu: "Sponsorizări — reducere din impozit", desc: "20% din impozit (max 0.75% CA) — cum funcționează.", slug: "sponsorizari" },
    ],
  },
  {
    categorie: "TVA",
    culoare: "#d97706",
    lista: [
      { titlu: "Ghid complet TVA 2026", desc: "Înregistrare (prag 395.000 lei), cote 21%/11%/9%, decont D300.", slug: "inregistrare-tva" },
    ],
  },
  {
    categorie: "Persoane Fizice",
    culoare: "#7c3aed",
    lista: [
      { titlu: "Impozit pe chirii", desc: "Deducere 40%, declarare D212 și obligații fiscale.", slug: "impozit-chirii" },
      { titlu: "SPV — Spațiul Privat Virtual", desc: "Creare cont, utilizare și depunere declarații online.", slug: "spv-ghid" },
    ],
  },
];

export default function GhiduriPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.hero}>
          <span className={styles.heroIcon}>📚</span>
          <h1 className={styles.title}>
            Ghiduri <span className={styles.titleAccent}>Fiscale</span>
          </h1>
          <p className={styles.subtitle}>
            Ghiduri practice pentru contribuabilii din România — PFA, SRL, microîntreprinderi și persoane fizice.
          </p>
        </div>
        <GhiduriGrid ghiduri={ghiduri} />
      </main>
      <Footer />
    </>
  );
}
