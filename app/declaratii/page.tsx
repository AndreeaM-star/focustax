import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import D212Chenar from "@/components/D212Chenar";
import styles from "./page.module.css";

export const metadata = {
  title: "Declarații | FocusTax",
  description: "Ghid complet al declarațiilor fiscale din România.",
};

const categorii = [
  {
    titlu: "TVA",
    culoare: "#d97706",
    declaratii: [
      { cod: "D300", nume: "Decontul de TVA", periodicitate: "Lunar / Trimestrial", href: "/declaratii/d300" },
      { cod: "D301", nume: "Decont special de TVA", periodicitate: "Lunar", href: "/declaratii/d301" },
      { cod: "D390", nume: "Declarație recapitulativă (VIES)", periodicitate: "Lunar", href: "/declaratii/d390" },
      { cod: "D394", nume: "Declarație informativă livrări/prestări", periodicitate: "Lunar / Trimestrial", href: "/declaratii/d394" },
    ],
  },
  {
    titlu: "Impozit pe Profit",
    culoare: "#059669",
    declaratii: [
      { cod: "D101", nume: "Declarație privind impozitul pe profit", periodicitate: "Anual", href: "/declaratii/d101" },
      { cod: "D012", nume: "Notificare sistem plăți anticipate", periodicitate: "Ocazional", href: "/declaratii/d012" },
      { cod: "D100", nume: "Declarație privind obligațiile de plată", periodicitate: "Lunar / Trimestrial", href: "/declaratii/d100" },
    ],
  },
  {
    titlu: "Impozit pe Venit",
    culoare: "#dc2626",
    declaratii: [
      { cod: "D200", nume: "Declarație privind veniturile realizate", periodicitate: "Anual", href: "/declaratii/d200" },
      { cod: "D212", nume: "Declarație Unică — impozit venit + contribuții", periodicitate: "Anual", href: "/declaratii/d212" },
      { cod: "D220", nume: "Declarație privind venitul estimat", periodicitate: "Anual", href: "/declaratii/d220" },
      { cod: "D230", nume: "Cerere privind destinația a 3.5% din impozit", periodicitate: "Anual", href: "/declaratii/d230" },
    ],
  },
  {
    titlu: "Contribuții Sociale",
    culoare: "#2563eb",
    declaratii: [
      { cod: "D112", nume: "Declarație privind obligațiile de plată a contribuțiilor sociale", periodicitate: "Lunar", href: "/declaratii/d112" },
      { cod: "D204", nume: "Declarație privind CAS pentru activități independente", periodicitate: "Anual", href: "/declaratii/d204" },
      { cod: "D216", nume: "Declarație privind CASS pentru activități independente", periodicitate: "Anual", href: "/declaratii/d216" },
    ],
  },
  {
    titlu: "Accize",
    culoare: "#7c3aed",
    declaratii: [
      { cod: "D100", nume: "Declarație privind accizele datorate", periodicitate: "Lunar", href: "/declaratii/d100" },
      { cod: "D120", nume: "Decont privind accizele", periodicitate: "Lunar", href: "/declaratii/d120" },
      { cod: "D130", nume: "Declarație privind impozitul la țițeiul din producția internă", periodicitate: "Lunar", href: "/declaratii/d130" },
    ],
  },
];

export default function DeclaratiiPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Declarații Fiscale</h1>
        <p className={styles.subtitle}>
          Ghid complet al declarațiilor fiscale din România, organizat pe categorii.
        </p>
        <D212Chenar />

        <div className={styles.grid}>
          {categorii.map((cat) => (
            <div key={cat.titlu} className={styles.card}>
              <div className={styles.cardHeader} style={{ borderColor: cat.culoare }}>
                <span className={styles.cardIcon} style={{ color: cat.culoare }}>●</span>
                <h2 className={styles.cardTitle} style={{ color: cat.culoare }}>{cat.titlu}</h2>
              </div>
              <ul className={styles.list}>
                {cat.declaratii.map((d) => (
                  <li key={d.cod + cat.titlu} className={styles.listItem}>
                    <span className={styles.cod}>{d.cod}</span>
                    <Link href={d.href} className={styles.numeLink}>{d.nume}</Link>
                    <span className={styles.periodicitate}>{d.periodicitate}</span>
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
