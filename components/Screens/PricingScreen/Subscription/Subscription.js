"use client";

import React, { useEffect } from "react";
import styles from "./Subscription.module.scss";
import PricingCard from "../PricingCard/PricingCard";
import { useRouter } from "next/navigation";

const Subscription = ({ priceData }) => {
  const router = useRouter();
  console.log("priceData", priceData);

  return (
    <div className={styles.Subscription}>
      <div className={styles.subHead}>
        <h2>Our Pricing Plans</h2>
        <p>Choose it right away!</p>
      </div>

      <div className={styles.priceCards}>
        {priceData &&
          priceData.map((item, index) => {
            return (
              <div key={index}>
                {item.type === "one_time" && item.unit_amount === 14900 && (
                  <>
                    <PricingCard data={item}></PricingCard>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Subscription;
