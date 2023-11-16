"use client";

import React from "react";
import styles from "./SigninPopup.module.scss";
import userSignIn from "../../../../LottieAnimation/userSignIn.gif";
import closeIcon from "../../../../LottieAnimation/closeIcon.gif";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SigninPopup = ({ setIsSigninPopup }) => {
  const router = useRouter();

  return (
    <div className={styles.SigninPopup}>
      <div className={styles.SigninPopupContent}>
        <div className={styles.SigninPopupInteract}>
          <div
            onClick={() => setIsSigninPopup(false)}
            className={styles.signInPopupClose}
          >
            <Image src={closeIcon} alt="closeIcon" width={40}></Image>
          </div>

          <div className={styles.userSignIn}>
            <Image
              src={userSignIn}
              alt="closeIcon"
              width={120}
              height={120}
            ></Image>
          </div>

          <div className={styles.signInPopupBtn}>
            <button onClick={() => router.push("/login")}>
              <div className={styles.SignInButtonText}>
                <p> Sign In As a User</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPopup;
