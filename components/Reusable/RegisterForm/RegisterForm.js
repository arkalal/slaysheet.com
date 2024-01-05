"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import bcrypt from "bcryptjs";
import axios from "../../../axios/getApi";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Logo from "../Logo/Logo";
import { connect } from "react-redux";
import * as dispatcher from "../../../redux/store/dispatchers";

const RegisterForm = ({ isLogin, dispatchTokenValue }) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
      setIsLoading(true);
      if (isLogin) {
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

        const aiToken = await axios.get("aiToken");
        const aiCountData = aiToken.data;

        const isUserToken = aiCountData.some((ai) => ai.user === Email);
        const filteredUserToken = aiCountData.filter(
          (user) => user.user === Email
        );

        if (isUserToken) {
          dispatchTokenValue(filteredUserToken[0]?.count);
          localStorage.setItem("AITokens", filteredUserToken[0]?.count);
        }

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
      setIsLoading(false);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>

      <div className={styles.regForm}>
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
            type="password"
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/register");
                    setError("");
                  }}
                >
                  Register
                </button>{" "}
              </p>
            </>
          ) : (
            <>
              <p>
                Already have an account ?{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/login");
                    setError("");
                  }}
                >
                  Login
                </button>{" "}
              </p>
            </>
          )}

          <button
            disabled={IsLoading}
            className={styles.registerSubmit}
            type="submit"
          >
            {" "}
            {IsLoading ? "Loading..." : isLogin ? "Login" : "Register"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, dispatcher)(RegisterForm);
