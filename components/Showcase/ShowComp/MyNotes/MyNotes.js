import React from "react";
import styles from "./MyNotes.module.scss";
import Image from "next/image";
import TypingText from "../../../Reusable/TypingText/TypingText";
import myNoteImg from "../../../../assets/icons/MyNotes.png";
import comingSoon from "../../../../assets/images/comingSoon.jpg";
import { myNoteTypewriterText } from "../../../../customData/data";

const MyNotes = () => {
  return (
    <div className={styles.MyNotes}>
      <Image src={myNoteImg} alt="myNoteImg" width={150}></Image>
      <h2>
        <TypingText typingData={myNoteTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <Image src={comingSoon} alt="comingSoon" width={280}></Image>
    </div>
  );
};

export default MyNotes;
