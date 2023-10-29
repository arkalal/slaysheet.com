"use client";

import React, { useState } from "react";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";
import styles from "./AIChat.module.scss";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [Content, setContent] = useState("");

  return (
    <div className={styles.AIChat}>
      <div className={styles.chatBox}>
        <AiChatbox
          Content={Content}
          setContent={setContent}
          setMessages={setMessages}
          messages={messages}
        />
      </div>

      <div className={styles.AiChats}>
        {messages.map((item, index) => {
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
