import Stripe from "stripe";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  baseUrlProd,
  baseUrlStaging,
  baseUrlTest,
} from "../../../../axios/baseUrl";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export async function GET(req) {
  const prices = await stripe.prices.list({
    limit: 2,
  });

  return NextResponse.json(prices.data);
}

export async function POST(req) {
  const { priceId } = await req.json();
  const userSession = await getServerSession(authOptions);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: userSession.user.email,
    mode: "subscription",
    success_url: `${baseUrlProd}/services`,
    cancel_url: `${baseUrlProd}/services`,
    billing_address_collection: "auto",
    metadata: {
      userId: userSession.user.email,
    },
  });

  return NextResponse.json(session.url);
}
