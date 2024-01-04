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
  const { priceId, mode, productId, userId } = await req.json();
  const userSession = await getServerSession(authOptions);

  if (!userSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  let session;

  if (mode === "recurring") {
    session = await stripe.checkout.sessions.create({
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
        userId,
        subscription: "recurring",
        productId,
      },
    });
  } else if (mode === "one_time") {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userSession.user.email,
      mode: "payment",
      success_url: `${baseUrlProd}`,
      cancel_url: `${baseUrlProd}`,
      billing_address_collection: "auto",
      metadata: {
        userId,
        subscription: "one_time",
        productId,
      },
    });
  }
  return NextResponse.json(session.url);
}
