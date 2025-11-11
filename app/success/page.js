export default function SuccessPage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom, #fff8e1, #fff)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: '#ff9800', fontSize: '2.5rem', marginBottom: '20px' }}>
        ✅ Merci pour votre réservation
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Votre paiement a bien été confirmé.<br />Nous vous contacterons très vite pour les détails de votre séjour.
      </p>
      <a href="/" style={{
        background: '#ff9800',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        Retour à l’accueil
      </a>
    </main>
  )
}
