import React from "react";
import styles from "./AiChatService.module.scss";
import TypingText from "../../../../Reusable/TypingText/TypingText";
import Image from "next/image";
import aiChatImg from "../../../../../assets/icons/aiChat.png";
import BlueButton from "../../../../Reusable/BlueButton/BlueButton";
import { chatAiTypewriterText } from "../../../../../customData/data";

const AiChatService = ({ setGetStarted }) => {
  return (
    <div className={styles.AiChatService}>
      <Image src={aiChatImg} alt="aiChatImg" width={150}></Image>
      <h2>
        <TypingText typingData={chatAiTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <BlueButton text="Get Started" onClick={() => setGetStarted(true)} />
    </div>
  );
};

export default AiChatService;
