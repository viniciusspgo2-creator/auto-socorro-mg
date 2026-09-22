/**
 * Configuração central do site — equivalente ao config.php do projeto original.
 * Os valores padrão refletem exatamente o site aprovado; quando o banco está
 * acessível, os valores editáveis no painel admin (tabela SiteSettings) têm
 * prioridade sobre estes padrões.
 */
export const siteConfig = {
  siteName: 'Auto Socorro MG',
  /**Número completo com DDI+DDD, usado nos links wa.me */
  whatsappNumber: '5517996371352',
  whatsappMessage:
    'Olá! Preciso de atendimento de guincho. Minha localização é:',
  phoneDisplay: '(17) 99637-1352',
  phoneE164: '+5517996371352',
  metaTitle: 'Auto Socorro MG | Guincho 24h em Santa Fé do Sul',
  metaDescription:
    'Auto Socorro 24 horas para carros e veículos pesados em Santa Fé do Sul e região. Ligue ou chame pelo WhatsApp.',
} as const

export type SiteConfig = typeof siteConfig

/** Monta a URL do WhatsApp com mensagem codificada (equivalente a whatsapp_url() do PHP). */
export function whatsappUrl(
  number: string = siteConfig.whatsappNumber,
  message: string = siteConfig.whatsappMessage,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function telUrl(phoneE164: string = siteConfig.phoneE164): string {
  return `tel:${phoneE164}`
}
