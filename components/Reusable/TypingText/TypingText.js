"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./TypingText.module.scss";

const TypingText = ({ typingData, isBannerTitle }) => {
  return (
    <div className={styles.TypingText}>
      {isBannerTitle ? (
        <>
          <h1>
            Discover Your{" "}
            <span>
              <Typewriter
                words={typingData}
                loop={10}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
        </>
      ) : (
        <>
          <Typewriter
            words={typingData}
            loop={10}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </>
      )}
    </div>
  );
};

export default TypingText;
