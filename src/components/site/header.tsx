import Image from 'next/image'
import { IconArrowUpRight } from '@/components/site/icons'

type NavLink = { href: string; label: string }

/**
 * Cabeçalho fixo — HTML idêntico ao includes/header.php original.
 * As interações (scroll, menu mobile) são ativadas pelo componente SiteFx.
 */
export function SiteHeader({ navLinks, whatsappHref }: { navLinks: NavLink[]; whatsappHref: string }) {
  return (
    <header className="site-header" id="inicio">
      <div className="container nav-wrap">
        <a className="brand" href="/#inicio" aria-label="Auto Socorro MG - início">
          <Image src="/img/logo.webp" alt="Auto Socorro MG" width={110} height={110} priority />
        </a>
        <button className="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menu">
          <span></span>
          <span></span>
        </button>
        <nav id="main-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-primary nav-cta" href={whatsappHref} target="_blank" rel="noopener">
            Chamar agora <IconArrowUpRight />
          </a>
        </nav>
      </div>
    </header>
  )
}
