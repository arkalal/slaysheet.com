"use client";

import React from "react";
import styles from "./ButtonSwitch.module.scss";

const ButtonSwitch = ({ buttons }) => {
  const handleButtonClick = (id) => {
    window.localStorage.setItem("buttonId", id);
  };

  return (
    <div className={styles.ButtonSwitch}>
      {buttons.map((item, index) => {
        return (
          <div key={index}>
            <button onClick={() => handleButtonClick(item.id)}>
              {" "}
              {item.label}{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ButtonSwitch;
