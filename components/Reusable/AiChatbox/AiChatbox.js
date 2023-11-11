"use client";

import React, { useState } from "react";
import styles from "./AiChatbox.module.scss";
import BlueButton from "../BlueButton/BlueButton";
import Lottie from "lottie-react";
import chatBoxAnime from "../../../LottieAnimation/animation_lnq7m5rs.json";
import { Typewriter } from "react-simple-typewriter";
import { useSession } from "next-auth/react";

const AiChatbox = ({
  input,
  handleSubmit,
  handleInputChange,
  setIsSigninPopup,
}) => {
  const [IsTypeWriter, setIsTypeWriter] = useState(true);

  const { data: session } = useSession();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!session) {
        setIsSigninPopup(true);
      } else {
        setIsSigninPopup(false);
        handleSubmit(event);
      }
    }
  };

  const handleClick = (event) => {
    if (!session) {
      setIsSigninPopup(true);
    } else {
      setIsSigninPopup(false);
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
          {IsTypeWriter ? (
            <div
              onClick={() => setIsTypeWriter(false)}
              className={styles.typewritePlaceHolder}
            >
              <Typewriter
                words={[
                  "How Can I help you Today?",
                  "Ask Me Anything..",
                  "Chat with your AI",
                  "Do Productive Research",
                  "Share your Thoughts...",
                ]}
                loop={10}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </div>
          ) : (
            <>
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Start Chatting..."
                autoFocus={!IsTypeWriter}
                value={input}
                onKeyPress={handleKeyPress}
              />
            </>
          )}
        </div>

        <div className={styles.chatboxButton}>
          <BlueButton
            onClick={handleClick}
            color={"white"}
            text={"Chat With AI"}
          />
        </div>
      </div>
    </div>
  );
};

export default AiChatbox;
