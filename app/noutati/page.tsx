import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Noutăți Fiscale 2026 | FocusTax",
  description:
    "Ultimele modificări legislative și noutăți fiscale din România — termene D212, modificări Cod Fiscal, noutăți ANAF 2026.",
  openGraph: {
    title: "Noutăți Fiscale România 2026 | FocusTax",
    description:
      "Fii la curent cu modificările fiscale: noi cote, termene și obligații pentru contribuabilii din România.",
  },
};

const noutati = [
  {
    data: "Martie 2026",
    tag: "Impozit Venit",
    tagColor: "#dc2626",
    titlu: "Termen D212 — 25 mai 2026",
    desc: "Declarația Unică 212 pentru veniturile din 2025 se depune până pe 25 mai 2026. Se poate depune online prin SPV sau la ghișeele ANAF. Contribuabilii cu venituri estimate pentru 2026 completează și Capitolul II.",
  },
  {
    data: "Ianuarie 2026",
    tag: "Salarii",
    tagColor: "#059669",
    titlu: "Salariul minim brut 2026 — 4.050 lei",
    desc: "Salariul minim brut garantat în plată rămâne la 4.050 lei/lună. Acesta reprezintă baza minimă de calcul pentru CAS și CASS pentru PFA-uri și activități independente.",
  },
  {
    data: "Ianuarie 2026",
    tag: "Microîntreprinderi",
    tagColor: "#059669",
    titlu: "Impozit microîntreprinderi 2026 — cote 1% și 3%",
    desc: "Firmele cu cel puțin un salariat și venituri sub 500.000 euro aplică cota de 1%. Cele fără salariați sau cu venituri din consultanță/management peste 20% din CA aplică 3%.",
  },
  {
    data: "Noiembrie 2025",
    tag: "TVA",
    tagColor: "#d97706",
    titlu: "Plafonul de înregistrare TVA — 300.000 lei",
    desc: "ANAF confirmă menținerea plafonului de 300.000 lei pentru înregistrarea obligatorie în scopuri de TVA. Depășirea plafonului obligă la înregistrare în termen de 10 zile de la sfârșitul lunii.",
  },
  {
    data: "Octombrie 2025",
    tag: "Profit",
    tagColor: "#dc2626",
    titlu: "Impozit minim pe cifra de afaceri — clarificări ANAF",
    desc: "ANAF a emis clarificări privind aplicarea impozitului minim pe CA pentru firmele plătitoare de impozit pe profit al căror impozit calculat (16%) este sub pragul minim stabilit pe grile de CA.",
  },
  {
    data: "Septembrie 2025",
    tag: "SPV",
    tagColor: "#374151",
    titlu: "Depunere obligatorie online pentru persoane juridice",
    desc: "Persoanele juridice au obligația de a depune toate declarațiile fiscal exclusiv prin Spațiul Privat Virtual (SPV) sau sistemul de e-Filing ANAF. Depunerea la ghișeu rămâne disponibilă doar pentru persoane fizice.",
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

        <div className={styles.timeline}>
          {noutati.map((n, i) => (
            <article key={n.titlu} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.timelineDot} style={{ borderColor: n.tagColor }} />
              <div className={styles.card}>
                <div className={styles.cardMeta}>
                  <span className={styles.tag} style={{ borderColor: n.tagColor, color: n.tagColor }}>{n.tag}</span>
                  <span className={styles.data}>{n.data}</span>
                </div>
                <h2 className={styles.cardTitlu}>{n.titlu}</h2>
                <p className={styles.cardDesc}>{n.desc}</p>
              </div>
            </article>
          ))}
          <div className={styles.timelineLine} />
        </div>
      </main>
      <Footer />
    </>
  );
}
