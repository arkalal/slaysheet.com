"use client";

import React from "react";
import styles from "./Services.module.scss";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Services = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signIn?callbackUrl=/services");
    },
  });

  return (
    <div>
      <h5>Hello {session?.user.name} </h5>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default Services;
