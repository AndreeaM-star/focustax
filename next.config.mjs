/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' — needed for API routes (Groq AI, ANAF OAuth, Supabase server-side)
  // Vercel handles full Next.js natively — no change needed in deployment
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
