import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

/** GET /api/admin/visits — estatísticas do contador de visitas. */
export async function GET() {
  const store = await cookies()
  if (!(await verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const [total, today] = await Promise.all([
    db.visit.count(),
    db.visit.count({ where: { createdAt: { gte: startOfToday } } }),
  ])

  // últimos 14 dias
  const since14 = new Date(startOfToday)
  since14.setDate(since14.getDate() - 13)
  const recent = await db.visit.findMany({
    where: { createdAt: { gte: since14 } },
    select: { createdAt: true },
  })

  const byDay = new Map<string, number>()
  for (let i = 0; i < 14; i++) {
    const d = new Date(startOfToday)
    d.setDate(d.getDate() - 13 + i)
    byDay.set(d.toISOString().slice(0, 10), 0)
  }
  for (const v of recent) {
    const key = v.createdAt.toISOString().slice(0, 10)
    byDay.set(key, (byDay.get(key) ?? 0) + 1)
  }

  const daily = Array.from(byDay.entries()).map(([day, count]) => ({ day, count }))
  const week = daily.slice(-7).reduce((acc, d) => acc + d.count, 0)

  return NextResponse.json({ total, today, week, daily })
}
