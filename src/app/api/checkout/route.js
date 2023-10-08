import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  baseUrlProd,
  baseUrlStaging,
  baseUrlTest,
} from "../../../../axios/baseUrl";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export async function GET(req) {
  const prices = await stripe.prices.list({
    limit: 2,
  });

  return NextResponse.json(prices.data);
}

export async function POST(req) {
  const { priceId } = await req.json();
  const user = await currentUser();
  const { userId } = auth();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: user.emailAddresses[0].emailAddress,
    mode: "subscription",
    success_url: `${baseUrlProd}/studio`,
    cancel_url: `${baseUrlProd}/studio`,
    billing_address_collection: "auto",
    metadata: {
      userId: userId,
    },
  });

  return NextResponse.json(session.url);
}
