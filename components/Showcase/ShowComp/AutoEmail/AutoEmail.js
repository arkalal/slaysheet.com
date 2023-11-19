import React from "react";
import styles from "./AutoEmail.module.scss";
import Image from "next/image";
import TypingText from "../../../Reusable/TypingText/TypingText";
import emailsAuto from "../../../../assets/icons/emailsAutomate.png";
import comingSoonImage from "../../../../assets/images/comingSoon.jpg";
import { autoEmailTypewriterText } from "../../../../customData/data";

const AutoEmail = () => {
  return (
    <div className={styles.AutoEmail}>
      <Image src={emailsAuto} alt="emailsAuto" width={150}></Image>
      <h2>
        <TypingText typingData={autoEmailTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <Image src={comingSoonImage} alt="comingSoonImage" width={280}></Image>
    </div>
  );
};

export default AutoEmail;
