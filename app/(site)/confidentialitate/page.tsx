import type { Metadata } from "next";
import { Container, PageHeader, Main } from "@/components/ui";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate și cookie-uri",
  description: "Ce date prelucrează FocusTax, de ce, cât timp le păstrăm și ce drepturi ai.",
  alternates: { canonical: absUrl("/confidentialitate") },
};

const ACTUALIZAT = "26 octombrie 2026";

export default function ConfidentialitatePage() {
  return (
    <Main>
      <PageHeader crumbs={[{ label: "Confidențialitate" }]} eyebrow={`Actualizat: ${ACTUALIZAT}`} title="Politica de confidențialitate" />
      <Container>
        <div className="prose">
          <p>
            FocusTax.ro oferă calculatoare și informații fiscale generale. Pe paginile publice nu ai nevoie de cont și nu îți cerem date personale.
            Mai jos explicăm, pe scurt, ce date ajung totuși la noi și de ce.
          </p>

          <h2>Cine prelucrează datele</h2>
          <p>
            Operatorul site-ului FocusTax.ro. Ne poți scrie oricând la <a href="mailto:focustaxro@gmail.com">focustaxro@gmail.com</a> pentru orice întrebare
            sau cerere legată de datele tale.
          </p>

          <h2>Ce date prelucrăm</h2>
          <ul>
            <li><strong>Calculatoarele</strong> rulează în browserul tău. Sumele introduse nu sunt trimise și nu sunt salvate pe serverele noastre.</li>
            <li><strong>Statistici de trafic (Google Analytics)</strong> — doar dacă apeși „Accept” în bannerul de cookie-uri: paginile vizitate, tipul de dispozitiv, țara/orașul aproximativ, sursa vizitei. Fără acord, Google Analytics nu salvează cookie-uri.</li>
            <li><strong>Statistici anonime (Vercel Web Analytics)</strong> — număr de vizite și pagini, fără cookie-uri și fără identificarea vizitatorilor.</li>
            <li><strong>Abonarea la alerte fiscale</strong> — dacă te abonezi: adresa de e-mail, profilul ales (ex. PFA, chirii) și momentul acordului. Le folosim doar ca să-ți trimitem termenele și noutățile alese.</li>
            <li><strong>Asistentul AI Iris</strong> — întrebările tale sunt trimise unui furnizor de modele AI ca să generăm răspunsul. Înainte de trimitere eliminăm automat CNP-urile și IBAN-urile. Te rugăm să nu scrii date personale în întrebări.</li>
            <li><strong>Modulul Manager</strong> (pentru firme) — datele firmei introduse de tine (facturi, angajați, tranzacții) sunt păstrate în baza noastră de date, pentru ca modulul să funcționeze.</li>
            <li><strong>E-mailurile</strong> pe care ni le trimiți — doar ca să îți răspundem.</li>
          </ul>

          <h2>Temeiul legal</h2>
          <ul>
            <li>Consimțământul tău, pentru Google Analytics și pentru alertele pe e-mail (art. 6 alin. 1 lit. a GDPR). Îl poți retrage oricând.</li>
            <li>Executarea serviciului pe care îl ceri, pentru asistentul AI și modulul Manager (art. 6 alin. 1 lit. b).</li>
            <li>Interesul legitim de a ține site-ul sigur și de a înțelege, anonim, cum este folosit (art. 6 alin. 1 lit. f).</li>
          </ul>

          <h2>Cu cine lucrăm</h2>
          <ul>
            <li><strong>Vercel</strong> — găzduirea site-ului și statistici anonime.</li>
            <li><strong>Supabase</strong> — baza de date pentru modulul Manager și abonări.</li>
            <li><strong>Google</strong> — Google Analytics (doar cu acordul tău) și Google Search Console.</li>
            <li><strong>Groq</strong> — generarea răspunsurilor asistentului AI. Prelucrarea poate avea loc în afara UE (SUA), pe baza garanțiilor prevăzute de GDPR (clauze contractuale standard / EU-US Data Privacy Framework).</li>
          </ul>
          <p>Nu vindem date și nu folosim cookie-uri de publicitate.</p>

          <h2>Cât timp păstrăm datele</h2>
          <ul>
            <li>Google Analytics: 14 luni.</li>
            <li>Abonarea la alerte: până te dezabonezi.</li>
            <li>Datele din Manager: cât timp folosești modulul; le ștergem la cerere.</li>
            <li>Întrebările către asistentul AI nu sunt salvate de noi după generarea răspunsului.</li>
          </ul>

          <h2>Cookie-uri și stocare în browser</h2>
          <ul>
            <li><strong>Google Analytics</strong> (<code>_ga</code>, <code>_ga_*</code>) — doar după „Accept”.</li>
            <li><strong>Preferințe locale</strong> — tema luminoasă/întunecată (<code>ft-theme</code>) și alegerea privind cookie-urile (<code>ft-consent</code>), păstrate doar în browserul tău.</li>
            <li><strong>Modulul Manager</strong> — identificatorul firmei și al sesiunii, ca să rămâi conectat.</li>
          </ul>
          <p>Îți poți schimba oricând alegerea din linkul „Setări cookie” din subsolul paginii.</p>

          <h2>Drepturile tale</h2>
          <p>
            Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul de a-ți retrage consimțământul.
            Scrie-ne la <a href="mailto:focustaxro@gmail.com">focustaxro@gmail.com</a>. Dacă ești nemulțumit, poți depune plângere la Autoritatea Națională de Supraveghere
            a Prelucrării Datelor cu Caracter Personal (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>).
          </p>
        </div>
      </Container>
    </Main>
  );
}
