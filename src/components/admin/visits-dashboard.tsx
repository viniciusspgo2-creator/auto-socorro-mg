'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type VisitsData = {
  total: number
  today: number
  week: number
  daily: { day: string; count: number }[]
}

export function VisitsDashboard() {
  const [data, setData] = useState<VisitsData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/admin/visits')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const max = data ? Math.max(1, ...data.daily.map((d) => d.count)) : 1

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Visitas totais</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {data ? data.total.toLocaleString('pt-BR') : '—'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Desde o início do contador
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hoje</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {data ? data.today.toLocaleString('pt-BR') : '—'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Registros desde 00:00
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Últimos 7 dias</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {data ? data.week.toLocaleString('pt-BR') : '—'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Média de {data ? Math.round(data.week / 7) : 0} por dia
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visitas por dia — últimos 14 dias</CardTitle>
          <CardDescription>Uma visita é contada por sessão do navegador</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-destructive">Não foi possível carregar as estatísticas.</p>}
          {!data && !error && (
            <div className="flex h-40 items-end gap-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <Skeleton key={i} className="flex-1" style={{ height: `${20 + ((i * 13) % 60)}%` }} />
              ))}
            </div>
          )}
          {data && (
            <div className="flex h-40 items-end gap-2" role="img" aria-label="Gráfico de visitas por dia">
              {data.daily.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="text-[10px] tabular-nums text-muted-foreground">{d.count}</span>
                  <div
                    className="w-full rounded-t bg-primary/80 transition-all"
                    style={{ height: `${Math.max(3, (d.count / max) * 100)}%` }}
                    title={`${d.day}: ${d.count}`}
                  />
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {d.day.slice(8, 10)}/{d.day.slice(5, 7)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
