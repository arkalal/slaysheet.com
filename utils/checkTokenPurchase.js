import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "../axios/getApi";
import { getServerSession } from "next-auth";

const getWebhook = async () => {
  const res = await axios.get("webhook");
  return res.data;
};

const tokenPriceData = async () => {
  const res = await axios.get("checkout");
  return res.data;
};

const checkTokenPurchase = async () => {
  const webhook = await getWebhook();
  const priceData = await tokenPriceData();
  const userSession = await getServerSession(authOptions);

  const filteredPriceData = priceData.filter(
    (item) => item.nickname === "AI Tokens Plan"
  );

  const webhookTokenData = webhook.subscription.filter(
    (item) =>
      item.productId === filteredPriceData[0].product &&
      item.user === userSession?.user.email
  );

  const isPurchased = webhookTokenData[0]?.tokenPurchased;

  return isPurchased;
};

export default checkTokenPurchase;
