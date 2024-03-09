import React from "react";
import styles from "./Showcase.module.scss";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";
import ReduxProvider from "../../redux/ReduxProvider";
import ShowcaseDesc from "./ShowcaseDesc/ShowcaseDesc";

const Showcase = () => {
  const buttons = [
    { id: 1, label: "Chat with PDF" },
    { id: 2, label: "Emails Automation" },
    { id: 3, label: "Chat with AI" },
    { id: 4, label: "Generate Images" },
    { id: 5, label: "Generate Music" },
    { id: 6, label: "My Notes" },
  ];

  return (
    <div className={styles.Showcase}>
      <h1>
        Build for the Future Generation, <br />{" "}
        <span>Explore our Services.</span>{" "}
      </h1>

      <ReduxProvider>
        <ButtonSwitch buttons={buttons} />
      </ReduxProvider>

      <ReduxProvider>
        <ShowcaseDesc />
      </ReduxProvider>
    </div>
  );
};

export default Showcase;
