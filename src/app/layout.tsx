import type { Metadata, Viewport } from 'next'
import { meta } from '@/content/profile'
import './globals.css'

const description = `${meta.role} at Vernost Tech Ventures. ${meta.intro}`

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: `${meta.name} — ${meta.role}`,
  description,
  authors: [{ name: meta.name }],
  keywords: [
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Software Engineer',
    meta.name,
  ],
  openGraph: {
    title: `${meta.name} — ${meta.role}`,
    description,
    type: 'profile',
    images: ['/shreyash.jpg'],
  },
  twitter: {
    card: 'summary',
    title: `${meta.name} — ${meta.role}`,
    description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#08090c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/shreyash-sm.webp" type="image/webp" />
      </head>
      <body>{children}</body>
    </html>
  )
}
