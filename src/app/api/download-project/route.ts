import { execSync } from 'child_process'
import { existsSync, readFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * ⚠️ TEMPORÁRIO — NÃO FAZ PARTE DA ENTREGA FINAL ⚠️
 * Rota de handoff: gera um .zip do projeto (fonte, prisma, configs,
 * imagens e README) para download/local no GitHub Desktop.
 * DEVE SER REMOVIDA após o download do projeto.
 */

const INCLUDE = [
  'src',
  'public',
  'prisma',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'next.config.ts',
  'postcss.config.mjs',
  'tailwind.config.ts',
  'components.json',
  'eslint.config.mjs',
  '.env.example',
  '.gitignore',
  'vercel.json',
  'README.md',
  'worklog.md',
]

export async function GET() {
  const cwd = process.cwd()
  const items = INCLUDE.filter((name) => existsSync(path.join(cwd, name)))
  const stamp = new Date().toISOString().slice(0, 10)
  const zipPath = path.join(
    tmpdir(),
    `projeto-${stamp}-${Math.random().toString(36).slice(2, 8)}.zip`,
  )

  try {
    execSync(
      `zip -r -9 -q ${JSON.stringify(zipPath)} ${items
        .map((i) => JSON.stringify(i))
        .join(' ')}`,
      { cwd, stdio: 'ignore', maxBuffer: 1024 * 1024 },
    )

    const zip = readFileSync(zipPath)

    return new Response(new Uint8Array(zip), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="auto-socorro-mg-nextjs-${stamp}.zip"`,
        'Content-Length': String(zip.byteLength),
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[download-project] falha ao gerar o zip:', error)
    return Response.json(
      { error: 'Falha ao gerar o arquivo .zip do projeto.' },
      { status: 500 },
    )
  } finally {
    if (existsSync(zipPath)) unlinkSync(zipPath)
  }
}
