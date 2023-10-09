import React from "react";
import Subscription from "../../../components/Screens/PricingScreen/Subscription/Subscription";
import axios from "../../../axios/getApi";

const getPricing = async () => {
  try {
    const res = await axios.get("checkout");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Pricing = async () => {
  const priceData = await getPricing();
  console.log("priceData", priceData);

  return (
    <div>
      <Subscription priceData={priceData}></Subscription>
    </div>
  );
};

export default Pricing;
