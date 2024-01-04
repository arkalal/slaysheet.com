import React from "react";
import styles from "./PdfChat.module.scss";
import Image from "next/image";
import PDFChatImage from "../../../../assets/icons/chatPDF.png";
import comingSoonImage from "../../../../assets/images/comingSoon.jpg";
import TypingText from "../../../Reusable/TypingText/TypingText";
import { pdfChatTypewriterText } from "../../../../customData/data";

const PDFChat = () => {
  return (
    <div className={styles.PDFChat}>
      <Image
        className={styles.pdfChatImg}
        src={PDFChatImage}
        alt="PDFChatImage"
      ></Image>

      <h2>
        <TypingText typingData={pdfChatTypewriterText} />
      </h2>

      <h3>Powered By GPT-4 Turbo Latest Release</h3>

      <Image
        className={styles.pdfChatImg}
        src={comingSoonImage}
        alt="comingSoonImage"
      ></Image>
    </div>
  );
};

export default PDFChat;
