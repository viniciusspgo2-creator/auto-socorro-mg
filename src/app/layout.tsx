import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import { getSettings } from '@/lib/settings'
import { Analytics } from '@/components/site/analytics'
import './globals.css'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.metaTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.metaDescription,
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName }],
    icons: {
      icon: '/img/logo.webp',
      shortcut: '/img/logo.webp',
      apple: '/img/logo.webp',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#08090b',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings()
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics gaId={settings.gaId} gtmId={settings.gtmId} />
      </body>
    </html>
  )
}
