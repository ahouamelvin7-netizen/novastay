"use client";
import { useState } from "react";

export default function Home() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [nights, setNights] = useState(1);

  function computeNights(a, b) {
    if (!a || !b) return 1;
    const d1 = new Date(a), d2 = new Date(b);
    const n = Math.round((d2 - d1) / (1000*60*60*24));
    return Math.max(1, n);
  }

  async function pay() {
    const n = computeNights(start, end);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ nights: n, startDate: start, endDate: end, locale: "fr" })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Erreur paiement: " + (data.error || "inconnue"));
  }

  return (
    <main style={{minHeight:"100vh"}}>
      <section style={{
        height:"60vh",
        backgroundImage:"url(https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1950&q=80)",
        backgroundSize:"cover",backgroundPosition:"center",
        display:"flex",alignItems:"center",justifyContent:"center",
        position:"relative"
      }}>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
        <div style={{position:"relative",textAlign:"center"}}>
          <h1 style={{fontSize:42,marginBottom:12,color:"#f59e0b"}}>Votre villa, votre paradis</h1>
          <p style={{opacity:.9,marginBottom:20}}>Novastay — luxe moderne & chaleur caribéenne</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <input type="date" value={start} onChange={e=>setStart(e.target.value)} style={field}/>
            <input type="date" value={end} onChange={e=>setEnd(e.target.value)} style={field}/>
            <input type="number" min="1" value={nights}
                   onChange={e=>setNights(Math.max(1, Number(e.target.value)))}
                   placeholder="Nuits" style={field}/>
            <button onClick={pay} style={btn}>Réserver maintenant</button>
          </div>
          <p style={{marginTop:12,opacity:.8}}>Tarif démo : <b>450 € / nuit</b></p>
        </div>
      </section>

      <div style={{padding:"24px 16px",textAlign:"center"}}>
        <p>Après paiement, tu seras redirigé sur une page de succès.</p>
      </div>
    </main>
  );
}

const field = { background:"rgba(255,255,255,0.08)", color:"#fff", padding:"10px 12px", border:"1px solid #2a2a2a", borderRadius:10 };
const btn = { background:"#f59e0b", color:"#000", border:"none", padding:"10px 16px", borderRadius:12, fontWeight:700, cursor:"pointer" };
