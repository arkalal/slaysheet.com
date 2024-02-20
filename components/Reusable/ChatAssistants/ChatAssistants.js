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
    content: `You are a customer support bot for slaysheet.com which is a generative AI based web app that helps users to increase their productivity with the power of generative ai. You are responsible to talk with our users and solve their issues with whatever they say but that should be related to our app. If they ask anything else about some outside topics which is not related to out slaysheet.com AI web app then you will say, I am here only to support you about slaysheet.com and nothing else. Please talk about that. This is what you will say if the users talk about something which is not regarding to our web app. You will talk just like a real human customer support assistant. 
    Let me say what is our web app is about. There are many generative ai based AI tools in our web app like chat with pdf, image generation, emails automation, ai note creations, chat with ai. Users can use this platform to increase their day to day productivity whether they are individuals or business persons. This platform can be used for both individual and business purposes.
    If they ask anything which is not related to slaysheet.com and its use cases, Dont respond and tell them - 'I am here only to support you about slaysheet.com and nothing else. Please talk about that'`,
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
    // Simulate the initial message from the assistant when the component mounts
    const initialMessage = {
      response: "Hey, welcome to slaysheet.com. Need help? 🙋‍♂️",
    };
    setChatHistory([initialMessage]);

    setTimeout(() => {
      setOpenChatBot(true);
    }, 4000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Prompt) {
      const userMessage = { role: "user", content: Prompt };

      const updatedHistory = [
        ...conversationHistory,
        systemMessage,
        userMessage,
      ];
      setConversationHistory(updatedHistory);

      // Update chat history with user prompt immediately
      const newChatHistory = [...chatHistory, { prompt: Prompt, response: "" }];
      setChatHistory(newChatHistory);
      setIsAITyping(true);
      setPrompt("");

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
          {chatHistory.map((chat, index) => (
            <div className={styles.chatQuery} key={index}>
              {chat.prompt ? (
                <div className={styles.userText}>
                  <p>{chat.prompt}</p>
                </div>
              ) : null}

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
