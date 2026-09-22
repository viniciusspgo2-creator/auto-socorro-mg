import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings()
  const base = (
    settings.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: { updatedAt: 'desc' },
    })
    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    return [...staticRoutes, ...postRoutes]
  } catch {
    // banco indisponível — sitemap parcial com rotas estáticas
    return staticRoutes
  }
}
