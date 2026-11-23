/** @type {import('next').NextConfig} */

const cspValue = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.groq.com https://*.supabase.co wss://*.supabase.co https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspValue },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  // Vercel handles full Next.js natively — no changes needed for deployment
  trailingSlash: true,
  images: { unoptimized: true },
  // Noutăți retrase în noiembrie 2026 pentru că erau inexacte; linkurile vechi duc la articolul corect
  async redirects() {
    return [
      { source: "/noutati/e-factura-extinsa-la-toate-tranzactiile-b2b", destination: "/noutati/e-factura-termen-de-5-zile-lucratoare-din-2026/", permanent: true },
      { source: "/noutati/ro-e-tva-implementare-pentru-contribuabilii-mari", destination: "/noutati/ro-e-tva-notificarea-de-conformare-a-fost-eliminata/", permanent: true },
      { source: "/noutati/anaf-d212-precompletata-include-datele-dac8-verificati-inainte-de", destination: "/noutati/dac8-platformele-crypto-raporteaza-la-anaf-pana-la-15-martie-2027/", permanent: true },
      { source: "/noutati/ro-e-transport-noi-categorii-de-bunuri", destination: "/sisteme/ro-e-transport/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
