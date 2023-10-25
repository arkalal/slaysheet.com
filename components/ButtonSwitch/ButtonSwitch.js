"use client";

import React from "react";
import styles from "./ButtonSwitch.module.scss";
import * as dispatcher from "../../redux/store/dispatchers";
import { connect } from "react-redux";

const ButtonSwitch = ({ buttons, dispatchButtonId }) => {
  const handleButtonClick = (id) => {
    dispatchButtonId(id);
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

export default connect(null, dispatcher)(ButtonSwitch);
