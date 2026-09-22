import type { SVGProps } from 'react'

/**
 * Set de ícones premium do site — SVGs desenhados sob medida.
 *
 * Veículos (96x60): silhuetas PRENCHIDAS com recortes evenodd para janelas,
 * rodas com aro/hub, faróis e vincos — substituem os traços finos originais.
 * Todos monocromáticos via fill="currentColor": ficam pretos sobre branco no
 * estado normal e brancos sobre vermelho no hover do vehicle-rail, sem
 * qualquer variação de markup.
 */

const F = { fill: 'currentColor' } as const

/** Roda premium: pneu + aro (recorte) + hub — um único path evenodd. */
function wheelD(cx: number, cy: number, r: number, rim: number, hub: number): string {
  const ring = (rr: number) =>
    `M${cx - rr} ${cy}a${rr} ${rr} 0 1 0 ${rr * 2} 0a${rr} ${rr} 0 1 0 ${-rr * 2} 0Z`
  return `${ring(r)}${ring(rim)}${ring(hub)}`
}

/** Retângulo (com raio opcional) como sub-path — usado para recortes. */
function rectD(x: number, y: number, w: number, h: number, r = 0): string {
  const rr = Math.min(r, w / 2, h / 2)
  const arc = (sx: number, sy: number) =>
    rr ? `a${rr} ${rr} 0 0 1 ${sx * rr} ${sy * rr}` : ''
  return [
    `M${x + rr} ${y}`,
    `h${w - 2 * rr}`, arc(1, 1),
    `v${h - 2 * rr}`, arc(-1, 1),
    `h${-(w - 2 * rr)}`, arc(-1, -1),
    `v${-(h - 2 * rr)}`, arc(1, -1),
    'Z',
  ].join('')
}

function Wheel({ cx, cy, r = 9, rim = 4.1, hub = 1.7 }: { cx: number; cy: number; r?: number; rim?: number; hub?: number }) {
  return <path fillRule="evenodd" d={wheelD(cx, cy, r, rim, hub)} {...F} />
}

function Ground() {
  return <rect x="2" y="53.4" width="92" height="2.6" rx="1.3" {...F} />
}

function VehicleSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 96 60" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/* ─────────────────────────── VEÍCULOS ─────────────────────────── */

export function IconCar() {
  return (
    <VehicleSvg>
      <path
        fillRule="evenodd"
        {...F}
        d={[
          // carroceria sedã com arcos de roda
          'M7 43.5L15.5 43.5A10.5 10.5 0 0 1 36.5 43.5L59.5 43.5A10.5 10.5 0 0 1 80.5 43.5L88 43.5Q90 43.5 90 41.5L90 36.5Q90 31.5 84 30.2L77 28.5Q73.5 27.7 71.5 25.9L64.5 19.5Q61.5 17 57.5 17L42 17Q37.5 17 34.5 19.6L27 26.8Q24 29.6 20 30.4L10.5 32.4Q7 33.2 7 36.5Z',
          // vidro traseiro + dianteiro (pilar B)
          'M33.2 25L37.4 20L41.5 20L41.5 27.3L31.5 27.3Z',
          'M45.5 20L56.5 20L63.5 27.3L45.5 27.3Z',
          // farol dianteiro
          'M82.5 31.8L87.6 33L87.6 35.6L82.5 34.4Z',
        ].join(' ')}
      />
      <Wheel cx={26} cy={45} />
      <Wheel cx={70} cy={45} />
      <Ground />
    </VehicleSvg>
  )
}

