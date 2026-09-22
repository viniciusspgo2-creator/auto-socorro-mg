import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

async function guard(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value)
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 120)
}

/** GET /api/admin/posts — lista todos os posts (inclusive rascunhos). */
export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const posts = await db.post.findMany({ orderBy: [{ published: 'desc' }, { publishedAt: 'desc' }] })
  return NextResponse.json({ posts })
}

/** POST /api/admin/posts — cria um artigo. */
export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>

  const title = String(b.title ?? '').trim()
  const content = String(b.content ?? '').trim()
  if (!title || !content) {
    return NextResponse.json({ error: 'Título e conteúdo são obrigatórios.' }, { status: 400 })
  }

  const slug = slugify(String(b.slug ?? '') || title)
  const exists = await db.post.findUnique({ where: { slug } })
  if (exists) {
    return NextResponse.json({ error: 'Já existe um artigo com esse slug.' }, { status: 409 })
  }

  const post = await db.post.create({
    data: {
      slug,
      title,
      excerpt: String(b.excerpt ?? '').slice(0, 400),
      content,
      coverImage: String(b.coverImage ?? '') || null,
      published: Boolean(b.published),
      publishedAt: b.publishedAt ? new Date(String(b.publishedAt)) : new Date(),
    },
  })
  return NextResponse.json({ post }, { status: 201 })
}
