"use client";

import React, { useEffect, useRef, useState } from "react";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";
import styles from "./AIChat.module.scss";
import Lottie from "lottie-react";
import chattingAnime from "../../../../LottieAnimation/chatting.json";
import aiAvatar from "../../../../LottieAnimation/AiAvatar.json";
import { useChat } from "ai/react";
import SigninPopup from "../../../Reusable/popups/SigninPopup/SigninPopup";
import { UserButton } from "@clerk/nextjs";

const AIChat = () => {
  const [IsSigninPopup, setIsSigninPopup] = useState(false);

  const { input, handleSubmit, isLoading, handleInputChange, messages } =
    useChat();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.AIChat}>
      {IsSigninPopup && (
        <>
          {" "}
          <SigninPopup setIsSigninPopup={setIsSigninPopup} />{" "}
        </>
      )}
      <div ref={chatContainerRef} className={styles.AiChats}>
        {!isLoading && messages.length === 0 && (
          <div className={styles.chatConverseAnime}>
            <Lottie animationData={chattingAnime} />
            <p>No Conversation Found</p>
          </div>
        )}

        {messages &&
          messages.map((item, index) => {
            return (
              <div key={index} className={styles.AiMessage}>
                <div className={styles.AiAvatar}>
                  {item.role === "user" ? (
                    <>
                      {" "}
                      <UserButton afterSignOutUrl="/" />{" "}
                    </>
                  ) : (
                    <div className={styles.aiAv}>
                      <Lottie animationData={aiAvatar} />
                    </div>
                  )}
                </div>
                <div
                  className={
                    item.role === "user"
                      ? `${styles.AiConverseUser}`
                      : `${styles.AiConverseMachine}`
                  }
                  key={index}
                >
                  {item.content}
                </div>
              </div>
            );
          })}
      </div>

      <div className={styles.chatBox}>
        <AiChatbox
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          setIsSigninPopup={setIsSigninPopup}
        />
      </div>
    </div>
  );
};

export default AIChat;