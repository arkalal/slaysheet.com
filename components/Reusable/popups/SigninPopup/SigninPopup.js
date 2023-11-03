"use client";

import React from "react";
import styles from "./SigninPopup.module.scss";
import Lottie from "lottie-react";
import googleAnime from "../../../../LottieAnimation/googleAnime.json";
import googleIconAnime from "../../../../LottieAnimation/googleIconAnime.json";
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

          <div className={styles.googleAnime}>
            <Lottie animationData={googleAnime} />
          </div>

          <div className={styles.signInPopupBtn}>
            <button onClick={() => router.push("/signIn")}>
              <div className={styles.SignInButtonText}>
                <div className={styles.googleIconAnime}>
                  <Lottie animationData={googleIconAnime} />
                </div>

                <p> Sign In with Google</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPopup;
