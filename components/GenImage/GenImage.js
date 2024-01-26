"use client";

import React, { useState } from "react";
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

const GenImage = ({ dispatchTokenValue }) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [Loading, setLoading] = useState(false);
  const [SignInPop, setSignInPop] = useState(false);
  const [IsTokenPopup, setIsTokenPopup] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setPrompt("");

      const postPrompt = {
        prompt,
      };
      const response = await axios.post("imageGen", postPrompt);

      const data = await response.data;
      setImageUrl(data.imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
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

      <div className={styles.AiImage}>
        {imageUrl && !Loading ? (
          <img height={500} width={500} src={imageUrl} alt="" />
        ) : !imageUrl && !Loading ? (
          <>
            <h2>No Images rendered</h2>
          </>
        ) : (
          Loading && (
            <>
              <h1>Loading...</h1>
            </>
          )
        )}
      </div>

      <form onSubmit={handleGenImage}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter an image description"
        />
        <button type="submit">Generate Image</button>
      </form>
    </div>
  );
};

export default connect(null, dispatcher)(GenImage);
