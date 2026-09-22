'use client'

import { useEffect, useRef } from 'react'

/**
 * Contador de visitas — registra 1 visita por sessão do navegador.
 * Chama a API /api/track apenas uma vez por página aberta.
 */
export function VisitTracker() {
  const sent = useRef(false)
  useEffect(() => {
    if (sent.current) return
    sent.current = true
    try {
      if (sessionStorage.getItem('asmg_visit_tracked') === '1') return
      sessionStorage.setItem('asmg_visit_tracked', '1')
    } catch {
      /* sessionStorage indisponível — segue para registrar */
    }
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {})
  }, [])
  return null
}
