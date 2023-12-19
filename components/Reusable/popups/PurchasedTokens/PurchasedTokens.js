"use client";

import React from "react";
import styles from "./PurchasedTokens.module.scss";
import axios from "../../../../axios/getApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PurchasedTokens = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClose = async () => {
    try {
      const checkout = await axios.get("checkout");
      const priceData = checkout.data;

      const filteredPriceData = priceData.filter(
        (item) => item.nickname === "AI Tokens Plan"
      );

      const res = await axios.get("webhook");
      const webhook = res.data;

      console.log("webhook", webhook);

      const webhookTokenData = webhook.subscription.filter(
        (item) =>
          item.productId === filteredPriceData[0].product &&
          item.user === session?.user.email
      );

      console.log("webhookTokenData", webhookTokenData);

      await axios.put(`webhook/${webhookTokenData[0]._id}`, {
        tokenPurchased: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className={styles.PurchasedTokens}>
      <div className={styles.PurchasedTokensContent}>
        <div className={styles.PurchasedTokensInteract}>
          <h2>Thank you for Purchasing!</h2>
          <button onClick={handleClose}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default PurchasedTokens;
