/**
 * Seed do blog — cria/refresh os 6 artigos estratégicos padrão.
 * Uso: npm run db:seed  (ou bun prisma/seed.ts)
 * Idempotente: faz upsert por slug.
 */
import { PrismaClient } from '@prisma/client'
import { seedPosts } from '../src/lib/blog-seed-data'

// fallback: ambiente com DATABASE_URL não-Postgres (ex.: sandbox) usa LOCAL_PG_URL
if (
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.startsWith('postgresql://') &&
  !process.env.DATABASE_URL.startsWith('postgres://') &&
  process.env.LOCAL_PG_URL
) {
  process.env.DATABASE_URL = process.env.LOCAL_PG_URL
}

const prisma = new PrismaClient()

async function main() {
  for (const post of seedPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: post.published,
      },
      create: post,
    })
  }
  console.log(`Seed concluído: ${seedPosts.length} artigos do blog.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
