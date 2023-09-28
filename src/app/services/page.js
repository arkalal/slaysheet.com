import React from "react";
import Services from "../../../components/Services/Services";
import axios from "../../../axios/getApi";

const getStripeWebhook = async () => {
  try {
    const res = await axios.get("webhook");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Service = async () => {
  const stripeWebhookData = await getStripeWebhook();

  console.log("stripeWebhookData", stripeWebhookData);

  return (
    <div>
      <Services stripeWebhookData={stripeWebhookData}></Services>
    </div>
  );
};

export default Service;
