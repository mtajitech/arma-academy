export default function HomePage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      background: '#0a0a1a',
      color: '#ffffff',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>ARMA Academy</h1>
      <p style={{ fontSize: '1.25rem', color: '#94a3b8' }}>Institutional Portal — B2B dashboard for corporate and FI clients</p>
      <p style={{ marginTop: '2rem', color: '#64748b' }}>Coming Soon — Phase 0 Scaffold</p>
    </main>
  );
}
