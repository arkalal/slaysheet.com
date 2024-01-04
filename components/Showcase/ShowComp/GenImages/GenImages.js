import React from "react";
import styles from "./GenImages.module.scss";
import Image from "next/image";
import TypingText from "../../../Reusable/TypingText/TypingText";
import { genImagesTypewriterText } from "../../../../customData/data";
import genImages from "../../../../assets/icons/genImages.png";
import comingSoon from "../../../../assets/images/comingSoon.jpg";

const GenImages = () => {
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
      <Image
        className={styles.genImg}
        src={comingSoon}
        alt="comingSoon"
        width={280}
      ></Image>
    </div>
  );
};

export default GenImages;
