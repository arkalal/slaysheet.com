import React from "react";
import styles from "./AiChatbox.module.scss";
import BlueButton from "../BlueButton/BlueButton";

const AiChatbox = () => {
  return (
    <div className={styles.aiChatbox}>
      <div className={styles.aiChatboxInterior}>
        <div className={styles.chatBoxIcon}>Icon</div>

        <div className={styles.chatboxInput}>
          <input placeholder="Ask Me Anything..." type="text" />
        </div>

        <div className={styles.chatboxButton}>
          <BlueButton color={"white"} text={"Chat With AI"} />
        </div>
      </div>
    </div>
  );
};

export default AiChatbox;
