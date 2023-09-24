"use client";

import React, { useEffect } from "react";
import styles from "./Subscription.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PricingCard from "../PricingCard/PricingCard";

const Subscription = ({ priceData }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [router, session, status]);

  return (
    <div>
      {priceData.map((item, index) => {
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
