"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import axios from "../../../axios/getApi";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Logo from "../Logo/Logo";
import { connect } from "react-redux";
import * as dispatcher from "../../../redux/store/dispatchers";
import Link from "next/link";

const RegisterForm = ({
  isLogin,
  dispatchTokenValue,
  isForgotPassword,
  isResetPassword,
  verifyResetToken,
}) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();
  console.log(verifyResetToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!Email || !Password) {
        setError("All fields are required");
        return;
      }
    } else if (isForgotPassword) {
      if (!Email) {
        setError("Email is required");
        return;
      }
    } else if (isResetPassword) {
      if (!Password) {
        setError("Password is required");
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
          setIsLoading(false);
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

        setIsLoading(false);
        router.push("/");
        router.refresh();
      } else if (isForgotPassword) {
        const forgotRes = await axios.post("forgotPassword", { email: Email });
        console.log(forgotRes);
      } else {
        const users = await axios.get("register");
        const currentUser =
          users.data.user.length > 0
            ? users.data.user.find((item) => item.email === Email)
            : null;

        if (currentUser) {
          setError("User already exists");
          setIsLoading(false);
          return;
        } else {
          const data = {
            fullName: FullName,
            email: Email,
            password: Password,
            freeTokens: true,
          };
          const res = await axios.post("register", data);

          if (res.status === 200) {
            const form = e.target;
            form.reset();
            setIsLoading(false);
            router.push("/login");
            setError("");
          } else {
            console.log("User Registration failed");
            setError("User Registration failed");
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>

      <div className={styles.regForm}>
        <form onSubmit={handleSubmit} action="">
          {!isLogin && !isForgotPassword && !isResetPassword && (
            <>
              <input
                onChange={(e) => {
                  setError("");
                  setFullName(e.target.value);
                }}
                type="text"
                placeholder="Full Name"
              />
            </>
          )}

          {!isResetPassword && (
            <>
              <input
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
              />
            </>
          )}

          {!isForgotPassword && (
            <>
              <input
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password..."
              />
            </>
          )}
          {Error && (
            <>
              <div> {Error} </div>
            </>
          )}
          {isLogin ? (
            <div className={styles.loginInfo}>
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

              <p>
                Forgot Password? <Link href="/forgotPassword">Change Here</Link>
              </p>
            </div>
          ) : (
            <div className={styles.registerInfo}>
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
            </div>
          )}
          <button
            disabled={IsLoading || Error}
            className={styles.registerSubmit}
            type="submit"
          >
            {" "}
            {IsLoading
              ? "Loading..."
              : isLogin
              ? "Login"
              : isForgotPassword || isResetPassword
              ? "Submit"
              : "Register"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, dispatcher)(RegisterForm);
