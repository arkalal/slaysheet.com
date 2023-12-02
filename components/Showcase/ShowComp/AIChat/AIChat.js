"use client";

import React, { useEffect, useRef, useState } from "react";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";
import styles from "./AIChat.module.scss";
import chattingAnime from "../../../../assets/icons/converseAI.png";
import aiAvatar from "../../../../assets/icons/chatboxIco.png";
import { useChat } from "ai/react";
import dynamic from "next/dynamic";
import userAnime from "../../../../assets/icons/userAvatar.png";
import Image from "next/image";
import AiChatService from "./AiChatService/AiChatService";
import BuyTokenPopup from "../../../Reusable/popups/BuyTokenPopup/BuyTokenPopup";

const SigninPopup = dynamic(
  () => import("../../../Reusable/popups/SigninPopup/SigninPopup"),
  {
    ssr: false,
  }
);

const AIChat = () => {
  const [IsSigninPopup, setIsSigninPopup] = useState(false);
  const [GetStarted, setGetStarted] = useState(false);
  const [AiToken, setAiToken] = useState(null);
  const [IsTokenPopup, setIsTokenPopup] = useState(false);

  const { input, handleSubmit, isLoading, handleInputChange, messages } =
    useChat();

  const chatContainerRef = useRef("");

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (GetStarted) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [GetStarted, messages]);

  return (
    <>
      {" "}
      {!GetStarted ? (
        <>
          <AiChatService setGetStarted={setGetStarted} />
        </>
      ) : (
        <>
          <div className={styles.AIChat}>
            {IsSigninPopup && (
              <>
                {" "}
                <SigninPopup setIsSigninPopup={setIsSigninPopup} />{" "}
              </>
            )}

            {IsTokenPopup && (
              <>
                <BuyTokenPopup />
              </>
            )}

            {AiToken ? (
              <>
                <div className={styles.AiTokenCounter}>
                  {AiToken} Tokens Left
                </div>
              </>
            ) : (
              AiToken === 0 && (
                <>
                  <div className={styles.AiTokenCounter}>0 Tokens Left</div>
                </>
              )
            )}

            <div ref={chatContainerRef} className={styles.AiChats}>
              {!isLoading && messages.length === 0 && (
                <div className={styles.chatConverseAnime}>
                  <Image
                    src={chattingAnime}
                    alt="chattingAnime"
                    width={180}
                  ></Image>
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
                            <div className={styles.aiAv}>
                              <Image
                                src={userAnime}
                                alt="userAnime"
                                width={40}
                              ></Image>
                            </div>
                          </>
                        ) : (
                          <div className={styles.aiAv}>
                            <Image
                              src={aiAvatar}
                              alt="aiAvatar"
                              width={40}
                            ></Image>
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
                setAiToken={setAiToken}
                setIsTokenPopup={setIsTokenPopup}
              />
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
};

export default AIChat;
