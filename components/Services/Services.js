"use client";

import React, { useEffect } from "react";
import styles from "./Services.module.scss";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Services = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [router, session, status]);

  return (
    <div>
      <h5>Hello {session?.user.name} </h5>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default Services;
