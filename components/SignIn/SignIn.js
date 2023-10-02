"use client";

import React from "react";
import styles from "./SignIn.module.scss";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  return (
    <div className={styles.googleAuth}>
      <button>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
