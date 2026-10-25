import type { IconName } from "@/components/ui/Icon";

export interface NavItem { href: string; label: string; desc?: string; icon?: IconName }

/** Structura de navigare comună pentru meniu, footer și pagina principală */
export const NAV_CALCULATOARE: NavItem[] = [
  { href: "/calculator/declaratie-unica", label: "Declarația unică", desc: "Investiții, dividende, chirii, crypto + CASS", icon: "file" },
  { href: "/calculator/salariu",   label: "Salariu net",         desc: "Din brut în net și invers, cu deduceri", icon: "briefcase" },
  { href: "/calculator/pfa",       label: "PFA / II",            desc: "CAS, CASS și impozit pe venitul net",      icon: "user" },
  { href: "/calculator/srl",       label: "SRL / Micro",         desc: "Impozit micro 1% sau profit 16%",          icon: "building" },
  { href: "/calculator/dividende", label: "Dividende",           desc: "Impozit 16% și CASS pe trepte",            icon: "coins" },
  { href: "/calculator/chirii",    label: "Chirii",              desc: "Impozit și CASS pe veniturile din chirii", icon: "home" },
  { href: "/calculator/tva",       label: "TVA",                 desc: "Adaugă sau extrage TVA, decont lunar",     icon: "percent" },
  { href: "/calculator/crypto",    label: "Crypto",              desc: "Impozit 16% pe câștiguri și CASS",         icon: "bitcoin" },
  { href: "/calculator/forme-juridice", label: "Compară forme juridice", desc: "Salariat vs PFA vs SRL, cât îți rămâne", icon: "scale" },
];

export const NAV_RESURSE: NavItem[] = [
  { href: "/ghiduri",    label: "Ghiduri",    desc: "Pas cu pas: PFA, SRL, TVA, D212",       icon: "book" },
  { href: "/declaratii", label: "Declarații", desc: "Ce depui, când și cum completezi",      icon: "file" },
  { href: "/calendar",   label: "Calendar",   desc: "Toate termenele fiscale ale anului",    icon: "calendar" },
  { href: "/noutati",    label: "Noutăți",    desc: "Modificări legislative pe înțeles",     icon: "news" },
  { href: "/comparatii", label: "Comparații UE", desc: "România față de alte țări europene", icon: "globe" },
  { href: "/sisteme",    label: "Sisteme ANAF", desc: "e-Factura, SPV, e-TVA, e-Transport",  icon: "server" },
  { href: "/glosar",     label: "Glosar",     desc: "Termeni fiscali explicați simplu",      icon: "search" },
];
