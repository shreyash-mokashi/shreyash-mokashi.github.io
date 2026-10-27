/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is plain HTML/CSS/JS in out/,
  // deployable to Vercel, Netlify, GitHub Pages or any static host.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
}

export default nextConfig
