"use client";

import React from "react";
import styles from "./BannerCard.module.scss";
import Lottie from "lottie-react";

const BannerCard = ({ data }) => {
  return (
    <div className={styles.bCard}>
      <div className={styles.lottieAnime}>
        <Lottie animationData={data} />
      </div>
    </div>
  );
};

export default BannerCard;
