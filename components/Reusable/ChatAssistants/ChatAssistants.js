"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatAssistants.module.scss";
import axios from "../../../axios/getApi";
import { BsChat } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";

const ChatAssistants = () => {
  const [Prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [OpenChatBot, setOpenChatBot] = useState(false);
  const messagesEndRef = useRef(null);

  // Training the chat model with custom instructions to interact with the user in a specific way based on the use case.

  const systemMessage = {
    role: "system",
    content: `You are a customer interaction bot and your job is to talk with the customer on behalf of an AI business and ask there name and email. If they enter wrong email, tell them it is invalid and tell them to enter the email again. Once they successfully enter their email, now ask them how you can assist them. On the other side, I am the admin. Whenever I will admin you will know that I am talking to you. Now if I ask about the name and email of the users who interacted with you list all those names and emails to me.`,
  };

  const [conversationHistory, setConversationHistory] = useState([
    systemMessage,
  ]);

  // Training the chat model with custom instructions to interact with the user in a specific way based on the use case.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (OpenChatBot) {
      scrollToBottom();
    }
  }, [OpenChatBot, chatHistory, isAITyping]);

  useEffect(() => {
    setTimeout(() => {
      setOpenChatBot(true);
    }, 4000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { role: "user", content: Prompt };

    const updatedHistory = [...conversationHistory, systemMessage, userMessage];
    setConversationHistory(updatedHistory);

    // Update chat history with user prompt immediately
    const newChatHistory = [...chatHistory, { prompt: Prompt, response: "" }];
    setChatHistory(newChatHistory);
    setIsAITyping(true);

    try {
      const chatsData = {
        prompt: Prompt,
        conversationHistory: conversationHistory,
      };

      const res = await axios.post("chats", chatsData);

      // Update chat history with AI response
      newChatHistory[newChatHistory.length - 1].response = res.data;
      setChatHistory(newChatHistory);
      setIsAITyping(false); // AI stops 'typing'
    } catch (error) {
      console.log(error);
      setIsAITyping(false); // In case of an error, AI stops 'typing'
    }

    setPrompt(""); // Clear the input after submitting
  };

  return (
    <div className={styles.customerChatbot}>
      <div
        className={`${
          OpenChatBot
            ? styles.ChatAssistants
            : styles.ChatAssistants && styles.closeAssistant
        }`}
      >
        <div className={styles.chatHistory}>
          {chatHistory.map((chat, index) => (
            <div className={styles.chatQuery} key={index}>
              <div className={styles.userText}>
                <p>{chat.prompt}</p>
              </div>

              <div className={styles.aiText}>
                <p>{chat.response || (isAITyping && "typing...")}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.chatForm}>
          <input
            value={Prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Ask something..."
          />
          {/* <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />  */}
          <button disabled={isAITyping} type="submit">
            Send
          </button>
        </form>
      </div>

      <div
        onClick={() => setOpenChatBot(!OpenChatBot)}
        className={styles.chatBubble}
      >
        {OpenChatBot ? <IoIosArrowDropdown /> : <BsChat />}
      </div>
    </div>
  );
};

export default ChatAssistants;
