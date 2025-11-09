export const runtime = "nodejs";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export async function POST(req) {
  const body = await req.text(); // raw body
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Réservation payée:", session.id, session.metadata);
      // 👉 Ici: enregistrer en base / envoyer email / bloquer iCal
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
