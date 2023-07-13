"use client";

import React, { useEffect } from "react";
import styles from "./SignIn.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const handleGoogleAuth = () => {
    signIn("google");
  };

  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);

  useEffect(() => {
    if (session) {
      router.push("/services");
    }
  }, [router, session]);

  return (
    <div className={styles.googleAuthContainer}>
      <div className={styles.googleAuth}>
        <button onClick={handleGoogleAuth}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default SignIn;
