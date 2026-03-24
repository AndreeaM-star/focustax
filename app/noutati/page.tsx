import Link from "next/link";
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
    desc: "Declarația Unică 212 pentru veniturile din 2025 se depune până pe 25 mai 2026. Se poate depune online prin SPV sau la ghișeele ANAF. Contribuabilii cu venituri estimate pentru 2026 completează și Capitolul II — estimare impozit și contribuții pentru 2026.",
    link: "/declaratii/d212",
  },
  {
    data: "Ianuarie 2026",
    tag: "Salarii",
    tagColor: "#059669",
    titlu: "Salariul minim brut 2026 — 4.050 lei",
    desc: "Salariul minim brut garantat în plată rămâne la 4.050 lei/lună conform HG 1200/2023. Acesta reprezintă baza minimă de calcul pentru CAS și CASS pentru PFA-uri și activități independente. Salariul minim în construcții este 4.582 lei.",
  },
  {
    data: "Ianuarie 2026",
    tag: "Microîntreprinderi",
    tagColor: "#059669",
    titlu: "Impozit microîntreprinderi 2026 — cote 1% și 3%",
    desc: "Firmele cu cel puțin un salariat și venituri sub 500.000 euro aplică cota de 1%. Cele fără salariați sau cu venituri din consultanță/management peste 20% din CA aplică 3%. Condiție nouă: acționarul poate deține maxim 25% din alte microîntreprinderi.",
    link: "/ghiduri/srl-vs-micro",
  },
  {
    data: "Ianuarie 2026",
    tag: "Dividende",
    tagColor: "#dc2626",
    titlu: "Impozit dividende 2026 — confirmarea cotei de 8%",
    desc: "Cota de impozit pe dividende distribuise persoanelor fizice rămâne la 8%, menținută de la modificarea din 2024. Impozitul se reține la sursă de societate și se declară prin D205 până la 31 ianuarie 2026 pentru dividendele plătite în 2025.",
    link: "/ghiduri/dividende",
  },
  {
    data: "Decembrie 2025",
    tag: "e-Factura",
    tagColor: "#2563eb",
    titlu: "e-Factura — extinsă la toate tranzacțiile B2B din 2025",
    desc: "Din 2025, obligația de transmitere a facturilor în sistemul RO e-Factura s-a extins la toate tranzacțiile B2B, inclusiv cu parteneri neplătitori de TVA. Termenul de transmitere rămâne 5 zile calendaristice de la data emiterii. Amenda pentru netransmitere: 5.000 lei.",
    link: "/sisteme/ro-e-factura",
  },
  {
    data: "Noiembrie 2025",
    tag: "TVA",
    tagColor: "#d97706",
    titlu: "RO e-TVA — implementare pentru contribuabilii mari",
    desc: "ANAF a lansat sistemul RO e-TVA pentru contribuabilii mari — D300 precompletat pe baza facturilor din e-Factura. Contribuabilii verifică datele precompletate, fac corecțiile necesare și depun declarația finală. Extinderea la toți plătitorii de TVA se face gradual în 2026.",
    link: "/sisteme/ro-e-tva",
  },
  {
    data: "Noiembrie 2025",
    tag: "TVA",
    tagColor: "#d97706",
    titlu: "Plafonul de înregistrare TVA — menținut la 300.000 lei",
    desc: "ANAF confirmă menținerea plafonului de 300.000 lei pentru înregistrarea obligatorie în scopuri de TVA. Depășirea plafonului obligă la înregistrare în termen de 10 zile de la sfârșitul lunii calendaristice în care a fost depășit. TVA la încasare rămâne opțional pentru plătitorii sub 4.500.000 lei CA.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    data: "Octombrie 2025",
    tag: "Profit",
    tagColor: "#7c3aed",
    titlu: "Impozit minim pe cifra de afaceri — clarificări ANAF",
    desc: "ANAF a emis clarificări privind aplicarea impozitului minim pe CA pentru firmele plătitoare de impozit pe profit al căror impozit calculat (16%) este sub pragul minim stabilit pe grile de CA. Grila se aplică progresiv în funcție de cifra de afaceri: de la 1% (sub 100M lei) la 0.5% (peste 1 mld lei).",
  },
  {
    data: "Septembrie 2025",
    tag: "e-Transport",
    tagColor: "#d97706",
    titlu: "RO e-Transport — noi categorii de bunuri adăugate",
    desc: "ANAF a extins lista bunurilor cu risc fiscal ridicat supuse monitorizării e-Transport. Noile categorii includ materiale de construcții, produse cosmetice de lux și echipamente electronice. Penalitățile pentru lipsa codului UIT au crescut la 50.000 lei pentru persoane juridice.",
    link: "/sisteme/ro-e-transport",
  },
  {
    data: "Septembrie 2025",
    tag: "SPV",
    tagColor: "#374151",
    titlu: "SPV actualizat — interfață nouă și autentificare îmbunătățită",
    desc: "ANAF a actualizat interfața SPV cu un design mai modern și autentificare prin Face ID/Touch ID pe dispozitive mobile. Au fost adăugate funcționalități noi: vizualizare situație fiscală consolidată, descărcare documente arhivate și notificări push. Depunerea la ghișeu pentru persoane juridice nu mai este acceptată.",
    link: "/sisteme/spv",
  },
  {
    data: "Iulie 2025",
    tag: "Penalități",
    tagColor: "#dc2626",
    titlu: "Dobânzi și penalități ANAF — actualizare 2025",
    desc: "Rata dobânzii pentru obligații fiscale neachitate a fost actualizată la 0.02% pe zi de întârziere (7.3% anual). Penalitățile de întârziere sunt tot 0.01% pe zi. La depășirea a 30 de zile de la scadență se aplică o penalitate de nedeclarare de 0.08% pe zi, aplicată retroactiv.",
  },
  {
    data: "Iunie 2025",
    tag: "Cod Fiscal",
    tagColor: "#6366f1",
    titlu: "Modificări Cod Fiscal 2025-2026 — principalele schimbări",
    desc: "Principalele modificări aduse Codului Fiscal prin Legea 296/2023 și OUG 115/2023 intrate în vigoare în 2025: majorarea cotei dividende 5%→8%, impozit minim CA pentru companii mari, noi condiții microîntreprinderi, extinderea e-Factura la B2B. Consultați un expert fiscal pentru situația specifică.",
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
                {"link" in n && n.link && (
                  <Link href={n.link} className={styles.cardLink}>→ Citește mai mult</Link>
                )}
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
