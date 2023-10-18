import React from "react";
import styles from "./Showcase.module.scss";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";

const Showcase = () => {
  return (
    <div className={styles.Showcase}>
      <h1>
        Build for the Future Generation, <br />{" "}
        <span>Explore our Services.</span>{" "}
      </h1>

      <ButtonSwitch />
    </div>
  );
};

export default Showcase;
