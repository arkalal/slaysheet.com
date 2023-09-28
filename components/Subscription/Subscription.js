import React from "react";
import styles from "./Subscription.module.scss";
import PricingCard from "../PricingCard/PricingCard";

const Subscription = ({ priceData }) => {
  return (
    <div>
      {priceData &&
        priceData.map((item, index) => {
          return (
            <div key={index}>
              <PricingCard data={item}></PricingCard>
            </div>
          );
        })}
    </div>
  );
};

export default Subscription;
