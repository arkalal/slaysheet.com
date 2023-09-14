import mongoose, { Schema } from "mongoose";

const userSubscriptionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
    },
    stripePriceId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserSubscription =
  mongoose.models.UserSubscription ||
  mongoose.model("UserSubscription", userSubscriptionSchema);

export default UserSubscription;
