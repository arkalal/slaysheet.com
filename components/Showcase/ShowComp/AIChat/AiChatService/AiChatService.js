import React from "react";
import styles from "./AiChatService.module.scss";
import TypingText from "../../../../Reusable/TypingText/TypingText";
import Image from "next/image";
import aiChatImg from "../../../../../assets/icons/aiChat.png";
import BlueButton from "../../../../Reusable/BlueButton/BlueButton";
import { chatAiTypewriterText } from "../../../../../customData/data";
import axios from "../../../../../axios/getApi";
import { useSession } from "next-auth/react";

const AiChatService = ({ setGetStarted }) => {
  const { data: session } = useSession();

  const aiChatStarted = async () => {
    try {
      const res = await axios.get("aiToken");
      const aiCountData = res.data;

      const isUserToken = aiCountData.some(
        (ai) => ai.user === session.user.email
      );

      if (!isUserToken) {
        const aiTokenData = {
          user: session.user.email,
          count: 5,
          lock: false,
        };
        await axios.post("aiToken", aiTokenData);
      }

      setGetStarted(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.AiChatService}>
      <Image src={aiChatImg} alt="aiChatImg" width={150}></Image>
      <h2>
        <TypingText typingData={chatAiTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <BlueButton text="Get Started" onClick={aiChatStarted} />
    </div>
  );
};

export default AiChatService;
