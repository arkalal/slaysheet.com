"use client";

import Link from "next/link";
import React from "react";
import styles from "./BlueButton.module.scss";

const BlueButton = ({ signInLink, text, color, onClick }) => {
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
          <>
            <Link className={styles.signInLink} href="/signIn">
              Sign In
            </Link>
          </>
        )}
        {text && text}
      </button>
    </div>
  );
};

export default BlueButton;
