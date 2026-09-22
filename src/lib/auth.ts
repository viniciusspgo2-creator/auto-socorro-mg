/**
 * Autenticação mínima do painel /admin — cookie httpOnly assinado com HMAC-SHA256.
 * Sem dependências externas (usa Web Crypto, compatível com Node e Edge).
 * A senha vem de ADMIN_PASSWORD; o segredo de assinatura de SESSION_SECRET.
 */

const COOKIE_NAME = 'asmg_admin'
const SESSION_TTL_MS = 1000 * 60 * 60 * 12 // 12 horas

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123'
}

async function getSessionSecret(): Promise<string> {
  return process.env.SESSION_SECRET || `${getAdminPassword()}::auto-socorro-mg`
}

/** Cria o valor do cookie de sessão: payload.exp assinado */
export async function createSessionToken(): Promise<{ value: string; maxAge: number }> {
  const exp = Date.now() + SESSION_TTL_MS
  const payload = `admin.${exp}`
  const sig = await hmac(await getSessionSecret(), payload)
  return { value: `${payload}.${sig}`, maxAge: SESSION_TTL_MS / 1000 }
}

/** Valida o cookie de sessão (assinatura + expiração) */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [role, expRaw, sig] = parts
  const exp = Number(expRaw)
  if (role !== 'admin' || !Number.isFinite(exp) || exp < Date.now()) return false
  const expected = await hmac(await getSessionSecret(), `${role}.${expRaw}`)
  // comparação de tempo constante simplificada
  if (expected.length !== sig.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i)
  return diff === 0
}

export { COOKIE_NAME as ADMIN_COOKIE_NAME }
