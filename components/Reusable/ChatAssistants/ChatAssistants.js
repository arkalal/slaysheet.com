"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatAssistants.module.scss";
import axios from "../../../axios/getApi";

const ChatAssistants = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [OpenChatBot, setOpenChatBot] = useState(false);
  const messagesEndRef = useRef(null);
  // const [File, setFile] = useState(null)

  const scrollToBottom = () => {
    if (OpenChatBot) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isAITyping]);

  useEffect(() => {
    // Simulate the initial message from the assistant when the component mounts
    const initialMessage = {
      role: "assistant",
      content: "Hey, welcome to slaysheet.com. Need help? 🙋‍♂️",
    };
    setChatHistory([initialMessage]);

    setTimeout(() => {
      setOpenChatBot(true);
    }, 4000);
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAITyping(true);
    setPrompt(""); // Clear the input field

    if (prompt) {
      // Add user message to chat history
      const newUserMessage = { role: "user", content: prompt };
      setChatHistory((chatHistory) => [...chatHistory, newUserMessage]);

      // const data = new FormData()
      // data.set('prompt', prompt)
      // data.set('file', File)

      try {
        const res = await axios.post("assistant", { prompt });

        // Extract only the assistant's response messages
        const assistantMessages = res.data.data
          .filter((msg) => msg.role === "assistant")
          .map((msg) => ({
            role: "assistant",
            content: msg.content[0].text.value,
          }));

        // Update chat history with the new messages, keeping the old ones
        setChatHistory((currentChatHistory) => [
          ...currentChatHistory,
          ...assistantMessages,
        ]);
      } catch (error) {
        console.error(error);
      }

      setIsAITyping(false); // Stop showing 'typing...' once the response is received
    }
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
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }
            >
              <p>{msg.content}</p>
            </div>
          ))}
          {isAITyping && <p className={styles.typing}>typing...</p>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.chatForm}>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Ask something..."
          />
          {/* <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />  */}
          <button type="submit">Send</button>
        </form>
      </div>

      <div
        onClick={() => setOpenChatBot(!OpenChatBot)}
        className={styles.chatBubble}
      ></div>
    </div>
  );
};

export default ChatAssistants;
