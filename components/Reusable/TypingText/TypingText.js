"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./TypingText.module.scss";

const TypingText = () => {
  return (
    <div className={styles.TypingText}>
      <h1>
        Discover Your{" "}
        <span>
          <Typewriter
            words={[
              "Productivity through AI",
              "Creative Images with AI",
              "Auto Generated Emails",
              "Emails Sending Automation",
              "AI Note Creations",
              "PDF Summarization",
              "Multi Language AI Communication",
              "Seamless PDF Communication",
            ]}
            loop={10}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </span>
      </h1>
    </div>
  );
};

export default TypingText;
