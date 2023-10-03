import React from "react";
import Services from "../../../../../components/Services/Services";
import axios from "../../../../../axios/getApi";
import { currentUser } from "@clerk/nextjs";

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

const Service = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Services
        // subscribedId={data && data?._id}
        isSubscribed={isPro}
      ></Services>
    </div>
  );
};

export default Service;
