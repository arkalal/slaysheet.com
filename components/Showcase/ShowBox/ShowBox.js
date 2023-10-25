"use client";

import React from "react";
import { connect } from "react-redux";

const ShowBox = ({ getButtonId }) => {
  console.log("getButtonId", getButtonId);
  return <div>ShowBox</div>;
};

const mapStateToProps = ({ slay }) => {
  return {
    getButtonId: slay.getButtonId,
  };
};

export default connect(mapStateToProps, null)(ShowBox);
