import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@prisma/client'

/** Teaser do blog na home — até 3 artigos recentes antes da seção de dúvidas. */
export function BlogTeaser({ posts }: { posts: Post[] }) {
  if (!posts.length) return null
  return (
    <section className="blog-section section" id="blog">
      <div className="container">
        <div className="section-heading reveal">
          <p>Blog</p>
          <h2>Dicas e informações sobre reboque e auto socorro.</h2>
          <Link className="post-more" href="/blog">
            Ver todos os artigos
          </Link>
        </div>
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
                    sizes="(max-width: 920px) 100vw, 33vw"
                  />
                )}
              </figure>
              <div>
                <div className="post-meta">
                  <b>Blog</b>
                  <time dateTime={post.publishedAt.toISOString()}>
                    {post.publishedAt.toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="post-more">Ler artigo</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
