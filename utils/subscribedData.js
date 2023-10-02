import UserSubscription from "../models/userSubscription";
import { currentUser } from "@clerk/nextjs";
import axios from "../axios/getApi";

const getWebhookData = async () => {
  const res = await axios.get("webhook");
  return res.data;
};

const subscribedData = async () => {
  const webhook = await getWebhookData();
  const user = await currentUser();

  if (webhook) {
    const subscribedData = await UserSubscription.findOne({
      user: user?.emailAddresses[0].emailAddress,
    });

    return subscribedData;
  }
};

export default subscribedData;
