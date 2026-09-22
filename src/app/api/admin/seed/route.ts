import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'
import { seedPosts } from '@/lib/blog-seed-data'

export const runtime = 'nodejs'

/** POST /api/admin/seed — (re)cria os 6 artigos estratégicos padrão do blog. */
export async function POST() {
  const store = await cookies()
  if (!(await verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  let created = 0
  for (const post of seedPosts) {
    await db.post.upsert({
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
    created++
  }
  return NextResponse.json({ ok: true, created })
}
