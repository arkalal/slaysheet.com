"use client";

import React from "react";
import styles from "./ShowcaseDesc.module.scss";
import { connect } from "react-redux";
import { showDesc } from "../../../customData/data";

const ShowcaseDesc = ({ getButtonId }) => {
  return (
    <>
      <p className={styles.showcaseDesc}>{showDesc[getButtonId]}</p>
    </>
  );
};

const mapStateToProps = ({ slay }) => {
  return {
    getButtonId: slay.getButtonId,
  };
};

export default connect(mapStateToProps, null)(ShowcaseDesc);
