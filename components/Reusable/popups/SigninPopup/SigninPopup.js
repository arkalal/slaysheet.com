import React from "react";
import styles from "./SigninPopup.module.scss";
import SignInButton from "../../SignInButton/SignInButton";

const SigninPopup = () => {
  return (
    <div className={styles.SigninPopup}>
      <div className={styles.SigninPopupContent}>
        <div className={styles.SigninPopupTitle}>
          <h2>Sign In as a User</h2>
        </div>

        <div className={styles.SigninPopupInteract}>
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default SigninPopup;
