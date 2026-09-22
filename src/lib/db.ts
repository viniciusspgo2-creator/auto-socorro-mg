import { PrismaClient } from '@prisma/client'

// Ambiente de desenvolvimento do sandbox: o shell exporta DATABASE_URL apontando
// para um SQLite local. Como este projeto usa PostgreSQL (Neon em produção),
// substituímos por LOCAL_PG_URL quando detectamos uma URL que não é Postgres.
if (
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.startsWith('postgresql://') &&
  !process.env.DATABASE_URL.startsWith('postgres://') &&
  process.env.LOCAL_PG_URL
) {
  process.env.DATABASE_URL = process.env.LOCAL_PG_URL
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
