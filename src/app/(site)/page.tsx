import type { Metadata } from 'next'
import { Lightbox } from '@/components/site/lightbox'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'
import { whatsappUrl } from '@/config/site'
import { HomeSections } from '@/components/site/home-sections'
import { BlogTeaser } from '@/components/site/blog-teaser'
import { IconArrowUpRight, IconPhoneFill } from '@/components/site/icons'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: { absolute: settings.metaTitle },
    description: settings.metaDescription,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: '/',
      siteName: settings.siteName,
      title: settings.metaTitle,
      description: settings.metaDescription,
      images: [{ url: settings.ogImage, width: 1200, height: 630, alt: settings.siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.metaTitle,
      description: settings.metaDescription,
      images: [settings.ogImage],
    },
    robots: { index: true, follow: true },
  }
}

export const revalidate = 60

async function getLatestPosts() {
  try {
    return await db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const settings = await getSettings()
  const whatsappHref = whatsappUrl(settings.whatsappNumber, settings.whatsappMessage)
  const posts = await getLatestPosts()

  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || ''

  // Schema.org — LocalBusiness (AutoRepair 24h)
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${siteUrl}/#negocio`,
    name: settings.siteName,
    description: settings.metaDescription,
    url: siteUrl || '/',
    telephone: settings.phoneE164,
    image: `${siteUrl}${settings.ogImage}`,
    logo: `${siteUrl}/img/logo.webp`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santa Fé do Sul',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    areaServed: 'Santa Fé do Sul e região',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [`https://wa.me/${settings.whatsappNumber}`],
  }

  // Schema.org — FAQPage (perguntas do site original)
  const faqs = [
    {
      q: 'Onde está localizada a empresa?',
      a: 'Estamos em Santa Fé do Sul, com atendimento de guincho na região. Fale com a equipe para confirmar sua localização.',
    },
    {
      q: 'Que tipos de veículos vocês rebocam?',
      a: 'Carros, caminhonetes, caminhões, ônibus, máquinas agrícolas, lanchas e outros veículos leves ou pesados.',
    },
    {
      q: 'Quais equipamentos estão disponíveis?',
      a: 'Plataforma hidráulica de 11 metros e guincho lança pesada para diferentes necessidades de remoção e transporte.',
    },
    {
      q: 'Quais são as formas de pagamento?',
      a: 'Dinheiro, Pix e cartões de crédito ou débito.',
    },
    {
      q: 'O atendimento funciona durante a madrugada?',
      a: 'Sim. O atendimento funciona 24 horas por dia, todos os dias da semana.',
    },
  ]
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#site`,
    url: siteUrl || '/',
    name: settings.siteName,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${siteUrl}/#negocio` },
  }

  return (
    <main id="conteudo">
      <HomeSections whatsappHref={whatsappHref} />
      {posts.length > 0 && <BlogTeaser posts={posts} />}
      <section className="faq section" id="duvidas">
        <div className="container faq-grid">
          <div className="faq-title reveal">
            <p>Informações</p>
            <h2>Dúvidas frequentes.</h2>
            <span>Confira as respostas ou fale diretamente com nossa equipe.</span>
          </div>
          <div className="accordion reveal">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span></span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="emergency-cta">
        <div className="container reveal">
          <div>
            <h2>Precisou? É só chamar.</h2>
            <p>Envie sua localização e conte qual veículo precisa de atendimento.</p>
          </div>
          <div className="cta-options">
            <a className="btn btn-light" href={whatsappHref} target="_blank" rel="noopener">
              WhatsApp <IconArrowUpRight />
            </a>
            <a href={`tel:${settings.phoneE164}`}>
              <IconPhoneFill />
              {settings.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Lightbox />
      {/* JSON-LD no fim do main — posição estável para hidratação e SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusiness, faqSchema, websiteSchema]) }}
      />
    </main>
  )
}
