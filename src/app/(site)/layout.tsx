import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { SiteFx } from '@/components/site/site-fx'
import { VisitTracker } from '@/components/site/visit-tracker'
import { getSettings } from '@/lib/settings'
import { whatsappUrl } from '@/config/site'
import '@/styles/site.css'

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings()
  const whatsappHref = whatsappUrl(settings.whatsappNumber, settings.whatsappMessage)

  return (
    <div className="site-root">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SiteHeader
        navLinks={[
          { href: '/#servicos', label: 'Serviços' },
          { href: '/#estrutura', label: 'Estrutura' },
          { href: '/#sobre', label: 'Sobre' },
          { href: '/#duvidas', label: 'Dúvidas' },
          { href: '/blog', label: 'Blog' },
        ]}
        whatsappHref={whatsappHref}
      />
      {children}
      <SiteFooter
        whatsappHref={whatsappHref}
        phoneDisplay={settings.phoneDisplay}
        phoneE164={settings.phoneE164}
      />
      <SiteFx />
      <VisitTracker />
    </div>
  )
}
