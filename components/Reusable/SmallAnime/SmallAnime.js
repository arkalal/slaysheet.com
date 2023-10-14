"use client";

import React from "react";
import styles from "./SmallAnime.module.scss";
import Lottie from "lottie-react";

const SmallAnime = ({ data }) => {
  return (
    <div className={styles.SmallAnime}>
      <Lottie animationData={data} />
    </div>
  );
};

export default SmallAnime;
