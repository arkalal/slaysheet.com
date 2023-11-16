"use client";

import React from "react";
import styles from "./LogoutButton.module.scss";
import logoutAnime from "../../../LottieAnimation/logout.gif";
import { signOut } from "next-auth/react";
import Image from "next/image";

const LogoutButton = () => {
  return (
    <div onClick={() => signOut()} className={styles.LogoutButton}>
      <Image src={logoutAnime} width={80} alt="logOut"></Image>
    </div>
  );
};

export default LogoutButton;
