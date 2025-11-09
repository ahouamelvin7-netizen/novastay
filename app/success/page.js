export default function Success() {
  return (
    <main style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1 style={{color:"#f59e0b"}}>Merci pour votre réservation !</h1>
      <p style={{opacity:.85}}>Un e-mail de confirmation vous a été envoyé (mode test Stripe).</p>
      <a href="/" style={{marginTop:20,color:"#f59e0b"}}>Retour à l’accueil</a>
    </main>
  );
}
