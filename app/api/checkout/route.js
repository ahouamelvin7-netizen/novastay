export const runtime = "nodejs";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const RATE = 45000; // 450€ en cents

export async function POST(req) {
  try {
    const { nights = 1, startDate, endDate, locale = "fr" } = await req.json();
    const n = Number(nights);
    if (!Number.isFinite(n) || n < 1 || n > 30) {
      return NextResponse.json({ error: "Invalid nights" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "eur",
      line_items: [{
        quantity: n,
        price_data: {
          currency: "eur",
          unit_amount: RATE,
          product_data: {
            name: "Novastay – Villa Paradise (par nuit)",
            description: startDate && endDate ? `Séjour du ${startDate} au ${endDate}` : "Réservation Novastay"
          }
        }
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: { nights: String(n), startDate: startDate || "", endDate: endDate || "" },
      locale
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
