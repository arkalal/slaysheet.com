import { auth } from "@clerk/nextjs";
import stripe from "../../../../utils/stripe";
import { NextResponse } from "next/server";
import UserSubscription from "../../../../models/userSubscription";
import connectMongoDB from "../../../../utils/mongoDB";
import { baseUrlStaging, baseUrlTest } from "../../../../axios/baseUrl";

export async function GET(req) {
  const { userId } = auth();

  await connectMongoDB();
  const userSubscription = await UserSubscription.findOne({
    user: userId,
  });

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: `${baseUrlTest}/services`,
    });

    return NextResponse.json(stripeSession.url);
  }
}
