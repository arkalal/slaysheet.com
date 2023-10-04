import { auth } from "@clerk/nextjs";
import axios from "../axios/getApi";

const getWebhook = async () => {
  const res = await axios.get("webhook");
  return res.data;
};

const checkSubscription = async () => {
  const webhook = await getWebhook();
  const { userId } = auth();

  const isSubscribed = Array.from(webhook.subscription).some(
    (item) => item.user === userId
  );

  if (isSubscribed) {
    return true;
  } else {
    return false;
  }
};

export default checkSubscription;
