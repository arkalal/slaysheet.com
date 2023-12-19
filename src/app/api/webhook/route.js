import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import UserSubscription from "../../../../models/userSubscription";
import connectMongoDB from "../../../../utils/mongoDB";
import axios from "../../../../axios/getApi";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const getPriceItem = async (line_items) => {
  const productItemPromises = line_items?.data.map(async (item) => {
    const product = await stripe.products.retrieve(item.price.product);
    const productId = product.id;

    return {
      product: productId,
      name: product.name,
      price: item.price.unit_amount_decimal / 100,
      quantity: item.quantity,
    };
  });

  // Wait for all promises to resolve
  const productItem = await Promise.all(productItemPromises);

  return productItem;
};

const PriceData = async () => {
  const res = await axios.get("checkout");
  return res.data;
};

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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("session", session);

      if (!session?.metadata?.userId) {
        return NextResponse.json(
          { message: "User id is required" },
          { status: 400 }
        );
      }

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );
      const productItem = await getPriceItem(line_items);
      const userId = session.metadata.userId;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
      };

      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );

        const orderData = {
          user: userId,
          productId: session.metadata.productId,
          stripeCustomerId: subscription.customer,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          paymentInfo,
          productItem,
        };

        await connectMongoDB();
        await UserSubscription.create(orderData);
      } else if (session.mode === "payment") {
        const orderData = {
          user: userId,
          productId: session.metadata.productId,
          paymentInfo,
          productItem,
          tokenPurchased: true,
        };

        const priceData = await PriceData();

        const filteredPriceData = priceData.filter(
          (item) => item.nickname === "AI Tokens Plan"
        );

        await connectMongoDB();
        const userSubscription = await UserSubscription.findOne({
          productId: filteredPriceData[0].product,
        });

        if (!userSubscription) {
          await UserSubscription.create(orderData);
        } else {
          await UserSubscription.findOneAndUpdate(
            {
              productId: filteredPriceData[0].product,
            },
            {
              tokenPurchased: true,
            }
          );

          return;
        }
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const session = event.data.object;

      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );

        await connectMongoDB();
        await UserSubscription.findOneAndUpdate(
          {
            stripeSubscriptionId: subscription.id,
          },
          {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          }
        );
      }
    }

    return NextResponse.json({ message: "processed webhook" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  await connectMongoDB();
  const subscription = await UserSubscription.find();
  return NextResponse.json({ subscription }, { status: 200 });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await UserSubscription.findByIdAndDelete(id);
  return NextResponse.json({ message: "webhook deleted" }, { status: 200 });
}
