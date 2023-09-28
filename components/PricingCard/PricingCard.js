"use client";

import React, { useEffect } from "react";
import styles from "./PricingCard.module.scss";
import axios from "../../axios/getApi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PricingCard = ({ data }) => {
  const dynamicPricingCardData = (name) => {
    if (name === "Basic Individual - AI") {
      return (
        <>
          <p> ✓ Get Good Features!!!</p>
          <p> ✓ Free access to all the AI Models</p>
        </>
      );
    }
  };

  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubscription = async (e) => {
    e.preventDefault();

    const postData = {
      priceId: data.id,
    };

    try {
      const res = await axios.post("checkout", postData);
      router.push(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [router, session, status]);

  return (
    <div>
      <h3> {data.nickname} </h3>
      <div>{dynamicPricingCardData(data.nickname)}</div>

      <br />

      <h2>
        {" "}
        {(data.unit_amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        })}{" "}
      </h2>

      <button onClick={handleSubscription}>Buy Now</button>
    </div>
  );
};

export default PricingCard;
