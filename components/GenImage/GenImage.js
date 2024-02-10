"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "../../axios/openAiApi";
import styles from "./GenImage.module.scss";
import { useSession } from "next-auth/react";
import SigninPopup from "../Reusable/popups/SigninPopup/SigninPopup";
import { chatLogic } from "../../utils/serverApiLogics";
import BuyTokenPopup from "../Reusable/popups/BuyTokenPopup/BuyTokenPopup";
import ReduxProvider from "../../redux/ReduxProvider";
import AITokenWallet from "../Reusable/AITokenWallet/AITokenWallet";
import { connect } from "react-redux";
import * as dispatcher from "../../redux/store/dispatchers";
import BlueButton from "../Reusable/BlueButton/BlueButton";
import Image from "next/image";
import genImgIcon from "../../assets/images/genImg.jpg";
import { Typewriter } from "react-simple-typewriter";

const GenImage = ({ dispatchTokenValue }) => {
  const [prompt, setPrompt] = useState("");
  const [SignInPop, setSignInPop] = useState(false);
  const [IsTokenPopup, setIsTokenPopup] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);

  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setMessageHistory((messageHistory) => [
        ...messageHistory,
        { text: prompt, imageUrl: "", loading: true },
      ]);

      setPrompt("");

      const postPrompt = {
        prompt,
      };
      const response = await axios.post("imageGen", postPrompt);

      const data = await response.data;
      console.log("data", data);

      // Update the last entry of messageHistory with the new image URL
      setMessageHistory((currentHistory) =>
        currentHistory.map((message, index) =>
          index === currentHistory.length - 1 // Correct the index check here
            ? { ...message, imageUrl: data.imageUrl, loading: false }
            : message
        )
      );
    } catch (error) {
      console.error("Error generating image:", error);

      // If there's an error, update the loading state to false
      setMessageHistory((currentHistory) =>
        currentHistory.map((message, index) =>
          index === currentHistory.length - 1
            ? { ...message, loading: false }
            : message
        )
      );
    }
  };

  const handleGenImage = async (event) => {
    event.preventDefault();

    if (prompt) {
      try {
        if (!session) {
          setSignInPop(true);
          return;
        } else {
          setSignInPop(false);

          const chatLog = await chatLogic();

          if (
            chatLog.isUserToken &&
            chatLog.isUserToken.count &&
            !chatLog.isUserToken.lock
          ) {
            localStorage.setItem("AITokens", chatLog.isUserToken.count - 1);
            dispatchTokenValue(chatLog.isUserToken.count - 1);
          }

          if (!chatLog.isUserToken || !chatLog.isUserToken.lock) {
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

  const chatContainerRef = useRef("");

  useEffect(() => {
    const chatBox = chatContainerRef.current;

    // Function to smoothly scroll to the bottom
    const scrollToBottom = () => {
      chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth",
      });
    };

    // Call scrollToBottom whenever the chatHistory updates
    scrollToBottom();
  }, [messageHistory]);

  return (
    <div className={styles.GenImage}>
      {SignInPop && (
        <>
          <SigninPopup setIsSigninPopup={setSignInPop} />
        </>
      )}

      {IsTokenPopup && (
        <>
          <BuyTokenPopup />
        </>
      )}

      {session && (
        <>
          <div className={styles.tokenWallet}>
            <ReduxProvider>
              <AITokenWallet />
            </ReduxProvider>
          </div>
        </>
      )}

      <div ref={chatContainerRef} className={styles.chatContainer}>
        {messageHistory.map((message, index) => (
          <div key={index} className={styles.messagePair}>
            <div className={styles.imageContainer}>
              {message.loading ? (
                <div className={styles.generatingImg}>
                  <Image
                    src={genImgIcon}
                    alt="genImgIcon"
                    className={styles.generatingImgIcon}
                  ></Image>

                  <p>
                    <Typewriter
                      words={[
                        "Generating Image...",
                        "Creating the Magic for You!",
                      ]}
                      loop={10}
                      cursor
                      cursorStyle="|"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </p>
                </div>
              ) : (
                <img
                  src={message.imageUrl}
                  alt="Error Generating Image. Please try again.."
                />
              )}
            </div>

            <p className={styles.userPrompt}>{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleGenImage}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type and Generate your image..."
        />
        <BlueButton type="submit" text="Generate Image" />
      </form>
    </div>
  );
};

export default connect(null, dispatcher)(GenImage);