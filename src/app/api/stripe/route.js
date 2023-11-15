import stripe from "../../../../utils/stripe";
import { NextResponse } from "next/server";
import UserSubscription from "../../../../models/userSubscription";
import connectMongoDB from "../../../../utils/mongoDB";
import {
  baseUrlProd,
  baseUrlStaging,
  baseUrlTest,
} from "../../../../axios/baseUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  const userSession = await getServerSession(authOptions);

  if (!userSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  await connectMongoDB();
  const userSubscription = await UserSubscription.findOne({
    user: userSession.user.email,
  });

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: `${baseUrlTest}/studio`,
    });

    return NextResponse.json(stripeSession.url);
  }
}
