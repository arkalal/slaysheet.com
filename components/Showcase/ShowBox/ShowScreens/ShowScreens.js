"use client";

import React from "react";
import { connect } from "react-redux";

const ShowScreens = ({ getButtonId, showScreenComp }) => {
  return <div key={getButtonId}>{showScreenComp[getButtonId] || null}</div>;
};

const mapStateToProps = ({ slay }) => {
  return {
    getButtonId: slay.getButtonId,
  };
};

export default connect(mapStateToProps, null)(ShowScreens);
