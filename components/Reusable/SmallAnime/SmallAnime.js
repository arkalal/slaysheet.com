"use client";

import React from "react";
import styles from "./SmallAnime.module.scss";
import Image from "next/image";

const SmallAnime = ({ data }) => {
  return (
    <div className={styles.SmallAnime}>
      <Image src={data} alt="serviceTopic" width={100}></Image>
    </div>
  );
};

export default SmallAnime;
