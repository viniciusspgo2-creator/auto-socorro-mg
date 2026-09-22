import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        background: '#08090b',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div>
        <p
          style={{
            color: '#e31b23',
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Erro 404
        </p>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', Impact, sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: 'clamp(48px,8vw,90px)',
            lineHeight: 0.95,
            margin: '12px 0 16px',
          }}
        >
          Página não encontrada.
        </h1>
        <p style={{ color: '#9ca3aa', margin: '0 0 28px' }}>
          O endereço que você tentou abrir não existe ou foi movido.
        </p>
        <Link
          href="/"
          style={{
            background: '#e31b23',
            color: '#fff',
            padding: '16px 25px',
            fontSize: 12,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
