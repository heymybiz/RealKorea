import { Archivo, Playfair_Display } from "next/font/google";

/**
 * Two faces, two jobs.
 *
 * Display is a high-contrast transitional serif. Set at 900 it is heavy enough to
 * hold its own against a saturated colour field, and the thick/thin stress keeps
 * it from reading as a poster grotesque — which is where "bold" usually tips into
 * "loud".
 *
 * Furniture is a geometric sans, uppercase and letterspaced. Keeping labels,
 * navigation, and numerals in a completely different voice is what stops a
 * colour-heavy page from feeling like a flyer.
 */
export const display = Playfair_Display({
  variable: "--font-display-alt",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const furniture = Archivo({
  variable: "--font-furniture",
  subsets: ["latin"],
  display: "swap",
});
