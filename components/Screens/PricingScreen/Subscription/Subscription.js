"use client";

import React, { useEffect } from "react";
import styles from "./Subscription.module.scss";
import PricingCard from "../PricingCard/PricingCard";
import { useRouter } from "next/navigation";

const Subscription = ({ priceData }) => {
  const router = useRouter();

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
