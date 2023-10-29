"use client";

import React from "react";
import styles from "./AiChatbox.module.scss";
import BlueButton from "../BlueButton/BlueButton";
import axios from "../../../axios/openAiApi";
import Lottie from "lottie-react";
import chatBoxAnime from "../../../LottieAnimation/chatboxAnime.json";

const AiChatbox = ({
  setMessages,
  Content,
  setContent,
  messages,
  setLoading,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userMessage = {
        role: "user",
        content: Content,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("conversation", {
        messages: newMessages,
      });
      setMessages((prev) => [userMessage, response.data, ...prev]);
      setContent("");

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className={styles.aiChatbox}>
      <div className={styles.aiChatboxInterior}>
        <div className={styles.chatBoxIcon}>
          <Lottie animationData={chatBoxAnime} />
        </div>

        <div className={styles.chatboxInput}>
          <input
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ask Me Anything..."
            type="text"
            value={Content}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className={styles.chatboxButton}>
          <BlueButton
            onClick={handleSubmit}
            color={"white"}
            text={"Chat With AI"}
          />
        </div>
      </div>
    </div>
  );
};

export default AiChatbox;
