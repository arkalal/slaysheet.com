"use client";

import React from "react";
import styles from "./LogoutButton.module.scss";
import logoutAnime from "../../../assets/icons/log-out_3596144.png";
import { signOut } from "next-auth/react";
import Image from "next/image";

const LogoutButton = () => {
  return (
    <div onClick={() => signOut()} className={styles.LogoutButton}>
      <Image src={logoutAnime} width={30} alt="logOut"></Image>
    </div>
  );
};

export default LogoutButton;
