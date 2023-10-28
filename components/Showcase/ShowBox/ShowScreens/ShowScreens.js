"use client";

import React from "react";
import { connect } from "react-redux";

const ShowScreens = ({ getButtonId, showScreenComp }) => {
  console.log("getButtonId", getButtonId);

  return <div key={getButtonId}>{showScreenComp[getButtonId] || null}</div>;
};

const mapStateToProps = ({ slay }) => {
  return {
    getButtonId: slay.getButtonId,
  };
};

export default connect(mapStateToProps, null)(ShowScreens);
