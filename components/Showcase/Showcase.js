import React from "react";
import styles from "./Showcase.module.scss";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";

const Showcase = () => {
  const buttons = [
    { id: 1, label: "Chat with PDF" },
    { id: 2, label: "Emails Automation" },
    { id: 3, label: "Chat with AI" },
    { id: 4, label: "Generate Images" },
    { id: 5, label: "Create Notes" },
    { id: 6, label: "Generate Music" },
    { id: 7, label: "My Notes" },
  ];

  return (
    <div className={styles.Showcase}>
      <h1>
        Build for the Future Generation, <br />{" "}
        <span>Explore our Services.</span>{" "}
      </h1>

      <ButtonSwitch buttons={buttons} />

      <p className={styles.showcaseDesc}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, fugit
        dolorem? Recusandae ab soluta aut fugiat, labore a. In, quam. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Est, omnis nostrum?
        Excepturi rerum.
      </p>
    </div>
  );
};

export default Showcase;
