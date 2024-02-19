"use client";

import React from "react";
import styles from "./BlueButton.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const BlueButton = ({ signInLink, text, color, onClick, type }) => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  const signInPush = () => {
    if (session) {
      router.push("/studio");
    } else {
      router.push("/login");
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
      <button type={type} onClick={signInLink ? signInPush : onClick}>
        {signInLink && (
          <div className={styles.navSignInButtonText}>
            {session?.user ? "Go Studio" : "Sign In"}
          </div>
        )}
        {text && text}
      </button>
    </div>
  );
};

export default BlueButton;
