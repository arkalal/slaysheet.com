import mongoose, { Schema } from "mongoose";

const userSubscriptionSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: "User",
  },
  productId: {
    type: String,
    required: true,
  },
  stripeCustomerId: {
    type: String,
  },
  stripeSubscriptionId: {
    type: String,
  },
  stripePriceId: {
    type: String,
  },
  stripeCurrentPeriodEnd: {
    type: Date,
  },
  productItem: [
    {
      product: {
        type: String,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserSubscription =
  mongoose.models.UserSubscription ||
  mongoose.model("UserSubscription", userSubscriptionSchema);

export default UserSubscription;
