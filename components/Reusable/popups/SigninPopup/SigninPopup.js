"use client";

import React from "react";
import styles from "./SigninPopup.module.scss";
import Lottie from "lottie-react";
import userSignIn from "../../../../LottieAnimation/userSignIn.json";
import closeIcon from "../../../../LottieAnimation/closeIcon.json";
import { useRouter } from "next/navigation";

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
            <Lottie animationData={closeIcon} />
          </div>

          <div className={styles.userSignIn}>
            <Lottie animationData={userSignIn} />
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
