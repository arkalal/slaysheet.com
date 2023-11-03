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
              "Speed of Work with Generative AI",
              "Creative Images with AI",
              "Auto Generated Emails",
              "Emails Sending Automation",
              "AI Note Creations",
              "PDF Summarization",
              "Seamless PDF Communication",
              "Multi Language AI Communication",
              "Productivity through AI",
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
