# Auto Socorro MG — Next.js + Vercel

Migração do site institucional one-page (PHP puro) para **Next.js 16 (App Router) + TypeScript**, com **preservação integral do design aprovado** (mesma paleta, tipografia, seções, textos e imagens), além dos novos recursos: **blog com SEO**, **painel administrativo** e **contador de visitas**.

---

## Stack

- **Next.js 16** (App Router, Server Components, Route Handlers, Metadata API, `next/image`, `next/font`)
- **TypeScript**
- **Prisma ORM + PostgreSQL** (produção: Neon / Supabase / Vercel Postgres — serverless)
- **Tailwind CSS** apenas no painel admin; o site público usa o **CSS original** do projeto aprovado

## Rodando localmente

```bash
npm install
cp .env.example .env          # preencha DATABASE_URL (Postgres) e ADMIN_PASSWORD
npm run db:push               # cria as tabelas
npm run db:seed               # cria os 6 artigos padrão do blog (opcional)
npm run dev                   # http://localhost:3000
```

## Variáveis de ambiente (cadastre na Vercel ANTES do primeiro deploy)

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `DATABASE_URL` | **Sim** | String de conexão PostgreSQL (Neon: `postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require`) |
| `ADMIN_PASSWORD` | **Sim** | Senha de acesso ao painel `/admin` |
| `SESSION_SECRET` | **Sim** | String aleatória longa (assina o cookie de sessão do admin) |
| `NEXT_PUBLIC_SITE_URL` | Opcional | URL final do domínio (também pode ser configurada no painel > SEO) |
| `NEXT_PUBLIC_GA_ID` | Opcional | Google Analytics 4 (também configurável no painel > SEO) |
| `NEXT_PUBLIC_GTM_ID` | Opcional | Google Tag Manager (também configurável no painel > SEO) |

Onde configurar: **Vercel > seu projeto > Settings > Environment Variables** (marque Production, Preview e Development).

## Banco de dados

- Produção usa **PostgreSQL serverless** (recomendado: [Neon](https://neon.tech) — plano gratuito, região São Paulo `aws sa-east-1`).
- O filesystem da Vercel é efêmero; nenhum dado é gravado em disco. Tudo vai para o Postgres.
- Comandos:
  - `npm run db:push` — aplica o schema (`prisma/schema.prisma`)
  - `npm run db:seed` — cria os 6 artigos padrão do blog
  - Alternativa ao seed: painel > Blog > “Restaurar 6 artigos padrão”

## Painel admin

- URL: `/admin` (protegido por senha — `ADMIN_PASSWORD`)
- **Visão geral**: contador de visitas (total, hoje, últimos 7 dias, gráfico de 14 dias)
- **Blog**: criar/editar/publicar/excluir artigos (Markdown simples) + restaurar artigos padrão
- **SEO e site**: nome do site, URL, meta title/description, Open Graph, WhatsApp/telefone, GA4 e GTM

## Estrutura

```
src/
  app/
    (site)/            # site público (layout com header/footer originais)
      page.tsx         # home — réplica fiel do index.php
      blog/            # listagem e artigos
    admin/             # painel administrativo (login + área protegida)
    api/
      track/           # contador de visitas
      admin/           # login/logout, posts, settings, visitas, seed
    sitemap.ts         # /sitemap.xml automático (inclui posts do banco)
    robots.ts          # /robots.txt
    layout.tsx         # fontes (next/font), metadata, GA/GTM
  components/
    site/              # header, footer, seções da home, blog, efeitos
    admin/             # painéis do admin
    ui/                # shadcn/ui (admin)
  config/site.ts       # equivalente ao config.php (WhatsApp, telefone)
  lib/                 # db, settings, auth (HMAC), admin-guard, seed data
  styles/site.css      # CSS ORIGINAL do site (preservado) + blog
prisma/
  schema.prisma        # Post, SiteSettings, Visit
  seed.ts
public/img/            # imagens WebP originais (sem alteração)
```

## SEO

- Sitemap automático: `/sitemap.xml` (home, blog e artigos publicados)
- `robots.txt` com `Sitemap` e bloqueio de `/admin` e `/api`
- Metadata completa: title, description, canonical, Open Graph e Twitter Cards
- JSON-LD: **AutoRepair (LocalBusiness)**, **FAQPage** (dúvidas da home), **Article + BreadcrumbList** nos artigos, **Blog** e **WebSite**
- H1 único por página; hierarquia H2/H3 preservada do original
- Redirect 301 de `/index.php` → `/` (`vercel.json`)
- Imagens em WebP com `next/image` (lazy loading, AVIF/WebP automático, sem CLS)
- GA4/GTM carregam **somente** quando configurados

## Deploy na Vercel

1. Envie o projeto para o GitHub (GitHub Desktop ou git). **Observação**: `public/img/` tem 13 arquivos e `node_modules/` é ignorado pelo git — nada além do normal.
2. Crie o banco no Neon e copie a `DATABASE_URL`.
3. Na Vercel: *New Project* → importe o repositório → configure as variáveis de ambiente (tabela acima).
4. Deploy. O comando de build é `prisma generate && next build` (idêntico em `package.json` e `vercel.json`).
5. Após o deploy, configure a URL final no painel (SEO e site > URL do site) ou em `NEXT_PUBLIC_SITE_URL`, para gerar canonicals/sitemap corretos.
6. Valide o domínio no Google Search Console e envie `https://seusite/sitemap.xml`.

## QA realizado

- Navegação: menu desktop/mobile, âncoras, CTAs WhatsApp/tel, footer, galeria com lightbox, FAQ
- Blog: listagem, artigo, relacionados, breadcrumb, JSON-LD
- Admin: login/logout, CRUD de artigos, configurações SEO persistidas, estatísticas de visitas
- Responsivo: 1920 / 1440 / 1024 / 768 / 390 (mesma composição do original)
