'use client'

import Script from 'next/script'

/**
 * Google Analytics 4 e Google Tag Manager — carregam apenas quando os IDs
 * estão configurados (painel admin > SEO, ou variáveis de ambiente).
 * Nada é injetado sem configuração: zero impacto no Core Web Vitals.
 */
export function Analytics({ gaId, gtmId }: { gaId?: string; gtmId?: string }) {
  const ga = gaId?.trim()
  const gtm = gtmId?.trim()
  if (!ga && !gtm) return null
  return (
    <>
      {gtm && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  )
}
