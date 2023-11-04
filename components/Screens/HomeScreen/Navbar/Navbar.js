import React from "react";
import styles from "./Navbar.module.scss";
import BlueButton from "../../../Reusable/BlueButton/BlueButton";
import { UserButton, auth } from "@clerk/nextjs";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.navBarWrapper}>
        <div className={styles.logo}>
          <span className={styles.slayWord}>Slaysheet</span>{" "}
          <span className={styles.dot}>.COM</span>{" "}
        </div>

        <div className={styles.menu}></div>

        <div className={styles.signIn}>
          <BlueButton signInLink={true} />
          {userId && (
            <>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
