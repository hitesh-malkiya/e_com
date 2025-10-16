
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        textAlign: 'center',
        background: 'transparent'
      }}
    >
      <div>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Page not found</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>
         {" "}
        </p>

        <Link
          href="/"
          aria-label="Go to home"
          style={{
            display: 'inline-block',
            padding: '8px 12px',
            borderRadius: 6,
            background: '#111',
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}


