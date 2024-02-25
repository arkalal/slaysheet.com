"use client";

import React, { useEffect, useState } from "react";
import styles from "./RegisterForm.module.scss";
import axios from "../../../axios/getApi";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Logo from "../Logo/Logo";
import { connect } from "react-redux";
import * as dispatcher from "../../../redux/store/dispatchers";
import Link from "next/link";

const RegisterForm = ({
  isLogin,
  dispatchTokenValue,
  isForgotPassword,
  isResetPassword,
  resetToken,
}) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [EmailReset, setEmailReset] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && isForgotPassword) {
      router.push("/");
    }
  }, [isForgotPassword, router, session]);

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

        router.push("/");
        router.refresh();
      } else if (isForgotPassword) {
        const res = await axios.post("forgotPassword", { email: Email });

        if (res.status === 200) {
          setIsLoading(false);
          setEmailReset(true);
        }

        if (res.status === 400) {
          setIsLoading(false);
          setError("Failed to send reset email. Please try again");
        }

        if (res.status === 401) {
          setIsLoading(false);
          setError("User does not exist");
        }
      } else if (isResetPassword) {
        const res = await axios.post("verifyToken", { token: resetToken });

        if (res.status === 200) {
          setError("");

          const userData = res.data;
          const reset = await axios.post("resetPassword", {
            email: userData.email,
            password: Password,
          });

          if (reset.status === 400) {
            setIsLoading(false);
            setError("Password reset failed. Please try again");
          }

          if (reset.status === 200) {
            router.push("/login");
            setError("");
          }
        }

        if (res.status === 400) {
          setIsLoading(false);
          setError("Invalid token or has expired");
        }
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
            router.push("/login");
            setError("");
          } else {
            setIsLoading(false);
            setError("User Registration failed");
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
      {EmailReset && (
        <div className={styles.emailReset}>
          <h5>
            We have sent a reset link in your registered email. Please check
            your inbox/spam folder.
          </h5>
        </div>
      )}

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
              <div className={styles.regFormError}> {Error} </div>
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
