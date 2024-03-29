"use client";

import React, { useState } from "react";
import styles from "./AiChatbox.module.scss";
import chatBoxAnime from "../../../assets/icons/chatboxIco.png";
import { Typewriter } from "react-simple-typewriter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "../../../axios/getApi";
import * as dispatcher from "../../../redux/store/dispatchers";
import { connect } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";

const AiChatbox = ({
  setIsSigninPopup,
  setIsTokenPopup,
  dispatchTokenValue,
  setConversationHistory,
  setChatHistory,
  setIsAITyping,
  IsVision,
  setImages,
  setIsVision,
  setPrompt,
  Prompt,
  images,
  conversationHistory,
  chatHistory,
}) => {
  const [IsTypeWriter, setIsTypeWriter] = useState(true);

  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const systemMessage = {
      role: "system",
      content:
        "If any user asks about you or what you can do or may be what type of services you can provide. If they asks anything like that about you then tell them that You are a very advanced bot highly and custom trained to help your user as a real human being and you have the potential to generate, and understand any images or document if the user uploads and also perform real time analysis that may involve mathametical logics. You can do all of this. Your tone of speaking must be very casual and informal like a friend. Also say that You can also solve any question papers if they upload in a form of image or document. And never repeat the  same chat that you have said them before. You should act like a real human being. Even if they ask the same thing answer them in a different way just like how a real person talks. Also say them that you are not chatGPT you are much more advanced than that. If they ask you are you gpt or something like that you will say no and will say you are a very highly advanced trained model and much more advanced than chatGPT. And if they ask about you then give your instruction in a small and precise manner so that it doesn't look too much talking. And speak in a very simple english language. Do not use complex words. Try to answer them maximum in 2 to three sentences unless they tell you something that needs long content. Tell them you are not build by openAI or chatGPT or been GPT/ You are build and trained by Arka Lal Chakravarty who is a AI Developer only tell them if they asks you about how you are built.",
    };

    if (Prompt) {
      const userMessage = { role: "user", content: Prompt };

      const updatedHistory = [
        ...conversationHistory,
        systemMessage,
        userMessage,
      ];
      setConversationHistory(updatedHistory);

      // Update chat history with user prompt immediately
      const newChatHistory = [
        ...chatHistory,
        { prompt: Prompt, images: images, response: "" },
      ];
      setChatHistory(newChatHistory);
      setIsAITyping(true);
      setPrompt(""); // Clear the input after submitting
      setImages("");

      try {
        if (IsVision) {
          const chatsData = {
            prompt: Prompt,
            images: images,
          };

          const res = await axios.post("vision", chatsData);
          setImages([]);
          setIsVision(false);

          // Update chat history with AI response
          newChatHistory[newChatHistory.length - 1].response = res.data;
          setChatHistory(newChatHistory);
          setIsAITyping(false); // AI stops 'typing'
        } else {
          const chatsData = {
            prompt: Prompt,
            conversationHistory: conversationHistory,
          };

          const res = await axios.post("chats", chatsData);

          // Update chat history with AI response
          newChatHistory[newChatHistory.length - 1].response = res.data;
          setChatHistory(newChatHistory);
          setIsAITyping(false); // AI stops 'typing'
        }
      } catch (error) {
        console.log(error);
        setIsAITyping(false); // In case of an error, AI stops 'typing'
      }
    }
  };

  const handleAiChat = async (event) => {
    if (Prompt) {
      try {
        if (!session) {
          setIsSigninPopup(true);
          return;
        } else {
          setIsSigninPopup(false);

          const getUserToken = await axios.get("aiToken");
          const userToken = getUserToken.data.find(
            (item) => item.user === session.user.email
          );
          const isLocked = userToken.lock;
          const count = userToken.count;
          const userId = userToken._id;

          const data = {
            user: session.user.email,
            count: Math.max(count - 1, 0), // Prevent negative count
            lock: count <= 1, // Automatically lock if count goes to 0
          };

          await axios.put(`aiToken/${userId}`, data);

          if (userToken && count && !isLocked) {
            localStorage.setItem("AITokens", count - 1);
            dispatchTokenValue(count - 1);
          }

          if (!userToken || !isLocked) {
            handleSubmit(event);
          } else {
            setIsTokenPopup(true);
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
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

  const handleFilesChange = (e) => {
    const files = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImages(reader.result);
        setIsVision(true);
      }
    };

    reader.onerror = (error) => {
      console.log("error: " + error);
    };
  };

  return (
    <div className={styles.aiChatbox}>
      <div className={styles.imageUpload}>
        <label htmlFor="file-upload" className={styles.customFileUpload}>
          <MdOutlineFileUpload /> Upload Image
          <div className={styles.imagePreviews}>
            <img src={images} alt="" />
          </div>
        </label>

        <input
          id="file-upload"
          type="file"
          multiple={false}
          onChange={handleFilesChange}
          className={styles.hiddenFileInput}
        />
      </div>

      <div className={styles.chatFeatures}>
        <div className={styles.aiChatboxInterior}>
          <div className={styles.chatBoxIcon}>
            <Image
              className={styles.chatBoxIconImg}
              src={chatBoxAnime}
              alt="chatBoxAnime"
            ></Image>
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
                  onChange={(e) => setPrompt(e.target.value)}
                  type="text"
                  placeholder="Start Chatting..."
                  autoFocus={!IsTypeWriter}
                  value={Prompt}
                  onKeyPress={handleKeyPress}
                />
              </>
            )}
          </div>

          <div className={styles.chatboxButton}>
            <button onClick={handleClick}>Chat With AI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, dispatcher)(AiChatbox);