export function IconPickup() {
  return (
    <VehicleSvg>
      <path
        fillRule="evenodd"
        {...F}
        d={[
          // caçamba + cabine com arcos de roda
          'M6 43.5L15.5 43.5A10.5 10.5 0 0 1 36.5 43.5L59.5 43.5A10.5 10.5 0 0 1 80.5 43.5L88 43.5Q90 43.5 90 41.5L90 30.5Q90 27.8 87 27L78 25.7Q74.5 25.2 72 25.2L68.5 25.2L61.5 18Q60 16.4 57.5 16.4L45.5 16.4Q44 16.4 44 17.9L44 26L9.8 26Q6 26 6 28.6Z',
          // janelas da cabine
          'M46.5 19.4L54.5 19.4L54.5 25.2L46.5 25.2Z',
          'M57.5 19.4L59.3 19.4L65.5 25.2L57.5 25.2Z',
          // vinco da caçamba
          rectD(11, 30.2, 27.5, 1.8, 0.9),
          // farol
          'M82.5 29.2L87.5 30.2L87.5 33.2L82.5 32.2Z',
        ].join(' ')}
      />
      <Wheel cx={26} cy={45} />
      <Wheel cx={70} cy={45} />
      <Ground />
    </VehicleSvg>
  )
}

export function IconTruck() {
  return (
    <VehicleSvg>
      {/* baú com faixa */}
      <path
        fillRule="evenodd"
        {...F}
        d={[
          'M6 38L6 12Q6 10 8 10L42 10Q44 10 44 12L44 38Z',
          rectD(10.5, 15.5, 29, 1.8, 0.9),
        ].join(' ')}
      />
      {/* escapamento */}
      <rect x="45.2" y="13" width="2.6" height="25" {...F} />
      <rect x="44.4" y="11.4" width="4" height="2.4" rx="1.1" {...F} />
      {/* cabine */}
      <path
        fillRule="evenodd"
        {...F}
        d={[
          'M49 38L49 18Q49 16 51 16L62.5 16Q65 16 66.8 18L71.5 23.5Q73.5 25.8 76.5 26.2L85 27.3Q90 27.9 90 32L90 36Q90 38 88 38Z',
          'M52 19.5L61.5 19.5L68.6 27L52 27Z',
          rectD(53, 31.5, 7, 1.6, 0.8),
          'M83 31L88.4 31.8L88.4 34.8L83 34Z',
        ].join(' ')}
      />
      <Wheel cx={20} cy={45} rim={4} hub={1.6} />
      <Wheel cx={36} cy={45} rim={4} hub={1.6} />
      <Wheel cx={72} cy={45} rim={4} hub={1.6} />
      <Ground />
    </VehicleSvg>
  )
}

export function IconBus() {
  return (
    <VehicleSvg>
      <path
        fillRule="evenodd"
        {...F}
        d={[
          // monobloco
          'M6 34.5L6 14Q6 10 10 10L86 10Q90 10 90 14L90 34.5Q90 38.5 86 38.5L10 38.5Q6 38.5 6 34.5Z',
          // 5 janelas
          rectD(12, 14.5, 9.6, 12, 1),
          rectD(23.8, 14.5, 9.6, 12, 1),
          rectD(35.6, 14.5, 9.6, 12, 1),
          rectD(47.4, 14.5, 9.6, 12, 1),
          rectD(59.2, 14.5, 9.6, 12, 1),
          // porta dupla + parabrisa
          rectD(72, 14.5, 3.6, 22, 1),
          rectD(76.6, 14.5, 2.9, 22, 1),
          rectD(82, 14.5, 4.8, 12.5, 1),
          // faixa lateral + farol
          rectD(12, 30.3, 56, 1.5, 0.75),
          rectD(82.5, 31.5, 5.5, 2.6, 1),
        ].join(' ')}
      />
      {/* ar-condicionado de teto */}
      <rect x="28" y="6.8" width="18" height="3.2" rx="1.4" {...F} />
      <Wheel cx={24} cy={45} rim={4} hub={1.6} />
      <Wheel cx={72} cy={45} rim={4} hub={1.6} />
      <Ground />
    </VehicleSvg>
  )
}

