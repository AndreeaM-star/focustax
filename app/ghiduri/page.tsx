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
    categorie: "PFA & II",
    culoare: "#2563eb",
    lista: [
      { titlu: "Cum te înregistrezi ca PFA", desc: "Pași, documente necesare și costuri la ONRC.", slug: "inregistrare-pfa" },
      { titlu: "Sistem real vs normă de venit", desc: "Când este avantajoasă norma și când sistemul real.", slug: "sistem-real-norma" },
      { titlu: "CAS și CASS pentru PFA", desc: "Calcul contribuții, plafoane și termene de plată.", slug: "contributii-sociale" },
      { titlu: "Declarația Unică D212 pentru PFA", desc: "Ghid complet de completare și depunere.", slug: "d212-pfa" },
    ],
  },
  {
    categorie: "SRL & Microîntreprinderi",
    culoare: "#059669",
    lista: [
      { titlu: "SRL vs Microîntreprindere", desc: "Diferențe de impozitare, condiții de încadrare și trecere la impozit pe profit.", slug: "srl-vs-micro" },
      { titlu: "Dividende: cum se impozitează", desc: "Impozit 8%, declarare și plată la ANAF.", slug: "dividende" },
    ],
  },
  {
    categorie: "TVA",
    culoare: "#d97706",
    lista: [
      { titlu: "Ghid complet TVA", desc: "Înregistrare (plafon 300.000 lei), cote 19%/9%/5%, decontul D300 și TVA la încasare.", slug: "inregistrare-tva" },
    ],
  },
  {
    categorie: "Persoane Fizice",
    culoare: "#7c3aed",
    lista: [
      { titlu: "Impozit pe chirii", desc: "Calcul, declarare D212 și obligații fiscale.", slug: "impozit-chirii" },
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
