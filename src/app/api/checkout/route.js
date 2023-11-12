import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  baseUrlProd,
  baseUrlStaging,
  baseUrlTest,
} from "../../../../axios/baseUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

  if (!userSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: userSession.user.email,
    mode: "subscription",
    success_url: `${baseUrlProd}/studio`,
    cancel_url: `${baseUrlProd}/studio`,
    billing_address_collection: "auto",
    metadata: {
      userId: userSession.user.email,
    },
  });

  return NextResponse.json(session.url);
}
