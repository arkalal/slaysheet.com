import React from "react";
import styles from "./BuyTokenPopup.module.scss";

const BuyTokenPopup = () => {
  return (
    <div className={styles.BuyTokenPopup}>
      <div className={styles.BuyTokenPopupContent}>
        <div className={styles.BuyTokenPopupInteract}>
          <h2>Buy Tokens!!</h2>
        </div>
      </div>
    </div>
  );
};

export default BuyTokenPopup;
