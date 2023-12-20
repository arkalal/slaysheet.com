import React from "react";
import styles from "./BuyTokenPopup.module.scss";
import Image from "next/image";
import tokenImage from "../../../../assets/icons/tokens.png";
import { useRouter } from "next/navigation";

const BuyTokenPopup = () => {
  const router = useRouter();

  return (
    <div className={styles.BuyTokenPopup}>
      <div className={styles.BuyTokenPopupContent}>
        <div className={styles.BuyTokenPopupInteract}>
          <h2>All Tokens Expired 🙂</h2>

          <div className={styles.tokenImg}>
            <Image
              src={tokenImage}
              alt="tokenImage"
              height={100}
              width={100}
            ></Image>
          </div>

          <button onClick={() => router.push("/pricing")}>Buy Tokens</button>
        </div>
      </div>
    </div>
  );
};

export default BuyTokenPopup;
