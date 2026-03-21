import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      { titlu: "Cum te înregistrezi ca PFA", desc: "Pași, documente necesare și costuri la ONRC." },
      { titlu: "Sistem real vs normă de venit", desc: "Când este avantajoasă norma și când sistemul real." },
      { titlu: "CAS și CASS pentru PFA", desc: "Calcul contribuții, plafoane și termene de plată." },
      { titlu: "Declarația Unică D212 pentru PFA", desc: "Ghid complet de completare și depunere." },
    ],
  },
  {
    categorie: "SRL & Microîntreprinderi",
    culoare: "#059669",
    lista: [
      { titlu: "SRL vs Microîntreprindere", desc: "Diferențe de impozitare și condiții de încadrare." },
      { titlu: "Impozit 1% sau 3% pe cifra de afaceri", desc: "Criterii de aplicare și exemple practice." },
      { titlu: "Dividende: cum se impozitează", desc: "Impozit 8%, declarare și plată la ANAF." },
      { titlu: "Trecerea la impozit pe profit", desc: "Când și cum faci trecerea obligatorie." },
    ],
  },
  {
    categorie: "TVA",
    culoare: "#d97706",
    lista: [
      { titlu: "Când te înregistrezi în scopuri de TVA", desc: "Plafon 300.000 lei și înregistrare voluntară." },
      { titlu: "Cote TVA aplicabile în România", desc: "19%, 9% și 5% — ce se aplică unde." },
      { titlu: "Decontul D300 — ghid de completare", desc: "Cum completezi și depui decontul lunar/trimestrial." },
      { titlu: "TVA la încasare", desc: "Sistem special pentru firme mici — avantaje și obligații." },
    ],
  },
  {
    categorie: "Persoane Fizice",
    culoare: "#7c3aed",
    lista: [
      { titlu: "Impozit pe chirii", desc: "Calcul, declarare D212 și obligații fiscale." },
      { titlu: "Venituri din investiții", desc: "Dividende, dobânzi și câștiguri din tranzacții bursiere." },
      { titlu: "Donarea a 3.5% din impozit", desc: "Ghid complet pentru formularul D230." },
      { titlu: "SPV — Spațiul Privat Virtual", desc: "Creare cont, utilizare și depunere declarații online." },
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
        <div className={styles.grid}>
          {ghiduri.map((g) => (
            <div key={g.categorie} className={styles.card}>
              <div className={styles.cardHeader} style={{ borderColor: g.culoare }}>
                <span className={styles.cardDot} style={{ background: g.culoare }} />
                <h2 className={styles.cardTitle} style={{ color: g.culoare }}>{g.categorie}</h2>
              </div>
              <ul className={styles.list}>
                {g.lista.map((item) => (
                  <li key={item.titlu} className={styles.listItem}>
                    <span className={styles.itemTitlu}>{item.titlu}</span>
                    <span className={styles.itemDesc}>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
