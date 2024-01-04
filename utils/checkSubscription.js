import { getServerSession } from "next-auth";
import axios from "../axios/getApi";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getWebhook = async () => {
  const res = await axios.get("webhook");
  return res.data;
};

const checkSubscription = async () => {
  const webhook = await getWebhook();
  const userSession = await getServerSession(authOptions);

  const isSubscribed = Array.from(webhook.subscription).some(
    (item) => item.user === userSession?.user.email
  );

  if (isSubscribed) {
    return true;
  } else {
    return false;
  }
};

export default checkSubscription;
