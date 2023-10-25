import React from "react";
import ShowScreens from "./ShowScreens/ShowScreens";
import styles from "./ShowBox.module.scss";
import AIChat from "../ShowComp/AIChat/AIChat";
import AutoEmail from "../ShowComp/AutoEmail/AutoEmail";
import CreateNote from "../ShowComp/CreateNote/CreateNote";
import GenImages from "../ShowComp/GenImages/GenImages";
import GenMusic from "../ShowComp/GenMusic/GenMusic";
import PDFChat from "../ShowComp/PDFChat/PDFChat";
import MyNotes from "../ShowComp/MyNotes/MyNotes";

const ShowBox = () => {
  const showScreenComp = {
    1: <PDFChat />,
    2: <AutoEmail />,
    3: <AIChat />,
    4: <GenImages />,
    5: <CreateNote />,
    6: <GenMusic />,
    7: <MyNotes />,
  };

  return (
    <div className={styles.ShowBox}>
      <ShowScreens showScreenComp={showScreenComp} />
    </div>
  );
};

export default ShowBox;
