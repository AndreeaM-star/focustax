import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Noutăți Fiscale | FocusTax",
  description: "Ultimele modificări legislative și noutăți fiscale din România.",
};

const noutati = [
  {
    data: "Martie 2025",
    tag: "TVA",
    tagColor: "#d97706",
    titlu: "Plafonul de înregistrare TVA rămâne la 300.000 lei",
    desc: "ANAF confirmă menținerea plafonului de 300.000 lei pentru înregistrarea obligatorie în scopuri de TVA pentru anul fiscal 2025.",
  },
  {
    data: "Ianuarie 2025",
    tag: "Impozit Venit",
    tagColor: "#7c3aed",
    titlu: "Termenul D212 — 25 mai 2025",
    desc: "Declarația Unică 212 pentru veniturile din 2024 se depune până pe 25 mai 2025. Se poate depune online prin SPV sau la ghișeele ANAF.",
  },
  {
    data: "Ianuarie 2025",
    tag: "Microîntreprinderi",
    tagColor: "#059669",
    titlu: "Cota impozit microîntreprinderi — 1% sau 3%",
    desc: "Firmele cu cel puțin un salariat și venituri sub 500.000 euro aplică cota de 1%. Cele fără salariați sau cu venituri din consultanță peste 20% aplică 3%.",
  },
  {
    data: "Decembrie 2024",
    tag: "Contribuții",
    tagColor: "#2563eb",
    titlu: "Salariul minim brut 2025 — 4.050 lei",
    desc: "Salariul minim brut garantat în plată a crescut la 4.050 lei/lună de la 1 octombrie 2024, bază de calcul pentru CAS și CASS minimum.",
  },
  {
    data: "Noiembrie 2024",
    tag: "SPV",
    tagColor: "#374151",
    titlu: "Depunere obligatorie online pentru firme",
    desc: "Persoanele juridice au obligația de a depune declarațiile fiscal exclusiv prin Spațiul Privat Virtual (SPV) sau sistemul de e-Filing ANAF.",
  },
  {
    data: "Octombrie 2024",
    tag: "Profit",
    tagColor: "#dc2626",
    titlu: "Impozit minim pe cifra de afaceri — actualizare",
    desc: "Firmele cu profit impozabil sub impozitul minim pe cifra de afaceri sunt obligate să plătească impozitul minim calculat conform noilor grile.",
  },
];

export default function NoutatiPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Noutăți Fiscale</h1>
        <p className={styles.subtitle}>
          Ultimele modificări legislative și noutăți fiscale din România, actualizate regulat.
        </p>
        <div className={styles.lista}>
          {noutati.map((n) => (
            <article key={n.titlu} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.tag} style={{ borderColor: n.tagColor, color: n.tagColor }}>{n.tag}</span>
                <span className={styles.data}>{n.data}</span>
              </div>
              <h2 className={styles.cardTitlu}>{n.titlu}</h2>
              <p className={styles.cardDesc}>{n.desc}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
