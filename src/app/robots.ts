import type { MetadataRoute } from 'next'
import { getSettings } from '@/lib/settings'

export const revalidate = 3600

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings()
  const base = (
    settings.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
