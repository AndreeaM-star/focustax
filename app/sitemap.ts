import { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";
import { ghiduri } from "./(site)/ghiduri/[slug]/data";
import { declaratii } from "./(site)/declaratii/[cod]/data";
import { COMPARATII_IDS } from "./(site)/comparatii/[tip]/data";
import { SISTEME_IDS } from "./(site)/sisteme/[sistem]/data";
import { CALCULATOARE_IDS } from "./(site)/calculator/[tip]/meta";
import { NOUTATI } from "@/lib/noutati";

export const dynamic = "force-static";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

const entry = (path: string, priority: number, changeFrequency: Freq = "monthly") => ({
  url: absUrl(path),
  lastModified: new Date(),
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1.0, "weekly"),
    entry("/calculator/forme-juridice", 0.9),
    entry("/declaratii", 0.9),
    entry("/ghiduri", 0.9),
    entry("/ghiduri/d212-ghid-completare", 0.9),
    entry("/ghiduri/impozite-locale-2026", 0.85),
    entry("/ghiduri/facilitati-fiscale", 0.8),
    entry("/ghiduri/erori-e-factura", 0.8),
    entry("/confidentialitate", 0.3, "yearly"),
    entry("/termeni", 0.3, "yearly"),
    entry("/noutati", 0.85, "weekly"),
    entry("/calendar", 0.85),
    entry("/comparatii", 0.8),
    entry("/sisteme", 0.8),
    entry("/glosar", 0.75),
    entry("/contact", 0.5, "yearly"),
    ...CALCULATOARE_IDS.map((tip) => entry(`/calculator/${tip}`, 0.85)),
    ...Object.keys(declaratii).map((cod) => entry(`/declaratii/${cod}`, 0.7)),
    ...Object.keys(ghiduri).map((slug) => entry(`/ghiduri/${slug}`, 0.8)),
    ...COMPARATII_IDS.map((id) => entry(`/comparatii/${id}`, 0.7)),
    ...SISTEME_IDS.map((id) => entry(`/sisteme/${id}`, 0.7)),
    ...NOUTATI.map((n) => entry(`/noutati/${n.slug}`, 0.6, "yearly")),
  ];
}
