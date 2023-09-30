import React from "react";
import Subscription from "../../../components/Subscription/Subscription";
import axios from "../../../axios/getApi";

// const getPricing = async () => {
//   try {
//     const res = await axios.get("checkout");
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const Pricing = async () => {
  // const priceData = await getPricing();

  return (
    <div>
      {/* <Subscription priceData={priceData}></Subscription> */}
      <p>testing Stripe</p>
    </div>
  );
};

export default Pricing;
