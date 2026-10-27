/**
 * GitHub Pages serves a project repo under /<repo-name>/, but a user site
 * (a repo named <user>.github.io) and Vercel/Netlify serve from the root.
 * BASE_PATH lets the same build target either without editing this file.
 */
const basePath = process.env.BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  assetPrefix: basePath || undefined,
  // Static export: the whole site is plain HTML/CSS/JS in out/,
  // deployable to Vercel, Netlify, GitHub Pages or any static host.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
}

export default nextConfig
