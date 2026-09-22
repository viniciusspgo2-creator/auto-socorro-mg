import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

/** Registra 1 visita (chamado pelo VisitTracker, 1x por sessão). */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { path?: string }
    const path = typeof body.path === 'string' ? body.path.slice(0, 200) : '/'
    await db.visit.create({ data: { path } })
    return NextResponse.json({ ok: true })
  } catch {
    // falha silenciosa — contador nunca deve quebrar o site
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
