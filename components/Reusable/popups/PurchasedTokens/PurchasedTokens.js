"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./PurchasedTokens.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import tokenImage from "../../../../assets/icons/tokens.png";
import * as dispatcher from "../../../../redux/store/dispatchers";
import { connect } from "react-redux";
import { AddTokensLogic } from "../../../../utils/serverApiLogics";
import axios from "../../../../axios/getApi";

const PurchasedTokens = ({ isFree, dispatchTokenValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const buttonClickedRef = useRef(false);

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

      const priceData = await checkout.data;

      const filteredPriceData = priceData?.filter(
        (item) => item.nickname === "AI Tokens Plan"
      );

      const addTokenLog = await AddTokensLogic(isFree, filteredPriceData);

      if (!isFree) {
        if (addTokenLog.isUserToken) {
          localStorage.setItem("AITokens", addTokenLog.isUserToken.count + 5);
          dispatchTokenValue(addTokenLog.isUserToken.count + 5);
        }
      } else {
        if (!addTokenLog.isUserToken) {
          localStorage.setItem("AITokens", 5);
          dispatchTokenValue(5);
        }
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
