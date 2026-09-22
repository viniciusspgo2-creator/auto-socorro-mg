# Worklog — Migração Auto Socorro MG (PHP → Next.js/Vercel)

---
Task ID: 1
Agent: Z.ai Code (master)
Task: FASE 1-4 — Extração, auditoria, baseline e mapa de migração do ZIP auto-socorro-mg-php

Work Log:
- ZIP extraído para /home/z/my-project/legacy-original/auto-socorro-mg (original intocado = source of truth)
- Auditoria completa: projeto TIPO A (PHP simples: includes header/footer + config.php com WhatsApp/tel)
- Sem banco, sem formulários, sem login, sem uploads, sem email, sem cron, sem .htaccess no ZIP
- 1 página one-page (index.php) com âncoras: #servicos #estrutura #sobre #duvidas
- CSS: assets/css/style.css (identidade completa, paleta preto #08090B / vermelho #E31B23) + compact-equipment.css
- JS vanilla: menu mobile, header scrolled, reveal (IntersectionObserver), FAQ exclusivo (details), lightbox (dialog)
- Fontes: Barlow Condensed (600/700/800) + Inter (400-700) via Google Fonts
- 13 imagens WebP reais (636KB) em assets/img/
- PostgreSQL 16.4 portátil instalado sem root em /tmp/pgbin, data dir /home/z/my-project/db/pgdata, db=autosocorro, user=autosocorro_app/devlocal123, porta 5432

Stage Summary:
- Estratégia: Next.js 16 App Router; CSS original preservado ~100% (src/styles/site.css) — sem "tailwindizar" o visual aprovado
- Header/Footer: Server Components; interações (menu/reveal/FAQ/lightbox) em componentes client mínimos espelhando main.js
- config.php → src/config/site.ts + tabela SiteSettings (editável no admin)
- Novidades pedidas pelo usuário: blog (6 artigos seed), painel admin (SEO/Blog/Visitas), sitemap, robots, JSON-LD (LocalBusiness, FAQ, Article, Breadcrumb), GA/GTM ready
- Banco produção: PostgreSQL serverless (Neon) via Prisma; build = "prisma generate && next build"

---
Task ID: 2
Agent: Z.ai Code (master)
Task: FASE 5-9 — Migração completa, SEO, blog, admin, QA e build

Work Log:
- Front-end: CSS original preservado em src/styles/site.css (style.css + compact-equipment.css, adaptações mínimas: fontes next/font, wrapper .site-root, fix position:relative em contêineres de next/image fill)
- Home 1:1 com index.php: hero, trust-rail, vehicle-rail (SVGs originais), equipment, process, about, benefits, gallery, FAQ, emergency CTA, lightbox, footer, floating actions
- Interações (main.js) replicadas em SiteFx client component: header scrolled, menu mobile, reveal, FAQ exclusivo, lightbox
- config.php → src/config/site.ts + tabela SiteSettings (editável no admin)
- Banco: prisma/schema.prisma (postgresql) com Post, SiteSettings, Visit; db push OK; Postgres local 16.4 na porta 5432
- APIs: /api/track, /api/admin/login|logout, /api/admin/posts(+[id]), /api/admin/settings, /api/admin/visits, /api/admin/seed
- Auth admin: cookie HMAC-SHA256 (Web Crypto), guard server-side em src/lib/admin-guard.ts, ADMIN_PASSWORD/SESSION_SECRET em env
- Blog público: /blog + /blog/[slug] (react-markdown, relacionado, breadcrumb, CTA), 6 artigos seed em src/lib/blog-seed-data.ts + prisma/seed.ts + botão "Restaurar padrão" no admin
- Painel admin: /admin/login, dashboard visitas (total/hoje/7d/gráfico 14 dias), CRUD blog (dialog + toast), página SEO (meta, URL, WhatsApp/telefone, GA4, GTM)
- SEO: sitemap.ts (posts do banco), robots.ts, metadata completa (canonical/OG/Twitter), JSON-LD AutoRepair + FAQPage + WebSite + Article + BreadcrumbList, 1 H1/página, redirect 301 /index.php, headers segurança no vercel.json
- Correções: public/robots.txt estático removido (conflito), title duplicado na home, figure sem position:relative (imagens fill escapavam), img src="" do lightbox, this em handlers (React Compiler)
- QA browser: home desktop/1920/768/390, menu mobile, FAQ exclusivo, lightbox, blog, artigo, admin login/logout/CRUD/settings, contador 1→2 por sessão, 404, console sem erros
- Build: npm install OK; build limpo após excluir pastas de exemplo do tsconfig (examples/skills/tests/legacy-original) e 1 fix de tipo; 15 rotas geradas

Stage Summary:
- Entrega: Next.js 16 + Prisma/PostgreSQL pronto para Vercel; fidelidade visual ~100% (mesmo CSS original)
- Variáveis Vercel: DATABASE_URL (Neon), ADMIN_PASSWORD, SESSION_SECRET (+opcionais NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID)
- build = "prisma generate && next build" idêntico em package.json e vercel.json
- Conexão real com Neon NÃO testada (sem credenciais no ambiente) — testado com Postgres 16.4 local real

---
Task ID: 3
Agent: Z.ai Code (master)
Task: Ajuste final — substituir ícones "palitinhos" por set premium SVG preenchido em todo o site

Work Log:
- Criado src/components/site/icons.tsx: 6 ícones de veículos desenhados sob medida (96x60, silhueta preenchida com recortes evenodd: janelas, rodas pneu/aro/hub, faróis, vincos, linha de solo; lancha com ondas em stroke), + IconArrowUpRight, IconPinFill, IconPhoneFill, IconWhatsAppFill, IconClockFill
- vehicle-rail: componentes Icon (Car, Pickup, Truck, Bus, Tractor, Boat) substituem os paths lineares originais; CSS .vehicle-rail svg → 80x50, fill via currentColor (hover vermelho = ícone branco, verificado no browser)
- Demais ícones: pin preenchido no hero (.location), telefone premium nos botões flutuantes (.float-call) e no número grande do emergency-cta, glifo oficial WhatsApp mantido, setas SVG substituem "↗" em header/home/about/emergency/blog-cta/admin layout, ícones vermelhos nos títulos das colunas do footer (relógio/pin/telefone), ícone no phone-link do about
- CSS: regras atualizadas p/ ícones preenchidos (location, vehicle-rail, floating-actions, btn svg 13px, footer h3 svg 17px vermelho, cta-options svg 25px, phone-link svg 20px) + fix mobile justify-content no telefone do CTA
- JSON-LD movido do 1º filho para o fim do <main> em page.tsx (posição estável; erro de hidratação reportado era artefato de HMR — confirmado com sessão limpa: 0 erros)
- QA agent-browser (sessão nova): home desktop 1440 e mobile 390, hover LANCHAS (vermelho/branco ok), footer, emergency CTA, blog (6 cards + seta), console/erros: 0; lint limpo

Stage Summary:
- Site inteiro agora usa set de ícones premium preenchido e monocromático (currentColor), sem "palitinhos"
- Nenhum impacto em layout/textos/URLs — apenas ícones e microdetalhes (regra 90% respeitada)
- JSON-LD (AutoRepair + FAQ + WebSite) segue íntegro, agora ao fim do main

---
Task ID: 4
Agent: Z.ai Code (master)
Task: Botão TEMPORÁRIO de download do projeto (.zip) — handoff local

Work Log:
- Criada rota TEMPORÁRIA src/app/api/download-project/route.ts: gera .zip via comando zip nativo (sem novas dependências), incluindo src/, public/, prisma/, package.json, package-lock.json, tsconfig.json, next.config.ts, postcss.config.mjs, tailwind.config.ts, components.json, eslint.config.mjs, .env.example, .gitignore, vercel.json, README.md, worklog.md; exclui node_modules/.next/db/legacy-original/examples/tests/bun.lock; serve como attachment auto-socorro-mg-nextjs-YYYY-MM-DD.zip e apaga o temporário de /tmp no finally
- Criado componente TEMPORÁRIO src/components/site/temp-download.tsx ("use client"): botão flutuante amarelo #FFC400 canto inferior-esquerdo (bottom:88px p/ não colidir com dev indicator nem floating-actions), badge "TEMPORÁRIO", ícone SVG premium de download, clip-path no estilo .btn-primary, pulso animado, estado "gerando .zip…"
- Montado em src/app/(site)/layout.tsx com comentários ⚠️ TEMPORÁRIO marcando exatamente o que remover (1 import + 1 tag)
- QA: curl → HTTP 200, 788KB, 158 arquivos, unzip -t OK, nenhum arquivo indesejado no zip; clique no browser → GET /api/download-project 200 sem sair da página; screenshots desktop 1440 e mobile 390 (posição corrigida após overlap com dev indicator); console/erros 0; lint limpo

Stage Summary:
- Usuário pode baixar o projeto completo pelo botão amarelo no site e subir no GitHub Desktop
- Remoção futura = deletar src/components/site/temp-download.tsx + src/app/api/download-project/ + 2 trechos marcados em (site)/layout.tsx
