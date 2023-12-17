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

const AddTokens = async () => {
  const res = await axios.get("aiToken");
  const aiCountData = res.data;

  const isUserToken = aiCountData.some((ai) => ai.user === session.user.email);
  const filteredUserToken = aiCountData.filter(
    (user) => user.user === session.user.email
  );

  if (isUserToken) {
    const data = {
      user: session.user.email,
      count: filteredUserToken[0]?.count + 5,
      lock: false,
    };
    await axios.put(`aiToken/${filteredUserToken[0]?._id}`, data);
  }
};

const checkTokenPurchase = async () => {
  const webhook = await getWebhook();
  const priceData = await tokenPriceData();
  const userSession = await getServerSession(authOptions);

  const filteredPriceData = priceData.filter(
    (item) => item.nickname === "AI Tokens Plan"
  );

  const isPurchased = Array.from(webhook.subscription).some(
    (item) =>
      item.productId === filteredPriceData[0].product &&
      item.user === userSession?.user.email
  );

  return isPurchased;
};

export default checkTokenPurchase;
