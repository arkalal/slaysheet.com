import React from "react";
import styles from "./CreateNote.module.scss";
import Image from "next/image";
import TypingText from "../../../Reusable/TypingText/TypingText";
import createNoteImg from "../../../../assets/icons/createNotes.png";
import comingSoon from "../../../../assets/images/comingSoon.jpg";
import { createNoteTypewriterText } from "../../../../customData/data";

const CreateNote = () => {
  return (
    <div className={styles.CreateNote}>
      <Image src={createNoteImg} alt="PDFChatImage" width={150}></Image>
      <h2>
        <TypingText typingData={createNoteTypewriterText} />
      </h2>
      <h3>Powered By GPT-4 Turbo Latest Release</h3>
      <Image src={comingSoon} alt="comingSoon" width={280}></Image>
    </div>
  );
};

export default CreateNote;
