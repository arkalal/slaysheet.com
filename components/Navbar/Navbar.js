import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}></div>
      <div className={styles.menu}></div>
      <div className={styles.signIn}>
        <button>
          <Link
            as="font"
            rel="preload"
            className={styles.signInLink}
            href="/signIn"
          >
            SignIn
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
