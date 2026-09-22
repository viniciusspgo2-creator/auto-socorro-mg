import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

async function guard(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value)
}

/** GET /api/admin/settings — carrega configurações do site/SEO. */
export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const settings = await db.siteSettings.findUnique({ where: { id: 'main' } })
  return NextResponse.json({ settings })
}

const FIELDS = [
  'siteName',
  'siteUrl',
  'metaTitle',
  'metaDescription',
  'ogImage',
  'whatsappNumber',
  'whatsappMessage',
  'phoneDisplay',
  'phoneE164',
  'gaId',
  'gtmId',
] as const

/** POST /api/admin/settings — salva configurações (upsert linha única "main"). */
export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>

  const data: Record<string, string> = {}
  for (const field of FIELDS) {
    if (typeof b[field] === 'string') data[field] = (b[field] as string).slice(0, 500)
  }

  const settings = await db.siteSettings.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  })
  return NextResponse.json({ settings })
}
