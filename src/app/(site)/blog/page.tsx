import type { Metadata } from 'next'
import { Lightbox } from '@/components/site/lightbox'
import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@prisma/client'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Dicas e informações sobre guincho e auto socorro 24h em Santa Fé do Sul e região: atendimento, equipamentos, veículos pesados, pagamento e segurança na rodovia.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/blog',
    title: 'Blog | Auto Socorro MG',
    description:
      'Dicas e informações sobre guincho e auto socorro 24h em Santa Fé do Sul e região.',
  },
}

export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  try {
    return await db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  const settings = await getSettings()
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || ''

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/blog#blog`,
    name: `Blog ${settings.siteName}`,
    url: `${siteUrl}/blog`,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${siteUrl}/#negocio` },
  }

  return (
    <main id="conteudo">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <section className="blog-hero">
        <div className="container">
          <p>Blog</p>
          <h1>
            Dicas e informações <em>sobre reboque.</em>
          </h1>
          <span className="blog-lead">
            Conteúdo da equipe Auto Socorro MG para você saber como agir em uma pane,
            como funciona o atendimento e como escolher o serviço certo para o seu
            veículo.
          </span>
        </div>
      </section>

      <section className="blog-section section" aria-label="Artigos do blog">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <b>Nenhum artigo publicado por aqui…</b>
              Em breve a equipe publica dicas sobre reboque e auto socorro. Se precisar
              de atendimento agora, fale com a gente pelo WhatsApp.
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link className="post-card reveal" href={`/blog/${post.slug}`} key={post.id}>
                  <figure>
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 920px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    )}
                  </figure>
                  <div>
                    <div className="post-meta">
                      <b>Blog</b>
                      <time dateTime={post.publishedAt.toISOString()}>
                        {post.publishedAt.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="post-more">Ler artigo</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox />
    </main>
  )
}
