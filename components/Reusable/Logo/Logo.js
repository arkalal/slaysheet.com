import React from "react";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.slayWord}>Slaysheet</span>{" "}
      <span className={styles.dot}>.COM</span>{" "}
    </div>
  );
};

export default Logo;
