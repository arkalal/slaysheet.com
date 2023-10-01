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
  const { data: session, status } = useSession();

  console.log("router", router);
  console.log("session", session);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/services");
    }
  }, [router, status]);

  console.log("status", status);

  return (
    <div className={styles.googleAuth}>
      <button onClick={handleGoogleAuth}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
