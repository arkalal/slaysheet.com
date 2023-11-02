"use client";

import Link from "next/link";
import React from "react";
import styles from "./BlueButton.module.scss";
import Lottie from "lottie-react";
import googleIconAnime from "../../../LottieAnimation/googleIconAnime.json";
import { useClerk } from "@clerk/nextjs";

const BlueButton = ({ signInLink, text, color, onClick }) => {
  const { user } = useClerk();

  return (
    <div
      className={
        color === "white"
          ? `${styles.blueButton} ${styles.blueButtonWhite}`
          : `${styles.blueButton}`
      }
    >
      <button onClick={onClick}>
        {signInLink && (
          <div className={styles.navSignInButtonText}>
            {!user && (
              <>
                <div className={styles.googleIconAnime}>
                  <Lottie animationData={googleIconAnime} />
                </div>
              </>
            )}

            <Link
              className={styles.signInLink}
              href={user ? "/studio" : "/signIn"}
            >
              {user ? "Go Studio" : "Sign In with Google"}
            </Link>
          </div>
        )}
        {text && text}
      </button>
    </div>
  );
};

export default BlueButton;
