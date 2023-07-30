"use client";

import React from "react";
import styles from "./PricingCard.module.scss";

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
      <button>Buy Now</button>
    </div>
  );
};

export default PricingCard;
