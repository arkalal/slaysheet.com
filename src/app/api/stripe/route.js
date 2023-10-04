import { auth } from "@clerk/nextjs";
import stripe from "../../../../utils/stripe";
import { NextResponse } from "next/server";
import UserSubscription from "../../../../models/userSubscription";

export async function GET(req) {
  const { userId } = auth();

  const userSubscription = await UserSubscription.findOne({
    user: userId,
  });

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: `${baseUrlStaging}/services`,
    });

    return NextResponse.json(stripeSession.url);
  }
}
