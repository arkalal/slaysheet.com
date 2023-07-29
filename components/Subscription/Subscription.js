"use client";

import React, { useEffect } from "react";
import styles from "./Subscription.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Subscription = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [router, session, status]);
  return <div>Subscription</div>;
};

export default Subscription;