export function IconTractor() {
  return (
    <VehicleSvg>
      {/* chassi + eixo dianteiro */}
      <rect x="12" y="34" width="76" height="3.8" rx="1.6" {...F} />
      <rect x="69.5" y="37" width="3" height="7" {...F} />
      {/* cabine com vidro */}
      <path
        fillRule="evenodd"
        {...F}
        d={[
          'M16.5 34L16.5 12Q16.5 10 18.5 10L44.5 10Q46.5 10 46.5 12L46.5 34Z',
          rectD(20.5, 14, 22, 12.5, 0.8),
        ].join(' ')}
      />
      {/* escapamento */}
      <rect x="48.6" y="12.5" width="2.6" height="9.5" {...F} />
      <rect x="47.8" y="10.8" width="4.2" height="2.2" rx="1" {...F} />
      {/* capô */}
      <path
        fillRule="evenodd"
        {...F}
        d={[
          'M46.5 34L46.5 24Q46.5 22 48.5 22L82 22Q86.5 22 88.5 24.8Q90 27 90 29.5L90 32Q90 34 88 34Z',
          rectD(52, 25, 24, 1.4, 0.7),
          rectD(83.5, 27, 5, 2.6, 0.8),
        ].join(' ')}
      />
      <Wheel cx={25} cy={40} r={13.5} rim={6.2} hub={2.4} />
      <Wheel cx={71} cy={46.5} r={7} rim={3.1} hub={1.1} />
      <Ground />
    </VehicleSvg>
  )
}

export function IconBoat() {
  return (
    <VehicleSvg>
      <path
        fillRule="evenodd"
        {...F}
        d={[
          // casco com proa lançada
          'M8 31Q50 27.8 91 21.5Q85.5 32.5 75.5 38.8Q62 44.8 46 44.8L19.5 44.8Q12.5 44.8 8 31Z',
          // janela do cockpit + escotilha de proa
          'M22 33.9L56 29.7L58.6 33.4L24.6 38.3Z',
          'M76 26.6L86.5 23.8L87.8 26.3L77.4 29.3Z',
        ].join(' ')}
      />
      {/* parabrisa */}
      <path d="M58.5 30.2L70.8 22.7L74.2 25.2L61.8 32.7Z" {...F} />
      {/* ondas */}
      <path
        d="M6 51.5c3.5-3.6 7-3.6 10.5 0s7 3.6 10.5 0 7-3.6 10.5 0 7 3.6 10.5 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ fill: 'none' }}
      />
      <path
        d="M52 55c3.5-3.6 7-3.6 10.5 0s7 3.6 10.5 0 7-3.6 10.5 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ fill: 'none' }}
      />
    </VehicleSvg>
  )
}

/* ─────────────────────────── UI / CONTATO ─────────────────────────── */

/** Seta diagonal dos botões (substitui o caractere ↗). */
export function IconArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M7 17L17 7M9.2 7H17v7.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Pin de localização premium (preenchido com recorte central). */
export function IconPinFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        fill="currentColor"
        d={[
          'M12 1.6c-4.1 0-7.4 3.3-7.4 7.4 0 5.5 7.4 13.4 7.4 13.4s7.4-7.9 7.4-13.4c0-4.1-3.3-7.4-7.4-7.4Z',
          'M12 5.9a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z',
        ].join(' ')}
      />
    </svg>
  )
}

/** Telefone preenchido (glifo clássico sólido). */
export function IconPhoneFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.21c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
      />
    </svg>
  )
}

/** WhatsApp (glifo oficial). */
export function IconWhatsAppFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4A11.9 11.9 0 0 0 24 11.9c0-3.2-1.2-6.2-3.5-8.4Zm-8.4 18.2c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1 4.2.8.7-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"
      />
    </svg>
  )
}

/** Relógio preenchido com ponteiros em recorte (atendimento 24h). */
export function IconClockFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        fill="currentColor"
        d={[
          'M12 1.5A10.5 10.5 0 1 0 12 22.5 10.5 10.5 0 0 0 12 1.5Z',
          'M11 5.6h2v6.5l4.7 2.8-1 1.7-5.7-3.4Z',
        ].join(' ')}
      />
    </svg>
  )
}
