"use client";

import React, { useState } from "react";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";
import styles from "./AIChat.module.scss";
import Lottie from "lottie-react";
import AILoadAnime from "../../../../LottieAnimation/AIAskAnime.json";
import chattingAnime from "../../../../LottieAnimation/chatting.json";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [Content, setContent] = useState("");
  const [Loading, setLoading] = useState(false);

  console.log("Loading", Loading);

  return (
    <div className={styles.AIChat}>
      <div className={styles.chatBox}>
        <AiChatbox
          Content={Content}
          setContent={setContent}
          setMessages={setMessages}
          messages={messages}
          setLoading={setLoading}
        />
      </div>

      <div className={styles.AiChats}>
        {!Loading && messages.length === 0 && (
          <div className={styles.chatConverseAnime}>
            <Lottie animationData={chattingAnime} />
            <p>No Conversation Found</p>
          </div>
        )}
        {Loading && (
          <div className={styles.loaderAI}>
            <Lottie animationData={AILoadAnime} />
          </div>
        )}{" "}
        {messages &&
          messages.map((item, index) => {
            return (
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
            );
          })}
      </div>
    </div>
  );
};

export default AIChat;
