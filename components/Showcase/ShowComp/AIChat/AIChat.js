"use client";

import React, { useEffect, useRef, useState } from "react";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";
import styles from "./AIChat.module.scss";
import chattingAnime from "../../../../assets/icons/converseAI.png";
import aiAvatar from "../../../../assets/icons/chatboxIco.png";
import dynamic from "next/dynamic";
import userAnime from "../../../../assets/icons/userAvatar.png";
import Image from "next/image";
import AiChatService from "./AiChatService/AiChatService";
import BuyTokenPopup from "../../../Reusable/popups/BuyTokenPopup/BuyTokenPopup";
import ReduxProvider from "../../../../redux/ReduxProvider";

const SigninPopup = dynamic(
  () => import("../../../Reusable/popups/SigninPopup/SigninPopup"),
  {
    ssr: false,
  }
);

const AIChat = () => {
  const [IsSigninPopup, setIsSigninPopup] = useState(false);
  const [GetStarted, setGetStarted] = useState(false);
  const [IsTokenPopup, setIsTokenPopup] = useState(false);

  const [conversationHistory, setConversationHistory] = useState([]);
  const [Prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [images, setImages] = useState([]);
  const [IsVision, setIsVision] = useState(false);

  console.log("conversationHistory", conversationHistory);

  const chatContainerRef = useRef("");

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (GetStarted) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [GetStarted, chatHistory]);

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

            <div className={styles.AiChats}>
              <div ref={chatContainerRef} className={styles.chatBox}>
                {conversationHistory && conversationHistory.length === 0 && (
                  <div className={styles.chatConverseAnime}>
                    <Image
                      src={chattingAnime}
                      alt="chattingAnime"
                      className={styles.chatConverseImg}
                    ></Image>
                    <p>No Conversation Found</p>
                  </div>
                )}

                {chatHistory.map((chat, index) => (
                  <div className={styles.chatQuery} key={index}>
                    <img src={chat.images} alt="" />
                    <div className={styles.userText}>
                      <p>{chat.prompt}</p>
                    </div>

                    <div className={styles.aiText}>
                      <p>{chat.response || (isAITyping && "typing...")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.inputBox}>
              <ReduxProvider>
                <AiChatbox
                  setIsSigninPopup={setIsSigninPopup}
                  setIsTokenPopup={setIsTokenPopup}
                  setConversationHistory={setConversationHistory}
                  setChatHistory={setChatHistory}
                  setIsAITyping={setIsAITyping}
                  IsVision={IsVision}
                  setImages={setImages}
                  setIsVision={setIsVision}
                  setPrompt={setPrompt}
                  Prompt={Prompt}
                  images={images}
                  conversationHistory={conversationHistory}
                  chatHistory={chatHistory}
                />
              </ReduxProvider>
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
};

export default AIChat;
