import { requireAdminSession } from '@/lib/admin-guard'
import { AdminLogout } from '@/components/admin/admin-logout'
import { Toaster } from '@/components/ui/sonner'
import { IconArrowUpRight } from '@/components/site/icons'
import Link from 'next/link'

const links = [
  { href: '/admin', label: 'Visão geral' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/seo', label: 'SEO e site' },
]

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdminSession()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold tracking-tight">
              Admin <span className="text-muted-foreground">· Auto Socorro MG</span>
            </Link>
            <nav aria-label="Navegação do painel" className="flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Ver site <IconArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
