"use client";

import React from "react";
import styles from "./ButtonSwitch.module.scss";
import * as dispatcher from "../../redux/store/dispatchers";
import { connect } from "react-redux";

const ButtonSwitch = ({ buttons, dispatchButtonId, getButtonId }) => {
  const handleButtonClick = (id) => {
    dispatchButtonId(id);
  };

  return (
    <div className={styles.ButtonSwitch}>
      {buttons.map((item, index) => {
        return (
          <div key={index}>
            <button
              className={
                getButtonId === item.id ? `${styles.buttonActive}` : ""
              }
              onClick={() => handleButtonClick(item.id)}
            >
              {" "}
              {item.label}{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ slay }) => {
  return {
    getButtonId: slay.getButtonId,
  };
};

export default connect(mapStateToProps, dispatcher)(ButtonSwitch);
