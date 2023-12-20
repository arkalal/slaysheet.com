"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import bcrypt from "bcryptjs";
import axios from "../../../axios/getApi";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const RegisterForm = ({ isLogin }) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!Email || !Password) {
        setError("All fields are required");
        return;
      }
    } else {
      if (!Email || !FullName || !Password) {
        setError("All fields are required");
        return;
      }
    }

    try {
      if (isLogin) {
        setIsLoading(true);
        const res = await signIn("credentials", {
          name: FullName,
          email: Email,
          password: Password,
          redirect: false,
        });

        if (res.error) {
          setError("Invalid Credentials");
          return;
        }

        setIsLoading(false);
        router.push("/");
      } else {
        const user = await axios.get("register");

        const userExists = (email) => {
          return user.data.user.some((user) => user.email === email);
        };

        const isUser = userExists(Email);
        console.log(isUser);

        if (isUser) {
          setError("User already exists");
          return;
        } else {
          setError("");
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const data = {
          fullName: FullName,
          email: Email,
          password: hashedPassword,
          freeTokens: true,
        };

        const res = await axios.post("register", data);

        if (res.status === 200) {
          const form = e.target;
          form.reset();
          router.push("/login");
        } else {
          console.log("User Registration failed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <h3>Development in Progress... Users can still register/login. 😇</h3>
      <form onSubmit={handleSubmit} action="">
        {!isLogin && (
          <>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
          </>
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password..."
        />

        {Error && (
          <>
            <div> {Error} </div>
          </>
        )}

        {isLogin ? (
          <>
            <p>
              Not have an account ?{" "}
              <button onClick={() => router.push("/register")}>Register</button>{" "}
            </p>
          </>
        ) : (
          <>
            <p>
              Already have an account ?{" "}
              <button onClick={() => router.push("/login")}>Login</button>{" "}
            </p>
          </>
        )}

        <button type="submit">
          {" "}
          {IsLoading ? "Loading..." : isLogin ? "Login" : "Register"}{" "}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
