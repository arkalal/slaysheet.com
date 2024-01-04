import React from "react";
import styles from "./AiChatService.module.scss";
import TypingText from "../../../../Reusable/TypingText/TypingText";
import Image from "next/image";
import aiChatImg from "../../../../../assets/icons/aiChat.png";
import BlueButton from "../../../../Reusable/BlueButton/BlueButton";
import { chatAiTypewriterText } from "../../../../../customData/data";

const AiChatService = ({ setGetStarted }) => {
  const aiChatStarted = () => {
    setGetStarted(true);
  };

  return (
    <div className={styles.AiChatService}>
      <Image
        className={styles.aiChatImg}
        src={aiChatImg}
        alt="aiChatImg"
        width={150}
      ></Image>
      <h2>
        <TypingText typingData={chatAiTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <BlueButton text="Get Started" onClick={aiChatStarted} />
    </div>
  );
};

export default AiChatService;
