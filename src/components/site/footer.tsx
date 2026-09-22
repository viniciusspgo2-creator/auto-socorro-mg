import Image from 'next/image'
import {
  IconClockFill,
  IconPhoneFill,
  IconPinFill,
  IconWhatsAppFill,
} from '@/components/site/icons'

/** Rodapé + ações flutuantes — estrutura do includes/footer.php original com set de ícones premium. */
export function SiteFooter({
  whatsappHref,
  phoneDisplay,
  phoneE164,
}: {
  whatsappHref: string
  phoneDisplay: string
  phoneE164: string
}) {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-main">
          <a className="footer-logo" href="/#inicio">
            <Image src="/img/logo.webp" alt="Auto Socorro MG" width={120} height={120} />
          </a>
          <div>
            <h3>
              <IconClockFill />
              Atendimento
            </h3>
            <p>24 horas por dia</p>
            <p>Todos os dias da semana</p>
          </div>
          <div>
            <h3>
              <IconPinFill />
              Localização
            </h3>
            <p>Santa Fé do Sul</p>
            <p>Atendimento na região</p>
          </div>
          <div>
            <h3>
              <IconPhoneFill />
              Contato
            </h3>
            <a href={`tel:${phoneE164}`}>{phoneDisplay}</a>
            <a href={whatsappHref} target="_blank" rel="noopener">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © <CurrentYear /> Auto Socorro MG. Todos os direitos reservados.
          </span>
          <span>Atendimento 24h em Santa Fé do Sul e região.</span>
        </div>
      </footer>
      <div className="floating-actions" aria-label="Ações rápidas">
        <a className="float-call" href={`tel:${phoneE164}`} aria-label="Ligar agora">
          <IconPhoneFill />
          <span>Ligar</span>
        </a>
        <a
          className="float-whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noopener"
          aria-label="Chamar pelo WhatsApp"
        >
          <IconWhatsAppFill />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  )
}

function CurrentYear() {
  return (
    <span suppressHydrationWarning>{new Date().getFullYear()}</span>
  )
}
