import React from "react";
import styles from "./layout.module.scss";

const AuthLayout = ({ children }) => {
  return <div className={styles.authLayout}> {children} </div>;
};

export default AuthLayout;
