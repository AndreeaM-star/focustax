/**
 * Adresa canonică a site-ului. Vercel redirecționează focustax.ro → www.focustax.ro,
 * iar next.config are trailingSlash: true — deci toate URL-urile absolute
 * (canonical, sitemap, JSON-LD) trebuie să fie pe www și să se termine cu „/”.
 */
export const SITE_URL = "https://www.focustax.ro";

/** URL absolut canonic pentru o cale internă: absUrl("/ghiduri") → https://www.focustax.ro/ghiduri/ */
export function absUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith("/") ? clean : `${clean}/`}`;
}
