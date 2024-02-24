"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./PurchasedTokens.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import tokenImage from "../../../../assets/icons/tokens.png";
import * as dispatcher from "../../../../redux/store/dispatchers";
import { connect } from "react-redux";
import axios from "../../../../axios/getApi";
import { useSession } from "next-auth/react";

const PurchasedTokens = ({ isFree, dispatchTokenValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const buttonClickedRef = useRef(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(false);
    setIsSuccess(false);
    buttonClickedRef.current = false;
  }, []);

  const handleClose = async () => {
    if (buttonClickedRef.current) {
      return;
    }

    buttonClickedRef.current = true;
    setIsLoading(true);

    try {
      const checkout = await axios.get("checkout");
      const getTokenData = await axios.get("aiToken");
      const userWebhook = await axios.get("webhook");
      const user = await axios.get("register");

      const priceData = await checkout.data;

      const filteredPriceData = priceData?.filter(
        (item) => item.nickname === "AI Tokens Plan"
      );

      const isUserToken =
        getTokenData.data.length > 0
          ? getTokenData.data.find((item) => item.user === session.user.email)
          : null;

      const count = isUserToken?.count;
      const tokenId = isUserToken?._id;

      const currentUserWebhook =
        userWebhook.data.subscription.length > 0
          ? userWebhook.data.subscription.find(
              (item) =>
                item.user === session.user.email &&
                item.productId === filteredPriceData[0].product
            )
          : null;

      const currentUser =
        user.data.user.length > 0
          ? user.data.user.find((item) => item.email === session.user.email)
          : null;

      const data = {
        user: session.user.email,
        count: count + 5,
        lock: false,
      };

      const aiTokenData = {
        user: session.user.email,
        count: 5,
        lock: false,
      };

      if (!isFree) {
        if (isUserToken) {
          localStorage.setItem("AITokens", count + 5);
          dispatchTokenValue(count + 5);
          await axios.put(`aiToken/${tokenId}`, data);
        }

        await axios.put(`webhook/${currentUserWebhook._id}`, {
          tokenPurchased: false,
        });
      } else {
        if (!isUserToken) {
          localStorage.setItem("AITokens", 5);
          dispatchTokenValue(5);

          await axios.post("aiToken", aiTokenData);
        }

        await axios.put(`register/${currentUser._id}`, {
          freeTokens: false,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
        router.refresh();
      }, 2000);
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

          <button onClick={handleClose} disabled={isLoading || isSuccess}>
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

export default connect(null, dispatcher)(PurchasedTokens);
