import React from "react";
import ShowScreens from "./ShowScreens/ShowScreens";
import styles from "./ShowBox.module.scss";
import dynamic from "next/dynamic";

const PDFChat = dynamic(() => import("../ShowComp/PDFChat/PDFChat"), {
  ssr: true,
});

const AutoEmail = dynamic(() => import("../ShowComp/AutoEmail/AutoEmail"), {
  ssr: true,
});

const AiChatService = dynamic(
  () => import("../ShowComp/AIChat/AiChatService/AiChatService.js"),
  {
    ssr: true,
  }
);

const GenImages = dynamic(() => import("../ShowComp/GenImages/GenImages"), {
  ssr: true,
});

const GenMusic = dynamic(() => import("../ShowComp/GenMusic/GenMusic"), {
  ssr: true,
});

const MyNotes = dynamic(() => import("../ShowComp/MyNotes/MyNotes"), {
  ssr: true,
});

const ShowBox = () => {
  const showScreenComp = {
    1: <PDFChat />,
    2: <AutoEmail />,
    3: <AiChatService />,
    4: <GenImages />,
    5: <GenMusic />,
    6: <MyNotes />,
  };

  return (
    <div className={styles.ShowBox}>
      <ShowScreens showScreenComp={showScreenComp} />
    </div>
  );
};

export default ShowBox;
