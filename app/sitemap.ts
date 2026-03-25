import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://focustax.ro";

const ghiduriSlugs = [
  "inregistrare-pfa",
  "sistem-real-norma",
  "contributii-sociale",
  "d212-pfa",
  "srl-vs-micro",
  "dividende",
  "inregistrare-tva",
  "impozit-chirii",
  "spv-ghid",
  "salarii-retineri",
  "sponsorizari",
];

const comparatiiIds = [
  "tva",
  "impozit-venit",
  "impozit-profit",
  "contributii-sociale",
  "dividende",
  "prag-tva",
  "impozit-avere",
];

const sistemeSlugs = [
  "ro-e-factura",
  "spv",
  "ro-e-tva",
  "ro-e-transport",
  "one-stop-shop",
  "sme-ss",
  "e-filing",
  "ro-e-sigiliu",
];

const declaratiiCoduri = [
  "d300", "d301", "d390", "d394",
  "d101", "d012", "d100",
  "d200", "d212", "d220", "d230",
  "d112", "d204", "d216",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/declaratii`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/ghiduri`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/comparatii`, lastModified: new Date(), priority: 0.85 },
    { url: `${BASE_URL}/sisteme`, lastModified: new Date(), priority: 0.85 },
    { url: `${BASE_URL}/calculator`, lastModified: new Date(), priority: 0.85 },
    { url: `${BASE_URL}/noutati`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.6 },
  ];

  const comparatiiRoutes: MetadataRoute.Sitemap = comparatiiIds.map((id) => ({
    url: `${BASE_URL}/comparatii/${id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const declaratiiRoutes: MetadataRoute.Sitemap = declaratiiCoduri.map((cod) => ({
    url: `${BASE_URL}/declaratii/${cod}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const ghiduriRoutes: MetadataRoute.Sitemap = ghiduriSlugs.map((slug) => ({
    url: `${BASE_URL}/ghiduri/${slug}`,
    lastModified: new Date(),
    priority: 0.75,
  }));

  const sistemeRoutes: MetadataRoute.Sitemap = sistemeSlugs.map((slug) => ({
    url: `${BASE_URL}/sisteme/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticRoutes, ...declaratiiRoutes, ...ghiduriRoutes, ...comparatiiRoutes, ...sistemeRoutes];
}
