"use client";

import React, { useEffect, useState } from "react";
import styles from "./AITokenWallet.module.scss";
import { connect } from "react-redux";

const AITokenWallet = ({ getTokenValue }) => {
  const [aiTokens, setAiTokens] = useState("");

  useEffect(() => {
    const tokens = localStorage.getItem("AITokens");
    setAiTokens(tokens);
  }, [getTokenValue]);

  return (
    <div className={styles.AITokenWallet}>
      <h2>Token Balance</h2>
      <h2>{aiTokens}</h2>
    </div>
  );
};

const mapStateToProps = ({ slay }) => {
  return {
    getTokenValue: slay.getTokenValue,
  };
};

export default connect(mapStateToProps, null)(AITokenWallet);
