import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhiduriGrid from "@/components/GhiduriGrid";
import styles from "./page.module.css";

export const metadata = {
  title: "Ghiduri Fiscale | FocusTax",
  description: "Ghiduri practice pentru PFA, SRL, microîntreprinderi și persoane fizice din România.",
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
      { titlu: "SRL vs Microîntreprindere", desc: "Diferențe de impozitare și condiții de încadrare.", slug: "srl-vs-micro" },
      { titlu: "Impozit 1% sau 3% pe cifra de afaceri", desc: "Criterii de aplicare și exemple practice.", slug: "srl-vs-micro" },
      { titlu: "Dividende: cum se impozitează", desc: "Impozit 8%, declarare și plată la ANAF.", slug: "dividende" },
      { titlu: "Trecerea la impozit pe profit", desc: "Când și cum faci trecerea obligatorie.", slug: "srl-vs-micro" },
    ],
  },
  {
    categorie: "TVA",
    culoare: "#d97706",
    lista: [
      { titlu: "Când te înregistrezi în scopuri de TVA", desc: "Plafon 300.000 lei și înregistrare voluntară.", slug: "inregistrare-tva" },
      { titlu: "Cote TVA aplicabile în România", desc: "19%, 9% și 5% — ce se aplică unde.", slug: "inregistrare-tva" },
      { titlu: "Decontul D300 — ghid de completare", desc: "Cum completezi și depui decontul lunar/trimestrial.", slug: "inregistrare-tva" },
      { titlu: "TVA la încasare", desc: "Sistem special pentru firme mici — avantaje și obligații.", slug: "inregistrare-tva" },
    ],
  },
  {
    categorie: "Persoane Fizice",
    culoare: "#7c3aed",
    lista: [
      { titlu: "Impozit pe chirii", desc: "Calcul, declarare D212 și obligații fiscale.", slug: "impozit-chirii" },
      { titlu: "Venituri din investiții", desc: "Dividende, dobânzi și câștiguri din tranzacții bursiere.", slug: "dividende" },
      { titlu: "Donarea a 3.5% din impozit", desc: "Ghid complet pentru formularul D230.", slug: "inregistrare-pfa" },
      { titlu: "SPV — Spațiul Privat Virtual", desc: "Creare cont, utilizare și depunere declarații online.", slug: "spv-ghid" },
    ],
  },
];

export default function GhiduriPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Ghiduri Fiscale</h1>
        <p className={styles.subtitle}>
          Ghiduri practice pentru contribuabilii din România — PFA, SRL, microîntreprinderi și persoane fizice.
        </p>
        <GhiduriGrid ghiduri={ghiduri} />
      </main>
      <Footer />
    </>
  );
}
