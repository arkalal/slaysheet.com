"use client";

import React from "react";
import styles from "./GenImages.module.scss";
import Image from "next/image";
import TypingText from "../../../Reusable/TypingText/TypingText";
import { genImagesTypewriterText } from "../../../../customData/data";
import genImages from "../../../../assets/icons/genImages.png";
import BlueButton from "../../../Reusable/BlueButton/BlueButton";
import { useRouter } from "next/navigation";

const GenImages = () => {
  const router = useRouter();

  return (
    <div className={styles.GenImages}>
      <Image
        className={styles.genImg}
        src={genImages}
        alt="PDFChatImage"
        width={150}
      ></Image>
      <h2>
        <TypingText typingData={genImagesTypewriterText} />
      </h2>
      <h3>Powered By DALL-E 3 Latest Release</h3>

      <BlueButton text="Get Started" onClick={() => router.push("/genImage")} />
    </div>
  );
};

export default GenImages;
