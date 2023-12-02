"use client";

import React, { useState } from "react";
import styles from "./AiChatbox.module.scss";
import BlueButton from "../BlueButton/BlueButton";
import chatBoxAnime from "../../../assets/icons/chatboxIco.png";
import { Typewriter } from "react-simple-typewriter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "../../../axios/getApi";

const AiChatbox = ({
  input,
  handleSubmit,
  handleInputChange,
  setIsSigninPopup,
  setAiToken,
}) => {
  const [IsTypeWriter, setIsTypeWriter] = useState(true);

  const { data: session } = useSession();

  const handleAiChat = async (event) => {
    try {
      if (!session) {
        setIsSigninPopup(true);
      } else {
        setIsSigninPopup(false);

        const res = await axios.get("aiToken");
        const aiCountData = res.data;

        const isUserToken = aiCountData.some(
          (ai) => ai.user === session.user.email
        );
        const filteredUserToken = aiCountData.filter(
          (user) => user.user === session.user.email
        );

        if (filteredUserToken && filteredUserToken[0]?.count) {
          setAiToken(filteredUserToken[0]?.count - 1);
        }

        if (!isUserToken || !filteredUserToken[0]?.lock) {
          handleSubmit(event);
        } else {
          return;
        }

        if (isUserToken) {
          const data = {
            user: session.user.email,
            count: filteredUserToken[0]?.count - 1,
            lock: false,
          };
          await axios.put(`aiToken/${filteredUserToken[0]?._id}`, data);
        }

        if (filteredUserToken[0]?.count === 1) {
          const data = {
            user: session.user.email,
            count: filteredUserToken[0]?.count - 1,
            lock: true,
          };
          await axios.put(`aiToken/${filteredUserToken[0]?._id}`, data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAiChat(event);
    }
  };

  const handleClick = (event) => {
    handleAiChat(event);
  };

  return (
    <div className={styles.aiChatbox}>
      <div className={styles.aiChatboxInterior}>
        <div className={styles.chatBoxIcon}>
          <Image src={chatBoxAnime} alt="chatBoxAnime" width={40}></Image>
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
