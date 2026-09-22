import { VisitsDashboard } from '@/components/admin/visits-dashboard'

export const dynamic = 'force-dynamic'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Visão geral</h1>
        <p className="text-sm text-muted-foreground">
          Contador de visitas e atalhos do painel.
        </p>
      </div>
      <VisitsDashboard />
    </div>
  )
}
