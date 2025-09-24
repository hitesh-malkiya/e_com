import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Page not found</h1>
        <p style={{ color: '#666', marginBottom: '16px' }}>The page you are looking for doesn&apos;t exist or was moved.</p>
        <Link href="/" style={{ padding: '8px 12px', borderRadius: '6px', background: '#111', color: '#fff' }}>
          Go to Home
        </Link>
      </div>
    </div>
  )
}


