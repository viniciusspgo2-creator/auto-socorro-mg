import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

/** Guarda server-side das páginas /admin — redireciona para o login se não autenticado. */
export async function requireAdminSession(): Promise<void> {
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE_NAME)?.value
  const valid = await verifySessionToken(token)
  if (!valid) redirect('/admin/login')
}
