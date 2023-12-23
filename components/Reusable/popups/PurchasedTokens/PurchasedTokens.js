"use client";

import React, { useState } from "react";
import styles from "./PurchasedTokens.module.scss";
import axios from "../../../../axios/getApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import tokenImage from "../../../../assets/icons/tokens.png";

const PurchasedTokens = ({ isFree }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const AddTokens = async () => {
    try {
      const res = await axios.get("aiToken");
      const aiCountData = res.data;

      const isUserToken = aiCountData.some(
        (ai) => ai.user === session.user.email
      );
      const filteredUserToken = aiCountData.filter(
        (user) => user.user === session.user.email
      );

      if (isUserToken) {
        const data = {
          user: session.user.email,
          count: filteredUserToken[0]?.count + 5,
          lock: false,
        };
        await axios.put(`aiToken/${filteredUserToken[0]?._id}`, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    try {
      setIsLoading(true);

      if (!isFree) {
        await AddTokens();

        const checkout = await axios.get("checkout");
        const priceData = checkout.data;

        const filteredPriceData = priceData.filter(
          (item) => item.nickname === "AI Tokens Plan"
        );

        const res = await axios.get("webhook");
        const webhook = res.data;

        const webhookTokenData = webhook.subscription.filter(
          (item) =>
            item.productId === filteredPriceData[0].product &&
            item.user === session?.user.email
        );

        await axios.put(`webhook/${webhookTokenData[0]._id}`, {
          tokenPurchased: false,
        });
      } else {
        const res = await axios.get("aiToken");
        const aiCountData = res.data;

        const isUserToken = aiCountData.some(
          (ai) => ai.user === session.user.email
        );

        if (!isUserToken) {
          const aiTokenData = {
            user: session.user.email,
            count: 5,
            lock: false,
          };
          await axios.post("aiToken", aiTokenData);
        }

        const register = await axios.get("register");
        const registerData = register.data.user;

        const currentRegisteredUser = registerData.filter(
          (item) => item.email === session.user.email
        );

        await axios.put(`register/${currentRegisteredUser[0]._id}`, {
          freeTokens: false,
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(false);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.PurchasedTokens}>
      <div className={styles.PurchasedTokensContent}>
        <div className={styles.PurchasedTokensInteract}>
          {isFree ? (
            <>
              {" "}
              <h2>Claim your Free AI Tokens!</h2>
            </>
          ) : (
            <>
              <h2>Thank you for Purchasing!</h2>
            </>
          )}

          <div className={styles.tokenImg}>
            <Image
              width={100}
              height={100}
              src={tokenImage}
              alt="tokenImage"
            ></Image>
          </div>

          {!isFree && (
            <>
              <p>Claim your 10 Tokens!</p>
            </>
          )}

          <button onClick={handleClose} disabled={isLoading}>
            {isLoading ? (
              <div className={styles.loader}></div>
            ) : isSuccess ? (
              <div className={styles.successMark}>&#10004;</div>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasedTokens;
