'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * ⚠️ TEMPORÁRIO — NÃO FAZ PARTE DA ENTREGA FINAL ⚠️
 * Botão flutuante de download do projeto (.zip) para handoff local.
 * REMOVER este arquivo e a importação em src/app/(site)/layout.tsx
 * após baixar o projeto.
 */
export function TempDownloadButton() {
  const [busy, setBusy] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (busy) return
    setBusy(true)
    window.location.href = '/api/download-project'
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setBusy(false), 6000)
  }, [busy])

  return (
    <button
      type="button"
      className="temp-dl"
      onClick={handleDownload}
      disabled={busy}
      aria-label="Baixar projeto completo em .zip (botão temporário de entrega)"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M11.25 3.5a.75.75 0 0 1 1.5 0v8.69l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L7.72 10.78a.75.75 0 1 1 1.06-1.06l2.47 2.47V3.5Z" />
        <path d="M3.25 14a.75.75 0 0 1 .75.75v2.25c0 .97.78 1.75 1.75 1.75h12.5c.97 0 1.75-.78 1.75-1.75v-2.25a.75.75 0 0 1 1.5 0v2.25A3.25 3.25 0 0 1 18.25 20.25H5.75A3.25 3.25 0 0 1 2.5 17v-2.25A.75.75 0 0 1 3.25 14Z" />
      </svg>
      <span className="temp-dl-text">
        <em>temporário</em>
        <strong>{busy ? 'gerando .zip…' : 'baixar projeto (.zip)'}</strong>
      </span>
      <style>{`
        .temp-dl{position:fixed;left:20px;bottom:88px;z-index:96;display:inline-flex;align-items:center;gap:11px;min-height:56px;padding:0 22px 0 16px;border:0;background:#FFC400;color:#111;box-shadow:0 14px 30px rgba(0,0,0,.45);cursor:pointer;font-family:var(--display,'Barlow Condensed',system-ui);text-transform:uppercase;clip-path:polygon(0 0,100% 0,calc(100% - 11px) 100%,0 100%);animation:temp-dl-pulse 2.4s infinite;transition:transform .2s}
        .temp-dl:hover{transform:translateY(-3px);animation-play-state:paused;background:#ffd133}
        .temp-dl:disabled{opacity:.7;cursor:progress;transform:none}
        .temp-dl svg{width:21px;height:21px;flex:none}
        .temp-dl-text{display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left}
        .temp-dl-text em{font-style:normal;font-size:9px;font-weight:800;letter-spacing:.18em;background:#111;color:#FFC400;padding:2px 7px;line-height:1}
        .temp-dl-text strong{font-size:13px;font-weight:800;letter-spacing:.07em;line-height:1}
        @keyframes temp-dl-pulse{0%,100%{box-shadow:0 14px 30px rgba(0,0,0,.45),0 0 0 0 rgba(255,196,0,.5)}55%{box-shadow:0 14px 30px rgba(0,0,0,.45),0 0 0 13px rgba(255,196,0,0)}}
        @media(max-width:580px){.temp-dl{left:12px;bottom:88px;min-height:48px;gap:9px;padding:0 16px 0 12px}.temp-dl svg{width:18px;height:18px}.temp-dl-text strong{font-size:11px}}
      `}</style>
    </button>
  )
}
