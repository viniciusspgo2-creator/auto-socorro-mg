import type { Metadata } from 'next'
import { Lightbox } from '@/components/site/lightbox'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'
import { whatsappUrl } from '@/config/site'
import { IconArrowUpRight } from '@/components/site/icons'

export const revalidate = 60

type Params = Promise<{ slug: string }>

async function getPost(slug: string) {
  try {
    return await db.post.findUnique({ where: { slug } })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || !post.published) {
    return { title: 'Artigo não encontrado' }
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || !post.published) notFound()

  const settings = await getSettings()
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || ''
  const whatsappHref = whatsappUrl(settings.whatsappNumber, settings.whatsappMessage)

  let related: { id: string; slug: string; title: string; excerpt: string; coverImage: string | null; publishedAt: Date }[] = []
  try {
    const rows = await db.post.findMany({
      where: { published: true, slug: { not: post.slug } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
    related = rows
  } catch {
    related = []
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: 'pt-BR',
    image: post.coverImage ? `${siteUrl}${post.coverImage}` : undefined,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: settings.siteName },
    publisher: { '@id': `${siteUrl}/#negocio` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl || '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <main id="conteudo">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <section className="post-header">
        <div className="container">
          <nav className="crumbs" aria-label="Trilha de navegação">
            <a href="/">Início</a>
            <span aria-hidden="true">/</span>
            <a href="/blog">Blog</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <b>{settings.siteName}</b>
            <time dateTime={post.publishedAt.toISOString()}>
              {post.publishedAt.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {post.coverImage && (
        <figure className="post-cover">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            priority
            sizes="(max-width: 920px) 100vw, 1180px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </figure>
      )}

      <article className="post-body-wrap">
        <div className="post-body">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <div className="post-cta">
        <div>
          <h2>Precisou? É só chamar.</h2>
          <p>Atendimento 24h em Santa Fé do Sul e região.</p>
        </div>
        <a className="btn btn-light" href={whatsappHref} target="_blank" rel="noopener">
          Chamar no WhatsApp <IconArrowUpRight />
        </a>
      </div>

      {related.length > 0 && (
        <section className="post-related" aria-label="Leia também">
          <div className="container">
            <h2>Leia também</h2>
            <div className="blog-grid">
              {related.map((rel) => (
                <Link className="post-card" href={`/blog/${rel.slug}`} key={rel.id}>
                  <figure>
                    {rel.coverImage && (
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 920px) 100vw, 33vw"
                      />
                    )}
                  </figure>
                  <div>
                    <h3>{rel.title}</h3>
                    <p>{rel.excerpt}</p>
                    <span className="post-more">Ler artigo</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox />
    </main>
  )
}
