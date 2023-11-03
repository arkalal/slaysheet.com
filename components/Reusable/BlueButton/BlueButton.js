"use client";

import React from "react";
import styles from "./BlueButton.module.scss";
import Lottie from "lottie-react";
import googleIconAnime from "../../../LottieAnimation/googleIconAnime.json";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const BlueButton = ({ signInLink, text, color, onClick }) => {
  const { userId } = useAuth();
  const router = useRouter();

  const signInPush = () => {
    if (userId) {
      router.push("/studio");
    } else {
      router.push("/signIn");
    }
  };

  return (
    <div
      className={
        color === "white"
          ? `${styles.blueButton} ${styles.blueButtonWhite}`
          : `${styles.blueButton}`
      }
    >
      <button onClick={signInLink ? signInPush : onClick}>
        {signInLink && (
          <div className={styles.navSignInButtonText}>
            {!userId && (
              <>
                <div className={styles.googleIconAnime}>
                  <Lottie animationData={googleIconAnime} />
                </div>
              </>
            )}

            {userId ? "Go Studio" : "Sign In with Google"}
          </div>
        )}
        {text && text}
      </button>
    </div>
  );
};

export default BlueButton;
