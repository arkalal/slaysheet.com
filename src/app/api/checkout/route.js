import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(req) {
  const stripe = new Stripe(process.env.STRIPE_API_KEY);
  const prices = await stripe.prices.list({
    limit: 2,
  });

  return NextResponse.json(prices.data);
}
