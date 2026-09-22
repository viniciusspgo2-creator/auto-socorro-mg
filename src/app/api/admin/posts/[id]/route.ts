import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

async function guard(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value)
}

/** PUT /api/admin/posts/[id] — atualiza um artigo. */
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await guard())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const { id } = await ctx.params
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>

  const data: Record<string, unknown> = {}
  if (typeof b.title === 'string') data.title = b.title.trim()
  if (typeof b.excerpt === 'string') data.excerpt = b.excerpt.slice(0, 400)
  if (typeof b.content === 'string') data.content = b.content
  if (typeof b.coverImage === 'string') data.coverImage = b.coverImage || null
  if (typeof b.published === 'boolean') data.published = b.published
  if (b.publishedAt) data.publishedAt = new Date(String(b.publishedAt))
  if (typeof b.slug === 'string' && b.slug.trim()) {
    data.slug = b.slug
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 120)
  }

  try {
    const post = await db.post.update({ where: { id }, data })
    return NextResponse.json({ post })
  } catch {
    return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }
}

/** DELETE /api/admin/posts/[id] — exclui um artigo. */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await guard())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const { id } = await ctx.params
  try {
    await db.post.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }
}
