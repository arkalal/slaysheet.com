import React from "react";
import styles from "./Navbar.module.scss";
import BlueButton from "../../../Reusable/BlueButton/BlueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../../../Reusable/LogoutButton/LogoutButton";
import Logo from "../../../Reusable/Logo/Logo";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.navBarWrapper}>
        <Logo />

        <div className={styles.menu}></div>

        <div className={styles.signIn}>
          <BlueButton signInLink={true} />
          {session?.user && (
            <>
              {" "}
              <LogoutButton />{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
