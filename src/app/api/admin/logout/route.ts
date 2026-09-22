import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

/** POST /api/admin/logout — remove o cookie de sessão. */
export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE_NAME, '', { path: '/', maxAge: 0 })
  return res
}
