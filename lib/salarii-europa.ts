/**
 * Salariul mediu în Europa: cât costă angajatorul, cât ia statul și cât rămâne în mână.
 * Sume anuale în euro, persoană singură fără copii, la salariul mediu brut al fiecărei țări, 2025.
 *
 * Surse:
 * - brut, impozit pe venit, contribuții angajat, net: Eurostat earn_nt_net (2025, EUR, P1_NCH_AW100)
 * - contribuții angajator: Tax Foundation „Tax Burden on Labor in Europe 2025” (EUROMOD), ca % din costul muncii;
 *   Croația: 16,5% din brut (Porezna uprava)
 * - Regatul Unit: calcul FocusTax cu regulile 2025/26 la salariul mediu OECD (£55.983), curs 1,17 €/£
 * Generat automat — nu edita de mână.
 */

export interface SalariuTara {
  cod: string;
  nume: string;
  brut: number;
  impozit: number;
  contribAngajat: number;
  contribAngajator: number;
  beneficii: number;
  net: number;
  cost: number;
  sursa: "eurostat" | "calcul";
}

export const AN_DATE = 2025;

export const SALARII_EUROPA: SalariuTara[] = [
  { cod: "BE", nume: "Belgia", brut: 59544, impozit: 14803, contribAngajat: 8327, contribAngajator: 15924, beneficii: 0, net: 36414, cost: 75468, sursa: "eurostat" },
  { cod: "DE", nume: "Germania", brut: 58008, impozit: 8972, contribAngajat: 12501, contribAngajator: 12803, beneficii: 0, net: 36535, cost: 70811, sursa: "eurostat" },
  { cod: "IT", nume: "Italia", brut: 40056, impozit: 8635, contribAngajat: 3801, contribAngajator: 12851, beneficii: 0, net: 27788, cost: 52907, sursa: "eurostat" },
  { cod: "AT", nume: "Austria", brut: 62628, impozit: 9054, contribAngajat: 11227, contribAngajator: 17295, beneficii: 0, net: 42347, cost: 79923, sursa: "eurostat" },
  { cod: "SI", nume: "Slovenia", brut: 38964, impozit: 5437, contribAngajat: 9252, contribAngajator: 6470, beneficii: 0, net: 24276, cost: 45434, sursa: "eurostat" },
  { cod: "FR", nume: "Franța", brut: 44400, impozit: 6970, contribAngajat: 5084, contribAngajator: 14768, beneficii: 0, net: 32346, cost: 59168, sursa: "eurostat" },
  { cod: "SK", nume: "Slovacia", brut: 24240, impozit: 2895, contribAngajat: 3248, contribAngajator: 8776, beneficii: 0, net: 18097, cost: 33016, sursa: "eurostat" },
  { cod: "FI", nume: "Finlanda", brut: 54528, impozit: 12160, contribAngajat: 4678, contribAngajator: 11367, beneficii: 0, net: 37690, cost: 65895, sursa: "eurostat" },
  { cod: "RO", nume: "România", brut: 23722, impozit: 1542, contribAngajat: 8303, contribAngajator: 534, beneficii: 0, net: 13877, cost: 24256, sursa: "eurostat" },
  { cod: "NL", nume: "Țările de Jos", brut: 60636, impozit: 9127, contribAngajat: 10716, contribAngajator: 10516, beneficii: 0, net: 40793, cost: 71152, sursa: "eurostat" },
  { cod: "EE", nume: "Estonia", brut: 29364, impozit: 6357, contribAngajat: 470, contribAngajator: 9924, beneficii: 0, net: 22537, cost: 39288, sursa: "eurostat" },
  { cod: "CZ", nume: "Cehia", brut: 26773, impozit: 2767, contribAngajat: 3106, contribAngajator: 9049, beneficii: 0, net: 20901, cost: 35822, sursa: "eurostat" },
  { cod: "SE", nume: "Suedia", brut: 50560, impozit: 8068, contribAngajat: 3542, contribAngajator: 15888, beneficii: 0, net: 38950, cost: 66448, sursa: "eurostat" },
  { cod: "LU", nume: "Luxemburg", brut: 83760, impozit: 17569, contribAngajat: 10315, contribAngajator: 11433, beneficii: 0, net: 55877, cost: 95193, sursa: "eurostat" },
  { cod: "LV", nume: "Letonia", brut: 26208, impozit: 4421, contribAngajat: 2752, contribAngajator: 6184, beneficii: 0, net: 19035, cost: 32392, sursa: "eurostat" },
  { cod: "HU", nume: "Ungaria", brut: 23206, impozit: 3481, contribAngajat: 4293, contribAngajator: 3015, beneficii: 0, net: 15432, cost: 26221, sursa: "eurostat" },
  { cod: "HR", nume: "Croația", brut: 24612, impozit: 2798, contribAngajat: 4922, contribAngajator: 4061, beneficii: 0, net: 16892, cost: 28673, sursa: "eurostat" },
  { cod: "ES", nume: "Spania", brut: 35076, impozit: 5808, contribAngajat: 2227, contribAngajator: 10489, beneficii: 0, net: 27041, cost: 45565, sursa: "eurostat" },
  { cod: "PL", nume: "Polonia", brut: 26628, impozit: 3891, contribAngajat: 3651, contribAngajator: 5454, beneficii: 0, net: 19086, cost: 32082, sursa: "eurostat" },
  { cod: "EL", nume: "Grecia", brut: 29652, impozit: 4189, contribAngajat: 3964, contribAngajator: 6461, beneficii: 0, net: 21498, cost: 36113, sursa: "eurostat" },
  { cod: "LT", nume: "Lituania", brut: 31380, impozit: 6168, contribAngajat: 6119, contribAngajator: 556, beneficii: 0, net: 19093, cost: 31936, sursa: "eurostat" },
  { cod: "PT", nume: "Portugalia", brut: 27768, impozit: 3264, contribAngajat: 3054, contribAngajator: 6594, beneficii: 0, net: 21449, cost: 34362, sursa: "eurostat" },
  { cod: "DK", nume: "Danemarca", brut: 71610, impozit: 26021, contribAngajat: 159, contribAngajator: 360, beneficii: 0, net: 45430, cost: 71970, sursa: "eurostat" },
  { cod: "BG", nume: "Bulgaria", brut: 18622, impozit: 1606, contribAngajat: 2566, contribAngajator: 3579, beneficii: 0, net: 14450, cost: 22200, sursa: "eurostat" },
  { cod: "UK", nume: "Regatul Unit", brut: 65500, impozit: 11495, contribAngajat: 3662, contribAngajator: 8948, beneficii: 0, net: 50342, cost: 74448, sursa: "calcul" },
  { cod: "IE", nume: "Irlanda", brut: 61716, impozit: 12284, contribAngajat: 2530, contribAngajator: 6880, beneficii: 0, net: 47027, cost: 68596, sursa: "eurostat" },
  { cod: "CY", nume: "Cipru", brut: 34692, impozit: 2380, contribAngajat: 3972, contribAngajator: 5340, beneficii: 0, net: 28340, cost: 40032, sursa: "eurostat" },
  { cod: "MT", nume: "Malta", brut: 32868, impozit: 4757, contribAngajat: 2838, contribAngajator: 2808, beneficii: 0, net: 25273, cost: 35676, sursa: "eurostat" },
];
