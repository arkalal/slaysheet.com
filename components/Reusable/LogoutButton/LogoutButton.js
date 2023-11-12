"use client";

import React from "react";
import styles from "./LogoutButton.module.scss";
import Lottie from "lottie-react";
import logoutAnime from "../../../LottieAnimation/logoutAnime.json";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div onClick={() => signOut()} className={styles.LogoutButton}>
      <Lottie animationData={logoutAnime} />
    </div>
  );
};

export default LogoutButton;
