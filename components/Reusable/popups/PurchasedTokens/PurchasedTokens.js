"use client";

import React from "react";
import styles from "./PurchasedTokens.module.scss";

const PurchasedTokens = ({ handleClose }) => {
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
