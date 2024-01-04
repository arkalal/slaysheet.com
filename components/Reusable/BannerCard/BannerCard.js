"use client";

import React from "react";
import styles from "./BannerCard.module.scss";
import Image from "next/image";

const BannerCard = ({ data }) => {
  return (
    <div className={styles.bCard}>
      <div className={styles.lottieAnime}>
        <Image className={styles.lottImg} src={data} alt="BannerImage"></Image>
      </div>
    </div>
  );
};

export default BannerCard;
