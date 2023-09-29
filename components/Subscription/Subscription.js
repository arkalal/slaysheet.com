"use client";

import React from "react";
import styles from "./Subscription.module.scss";
import PricingCard from "../PricingCard/PricingCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
