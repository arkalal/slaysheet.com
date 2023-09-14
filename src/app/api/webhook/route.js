import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import UserSubscription from "../../../../models/userSubscription";
import connectMondoDB from "../../../../utils/mongoDB";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    const userId = session?.metadata?.userId;

    // Connect to MongoDB
    await connectMondoDB();

    // Create a new UserSubscription instance
    const newUserSubscription = new UserSubscription({
      userId: session?.metadata?.userId,
      stripeCustomerId: subscription.customer,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
    });

    // Save the new UserSubscription to the database
    try {
      await newUserSubscription.save();
    } catch (error) {
      return new NextResponse(
        `Error creating UserSubscription: ${error.message}`,
        { status: 400 }
      );
    }

    const userSubscription = await UserSubscription.findOne({ userId });

    if (!session?.metadata?.userId) {
      return new NextResponse("UserId is required", { status: 400 });
    }

    if (userSubscription) {
      // User has a subscription; you can redirect them to the premium page.

      return new NextResponse("User has an active subscription", {
        status: 200,
      });
    } else {
      // User doesn't have a subscription; redirect them to the normal page.
      // Implement the redirect logic here.

      return new NextResponse("User doesn't have an active subscription", {
        status: 200,
      });
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    // Connect to MongoDB
    await connectMondoDB();

    try {
      // Find the existing user subscription by the subscription ID
      const existingUserSubscription = await UserSubscription.findOne({
        stripeSubscriptionId: subscription.id,
      });

      if (existingUserSubscription) {
        // Update the existing user subscription
        existingUserSubscription.stripeCustomerId = subscription.customer;
        existingUserSubscription.stripePriceId =
          subscription.items.data[0].price.id;

        // Save the updated user subscription
        await existingUserSubscription.save();

        return new NextResponse("User subscription updated", { status: 200 });
      } else {
        return new NextResponse("User subscription not found", { status: 404 });
      }
    } catch (error) {
      return new NextResponse(
        `Error updating UserSubscription: ${error.message}`,
        { status: 400 }
      );
    }
  }

  return new NextResponse("Webhook processed successfully", { status: 200 });
}
