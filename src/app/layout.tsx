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
    'Full Stack Developer',
    'Full Stack Engineer',
    'Software Engineer',
    'Frontend Engineer',
    'Backend Developer',
    'React Developer',
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'REST API',
    'MongoDB',
    'SQL',
    'Pune',
    'India',
    meta.name,
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${meta.name} — ${meta.role}`,
    description,
    type: 'profile',
    url: meta.siteUrl,
    siteName: meta.name,
    locale: 'en_IN',
    // 1200x630 is what LinkedIn, WhatsApp and Slack crop to. A square
    // portrait gets cut off in every one of them.
    images: [{ url: '/og-card.png', width: 1200, height: 630, alt: `${meta.name} — ${meta.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${meta.name} — ${meta.role}`,
    description,
    images: ['/og-card.png'],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/shreyash-sm.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/shreyash-sm.webp" />
      </head>
      <body>{children}</body>
    </html>
  )
}
