"use client";

import React from "react";
import styles from "./PricingCard.module.scss";
import axios from "../../../../axios/getApi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PricingCard = ({ data }) => {
  const { data: session } = useSession();

  const dynamicPricingCardData = (name) => {
    if (name === "AI Tokens Plan") {
      return (
        <>
          <p> ✓ 50 AI Tokens</p>
          <p> ✓ Full Access for All AI tools</p>
          <p> ✓ Join Discord Community</p>
          <p> ✓ Early Access Perks</p>
          <p> ✓ What Feature You Want? We Will Build It</p>
        </>
      );
    }

    if (name === "Free") {
      return (
        <>
          <p> ✓ 20 AI Tokens</p>
          <p> ✓ Full Access for All AI tools</p>
          <p> ✓ Join Discord Community</p>
          <p> ✓ Early Access Perks</p>
          <p> ✓ What Feature You Want? We Will Build It</p>
        </>
      );
    }
  };

  const router = useRouter();

  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!session) {
      router.push("/login");
    }

    const postData = {
      priceId: data.id,
      mode: data.type,
      productId: data.product,
      userId: session?.user.email,
    };

    try {
      if (session && data.unit_amount === 0) {
        router.push("/");
      }

      if (session && data.unit_amount !== 0) {
        const res = await axios.post("checkout", postData);
        router.push(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.PricingCard}>
        <h3> {data.nickname} </h3>
        <div className={styles.pricingFeatures}>
          {dynamicPricingCardData(data.nickname)}
        </div>

        <br />

        <h2>
          {" "}
          {(data.unit_amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}{" "}
        </h2>
        <p>One Time Pay</p>

        <button onClick={handleSubscription}>
          {data.unit_amount === 0 ? "Get Started" : "Buy Now"}
        </button>
      </div>
    </>
  );
};

export default PricingCard;
