"use client";

import React from "react";
import styles from "./BannerCard.module.scss";
import Image from "next/image";

const BannerCard = ({ data }) => {
  return (
    <div className={styles.bCard}>
      <div className={styles.lottieAnime}>
        <Image src={data} alt="BannerImage" width={350}></Image>
      </div>
    </div>
  );
};

export default BannerCard;
