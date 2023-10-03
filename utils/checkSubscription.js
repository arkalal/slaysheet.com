import { currentUser } from "@clerk/nextjs";
import axios from "../axios/getApi";

const getWebhook = async () => {
  const res = await axios.get("webhook");
  return res.data;
};

const checkSubscription = async () => {
  const user = await currentUser();
  const webhook = await getWebhook();

  const isSubscribed = Array.from(webhook.subscription).some(
    (item) => item.user === user.emailAddresses[0].emailAddress
  );

  if (isSubscribed) {
    return true;
  } else {
    return false;
  }
};

export default checkSubscription;
