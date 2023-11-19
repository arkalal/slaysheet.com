import Image from "next/image";
import React from "react";
import TypingText from "../../../Reusable/TypingText/TypingText";
import styles from "./GenMusic.module.scss";
import genMusicImg from "../../../../assets/icons/GenMusic.png";
import comingSoon from "../../../../assets/images/comingSoon.jpg";
import { genMusicTypewriterText } from "../../../../customData/data";

const GenMusic = () => {
  return (
    <div className={styles.GenMusic}>
      <Image src={genMusicImg} alt="genMusicImg" width={150}></Image>
      <h2>
        <TypingText typingData={genMusicTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <Image src={comingSoon} alt="comingSoon" width={280}></Image>
    </div>
  );
};

export default GenMusic;
