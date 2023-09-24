import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import UserSubscription from "../../../../models/userSubscription";
import connectMongoDB from "../../../../utils/mongoDB";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const getPriceItem = async (line_items) => {
  const productItemPromises = line_items?.data.map(async (item) => {
    const product = await stripe.products.retrieve(item.price.product);
    const productId = product.id;

    console.log("product", product);
    console.log("price", item.price);

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

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );
      const orderSubscription = await getPriceItem(line_items);
      const userId = session.metadata.userId;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
      };

      const orderData = {
        user: userId,
        paymentInfo,
        orderSubscription,
      };

      await connectMongoDB();
      await UserSubscription.create(orderData);
    }
    return new NextResponse("processed webhook", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
