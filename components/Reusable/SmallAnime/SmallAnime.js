"use client";

import React from "react";
import styles from "./SmallAnime.module.scss";
import Image from "next/image";

const SmallAnime = ({ data }) => {
  return (
    <div className={styles.SmallAnime}>
      <Image
        className={styles.SmallAnimeImg}
        src={data}
        alt="serviceTopic"
      ></Image>
    </div>
  );
};

export default SmallAnime;
