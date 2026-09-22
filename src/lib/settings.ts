import { db } from '@/lib/db'
import { siteConfig } from '@/config/site'

export type SiteSettingsData = {
  siteName: string
  siteUrl: string
  metaTitle: string
  metaDescription: string
  ogImage: string
  whatsappNumber: string
  whatsappMessage: string
  phoneDisplay: string
  phoneE164: string
  gaId: string
  gtmId: string
}

/**
 * Carrega as configurações do banco (editáveis no admin) com fallback
 * gracioso para os valores do config original — o site nunca quebra se o
 * banco estiver indisponível.
 */
export async function getSettings(): Promise<SiteSettingsData> {
  try {
    const row = await db.siteSettings.findUnique({ where: { id: 'main' } })
    if (row) {
      return {
        siteName: row.siteName,
        siteUrl: row.siteUrl,
        metaTitle: row.metaTitle,
        metaDescription: row.metaDescription,
        ogImage: row.ogImage,
        whatsappNumber: row.whatsappNumber,
        whatsappMessage: row.whatsappMessage,
        phoneDisplay: row.phoneDisplay,
        phoneE164: row.phoneE164,
        gaId: row.gaId,
        gtmId: row.gtmId,
      }
    }
  } catch {
    // banco indisponível — usa padrões do config.php original
  }
  return {
    siteName: siteConfig.siteName,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
    metaTitle: siteConfig.metaTitle,
    metaDescription: siteConfig.metaDescription,
    ogImage: '/img/frota.webp',
    whatsappNumber: siteConfig.whatsappNumber,
    whatsappMessage: siteConfig.whatsappMessage,
    phoneDisplay: siteConfig.phoneDisplay,
    phoneE164: siteConfig.phoneE164,
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  }
}
