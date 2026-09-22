import { NextRequest, NextResponse } from 'next/server'
import {
  createSessionToken,
  verifySessionToken,
  getAdminPassword,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth'

export const runtime = 'nodejs'

/** POST /api/admin/login — autentica com ADMIN_PASSWORD e cria cookie de sessão. */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { password?: string }
  const password = typeof body.password === 'string' ? body.password : ''

  if (!password || password !== getAdminPassword()) {
    return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
  }

  const { value, maxAge } = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  })
  return res
}

/** GET /api/admin/login — verifica se a sessão atual é válida. */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  const valid = await verifySessionToken(token)
  return NextResponse.json({ authenticated: valid })
}
